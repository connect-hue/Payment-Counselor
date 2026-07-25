import { NextResponse } from "next/server";
import connectDB from "@/src/utils/db";
import Placement from "@/src/models/Placement";
import { uploadToS3, deleteFromS3 } from "@/src/utils/s3Helpers";
import { generateUniqueSlug } from "@/src/utils/slugify";
import { requireAdmin } from "@/src/utils/auth";

export async function GET(request, { params }) {
  try {
    await requireAdmin(request);
    const { id } = await params;

    await connectDB();
    const placement = await Placement.findById(id);
    if (!placement) {
      return NextResponse.json({ message: "Placement not found." }, { status: 404 });
    }
    return NextResponse.json(placement, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: error.message || "An error occurred." },
      { status: error.message && error.message.includes("log in") ? 401 : 500 }
    );
  }
}

export async function PATCH(request, { params }) {
  let newS3Info = null;
  let oldImageKeyToDelete = null;

  try {
    await requireAdmin(request);
    const { id } = await params;

    await connectDB();
    const placement = await Placement.findById(id);
    if (!placement) {
      return NextResponse.json({ message: "Placement not found." }, { status: 404 });
    }

    const formData = await request.formData();
    const name = formData.get("name");
    const qualification = formData.get("qualification");
    const role = formData.get("role");
    const companies = formData.get("companies");
    const packages = formData.get("packages");
    const successStory = formData.get("successStory");
    const imageAlt = formData.get("imageAlt");
    const sortOrder = formData.get("sortOrder");
    const isPublished = formData.get("isPublished");
    const file = formData.get("image"); // Can be undefined or a string if unchanged

    // Parse array fields if they came as stringified JSON or normal values
    if (companies !== null) {
      let parsedCompanies;
      try {
        parsedCompanies = typeof companies === "string" ? JSON.parse(companies) : [companies];
      } catch (e) {
        parsedCompanies = Array.isArray(companies) ? companies : [companies];
      }
      parsedCompanies = parsedCompanies.filter(Boolean);
      if (parsedCompanies.length === 0) {
        return NextResponse.json({ message: "At least one company is required." }, { status: 400 });
      }
      placement.companies = parsedCompanies;
    }

    if (packages !== null) {
      let parsedPackages;
      try {
        parsedPackages = typeof packages === "string" ? JSON.parse(packages) : [packages];
      } catch (e) {
        parsedPackages = Array.isArray(packages) ? packages : [packages];
      }
      parsedPackages = parsedPackages.filter(Boolean);
      if (parsedPackages.length === 0) {
        return NextResponse.json({ message: "At least one salary package is required." }, { status: 400 });
      }
      placement.packages = parsedPackages;
    }

    if (name !== null) {
      placement.name = name;
      placement.slug = await generateUniqueSlug(name, id);
    }
    if (qualification !== null) placement.qualification = qualification;
    if (role !== null) placement.role = role;
    if (successStory !== null) placement.successStory = successStory;
    if (imageAlt !== null) placement.imageAlt = imageAlt;
    if (sortOrder !== null) placement.sortOrder = Number(sortOrder);
    if (isPublished !== null) {
      placement.isPublished = isPublished === "true" || isPublished === true;
    }

    // Handle image replacement if file provided
    if (file && typeof file !== "string") {
      // 1. Upload new image
      const buffer = Buffer.from(await file.arrayBuffer());
      newS3Info = await uploadToS3(buffer, file.type, file.name);
      // Store old key to delete later after DB succeeds
      oldImageKeyToDelete = placement.imageKey;

      placement.imageUrl = newS3Info.imageUrl;
      placement.imageKey = newS3Info.imageKey;
    }

    // 2. Save database changes
    await placement.save();

    // 3. Delete old S3 image after DB update success
    if (oldImageKeyToDelete) {
      console.log("DB updated. Deleting old S3 object with key:", oldImageKeyToDelete);
      try {
        await deleteFromS3(oldImageKeyToDelete);
      } catch (s3Error) {
        console.error("Failed to delete old S3 object after update:", s3Error);
      }
    }

    return NextResponse.json(placement, { status: 200 });
  } catch (error) {
    // DB failed: rollback new S3 image if uploaded
    if (newS3Info && newS3Info.imageKey) {
      console.log("DB update failed. Rolling back new S3 image for key:", newS3Info.imageKey);
      try {
        await deleteFromS3(newS3Info.imageKey);
      } catch (s3Error) {
        console.error("Failed to delete newly uploaded S3 object on error:", s3Error);
      }
    }
    return NextResponse.json(
      { message: error.message || "An error occurred." },
      { status: error.message && error.message.includes("log in") ? 401 : 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    await requireAdmin(request);
    const { id } = await params;

    await connectDB();
    const placement = await Placement.findById(id);

    if (!placement) {
      return NextResponse.json({ message: "Placement not found." }, { status: 404 });
    }

    // 1. Delete S3 object
    console.log("Deleting S3 image for candidate:", placement.name, "Key:", placement.imageKey);
    try {
      await deleteFromS3(placement.imageKey);
    } catch (s3Error) {
      console.error("S3 image deletion failed during placement delete:", s3Error);
    }

    // 2. Delete MongoDB record
    await Placement.findByIdAndDelete(id);

    return NextResponse.json(
      { message: `Placement for ${placement.name} deleted successfully.` },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: error.message || "An error occurred." },
      { status: error.message && error.message.includes("log in") ? 401 : 500 }
    );
  }
}
