import { NextResponse } from "next/server";
import connectDB from "@/src/utils/db";
import Placement from "@/src/models/Placement";
import { uploadToS3, deleteFromS3 } from "@/src/utils/s3Helpers";
import { generateUniqueSlug } from "@/src/utils/slugify";
import { requireAdmin } from "@/src/utils/auth";

export async function GET(request) {
  try {
    await requireAdmin(request);
    
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search");
    const status = searchParams.get("status");

    const query = {};

    // Filter by published status
    if (status === "published") {
      query.isPublished = true;
    } else if (status === "draft") {
      query.isPublished = false;
    }

    // Search by name or companies
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { companies: { $regex: search, $options: "i" } },
      ];
    }

    await connectDB();
    const placements = await Placement.find(query)
      .sort({ sortOrder: 1, createdAt: -1 })
      .populate("createdBy", "name email");

    return NextResponse.json(placements, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: error.message || "Unauthorized access." },
      { status: error.message && error.message.includes("log in") ? 401 : 500 }
    );
  }
}

export async function POST(request) {
  let uploadedS3Info = null;
  try {
    const admin = await requireAdmin(request);
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
    const file = formData.get("image");

    if (!name || !successStory) {
      return NextResponse.json(
        { message: "Name and success story are required fields." },
        { status: 400 }
      );
    }

    if (!file || typeof file === "string") {
      return NextResponse.json(
        { message: "Candidate image file is required." },
        { status: 400 }
      );
    }

    // Parse array fields if they came as stringified JSON from FormData
    let parsedCompanies = [];
    let parsedPackages = [];
    try {
      parsedCompanies = typeof companies === "string" ? JSON.parse(companies) : [companies];
    } catch (e) {
      parsedCompanies = Array.isArray(companies) ? companies : [companies];
    }

    try {
      parsedPackages = typeof packages === "string" ? JSON.parse(packages) : [packages];
    } catch (e) {
      parsedPackages = Array.isArray(packages) ? packages : [packages];
    }

    // Filter empty values
    parsedCompanies = parsedCompanies.filter(Boolean);
    parsedPackages = parsedPackages.filter(Boolean);

    if (parsedCompanies.length === 0) {
      return NextResponse.json(
        { message: "At least one company is required." },
        { status: 400 }
      );
    }
    if (parsedPackages.length === 0) {
      return NextResponse.json(
        { message: "At least one salary package is required." },
        { status: 400 }
      );
    }

    // Upload to AWS S3
    const buffer = Buffer.from(await file.arrayBuffer());
    uploadedS3Info = await uploadToS3(buffer, file.type, file.name);

    // Generate unique slug
    await connectDB();
    const slug = await generateUniqueSlug(name);

    // Create placement in database
    const placement = new Placement({
      name,
      slug,
      qualification: qualification || "",
      role: role || "",
      companies: parsedCompanies,
      packages: parsedPackages,
      successStory,
      imageUrl: uploadedS3Info.imageUrl,
      imageKey: uploadedS3Info.imageKey,
      imageAlt: imageAlt || `${name} Placed at ${parsedCompanies.join(", ")}`,
      sortOrder: Number(sortOrder) || 0,
      isPublished: isPublished === "true" || isPublished === true,
      createdBy: admin._id,
    });

    await placement.save();
    return NextResponse.json(placement, { status: 201 });
  } catch (error) {
    if (uploadedS3Info && uploadedS3Info.imageKey) {
      console.log("Database creation failed. Rolling back S3 upload for key:", uploadedS3Info.imageKey);
      try {
        await deleteFromS3(uploadedS3Info.imageKey);
      } catch (s3Error) {
        console.error("Failed to delete S3 object during rollback:", s3Error);
      }
    }
    return NextResponse.json(
      { message: error.message || "An error occurred." },
      { status: error.message && error.message.includes("log in") ? 401 : 500 }
    );
  }
}
