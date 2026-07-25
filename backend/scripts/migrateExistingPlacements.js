import "dotenv/config";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
import Placement from "../models/Placement.js";
import { uploadToS3, deleteFromS3 } from "../utils/s3Helpers.js";
import connectDB from "../config/database.js";

const DRY_RUN = process.argv.includes("--dry-run");
const LIMIT_ARG = process.argv.find((arg) => arg.startsWith("--limit="));
const LIMIT = LIMIT_ARG ? parseInt(LIMIT_ARG.split("=")[1], 10) : null;

// Resolve paths
const __filename = fileURLToPath(import.meta.url);
const cleanedDir = path.dirname(__filename);

const backupFilePath = path.join(cleanedDir, "backup_placements.json");
const sourceDataPath = path.join(cleanedDir, "..", "..", "placements_backup.json");

// Helper to parse package string into array
const parsePackages = (pkgStr) => {
  if (!pkgStr) return [];
  return pkgStr
    .split(/,|\band\b|&/)
    .map((p) => p.trim())
    .filter(Boolean);
};

// Helper to generate slug
const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
};

const runMigration = async () => {
  console.log("\n=== STARTING PLACEMENTS MIGRATION ===");
  if (DRY_RUN) console.log(">>> RUNNING IN DRY-RUN MODE (No database or S3 changes will be made) <<<");
  if (LIMIT) console.log(`>>> LIMITING TO THE FIRST ${LIMIT} RECORD(S) <<<`);

  try {
    // 1. Load original placement data from backup file
    if (!fs.existsSync(sourceDataPath)) {
      console.error(`Source backup file not found at: ${sourceDataPath}`);
      process.exit(1);
    }
    const rawData = JSON.parse(fs.readFileSync(sourceDataPath, "utf8"));
    console.log(`Loaded ${rawData.length} records from local backup.`);

    // Write copy to backend/scripts/backup_placements.json as requested
    if (!DRY_RUN) {
      fs.writeFileSync(backupFilePath, JSON.stringify(rawData, null, 2), "utf8");
      console.log(`Saved backup copy to: ${backupFilePath}`);
    }

    // Connect to Database if not dry run
    if (!DRY_RUN) {
      await connectDB();
    }

    const report = {
      successful: [],
      skipped: [],
      failed: [],
      failedUploads: [],
    };

    let processedCount = 0;

    for (let index = 0; index < rawData.length; index++) {
      if (LIMIT && processedCount >= LIMIT) {
        break;
      }

      const record = rawData[index];
      console.log(`\nProcessing record ${index + 1}/${rawData.length}: ${record.name}`);

      // Check if duplicate exists (by candidate name or slug)
      const targetSlug = slugify(record.name);
      if (!DRY_RUN) {
        const existing = await Placement.findOne({ slug: targetSlug });
        if (existing) {
          console.log(`-> Skipped (Duplicate detected in MongoDB with slug: ${targetSlug})`);
          report.skipped.push({ name: record.name, reason: "Duplicate slug/name" });
          continue;
        }
      }

      // Check if image path is valid
      const localImagePath = path.join(
        cleanedDir,
        "..",
        "..",
        "public",
        record.image || ""
      );

      if (!record.image || record.image === "/Assets/" || !fs.existsSync(localImagePath)) {
        console.error(`-> Failed: Local image not found at ${localImagePath}`);
        report.failed.push({
          name: record.name,
          reason: `Image file not found at ${localImagePath}`,
        });
        continue;
      }

      // Read image file into buffer
      const fileBuffer = fs.readFileSync(localImagePath);
      const ext = path.extname(localImagePath).toLowerCase().replace(".", "") || "png";
      const mimeType = ext === "webp" ? "image/webp" : ext === "png" ? "image/png" : "image/jpeg";

      let s3Info = null;

      if (!DRY_RUN) {
        try {
          console.log(`-> Uploading ${record.image} to S3...`);
          s3Info = await uploadToS3(fileBuffer, mimeType, path.basename(localImagePath));
          console.log(`-> S3 Upload success! Key: ${s3Info.imageKey}`);
        } catch (uploadError) {
          console.error(`-> S3 Upload failed:`, uploadError.message);
          report.failedUploads.push({ name: record.name, error: uploadError.message });
          report.failed.push({ name: record.name, reason: "S3 Image upload failed" });
          continue;
        }
      } else {
        s3Info = {
          imageUrl: `https://dryrun-mock-s3.amazonaws.com/placements/${targetSlug}.${ext}`,
          imageKey: `placements/${targetSlug}.${ext}`,
        };
      }

      // Prepare MongoDB record
      const placementDoc = {
        name: record.name,
        slug: targetSlug,
        qualification: record.qualification || "",
        role: record.role || "",
        companies: record.companies || [],
        packages: parsePackages(record.package),
        successStory: record.story || "No success story available.",
        imageUrl: s3Info.imageUrl,
        imageKey: s3Info.imageKey,
        imageAlt: `${record.name} Placed at ${(record.companies || []).join(", ")}`,
        isPublished: true,
        sortOrder: record.id || index, // use original ID or array order
      };

      if (!DRY_RUN) {
        try {
          const placement = new Placement(placementDoc);
          await placement.save();
          console.log(`-> Saved in MongoDB! ID: ${placement._id}`);
          report.successful.push({ name: record.name, id: placement._id });
        } catch (dbError) {
          console.error(`-> MongoDB insertion failed:`, dbError.message);
          // Rollback S3 image
          console.log(`-> Rolling back S3 upload for key: ${s3Info.imageKey}`);
          try {
            await deleteFromS3(s3Info.imageKey);
          } catch (rollbackError) {
            console.error(`-> Rollback of S3 object failed:`, rollbackError.message);
          }
          report.failed.push({ name: record.name, reason: `MongoDB Save Error: ${dbError.message}` });
          continue;
        }
      } else {
        console.log("-> [DRY RUN] Document would be inserted:", placementDoc);
        report.successful.push({ name: record.name, id: "MOCK_ID" });
      }

      processedCount++;
    }

    // Print summary report
    console.log("\n====================================");
    console.log("=== MIGRATION SUMMARY REPORT ===");
    console.log("====================================");
    console.log(`Successfully Migrated: ${report.successful.length}`);
    console.log(`Skipped Duplicates:    ${report.skipped.length}`);
    console.log(`Failed Image Uploads:  ${report.failedUploads.length}`);
    console.log(`Failed Records:        ${report.failed.length}`);
    console.log("====================================");

    if (report.failed.length > 0) {
      console.log("\nFailed Records Details:");
      report.failed.forEach((f) => console.log(`- ${f.name}: ${f.reason}`));
    }

    if (report.skipped.length > 0) {
      console.log("\nSkipped Duplicates Details:");
      report.skipped.forEach((s) => console.log(`- ${s.name}: ${s.reason}`));
    }

    console.log("\nMigration execution finished successfully.");

  } catch (err) {
    console.error("Migration script crashed:", err);
  } finally {
    if (!DRY_RUN && mongoose.connection.readyState !== 0) {
      await mongoose.connection.close();
      console.log("Database connection closed.");
    }
  }
};

runMigration();
