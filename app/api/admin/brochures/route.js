import { NextResponse } from "next/server";
import connectDB from "@/src/utils/db";
import Brochure from "@/src/models/Brochure";
import { uploadToS3, deleteFromS3 } from "@/src/utils/s3Helpers";
import { generateUniqueBrochureSlug } from "@/src/utils/slugify";
import { requireAdmin } from "@/src/utils/auth";
import { ensureBrochuresSeeded } from "@/src/data/defaultBrochures";

export const dynamic = "force-dynamic";

export async function GET(request) {
  try {
    await requireAdmin(request);
    await connectDB();
    await ensureBrochuresSeeded();

    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search");
    const status = searchParams.get("status");
    const category = searchParams.get("category");
    const location = searchParams.get("location");

    const query = {};

    // Filter by published status
    if (status === "published") {
      query.isPublished = true;
    } else if (status === "draft") {
      query.isPublished = false;
    }

    if (category && category !== "all") {
      query.category = { $regex: new RegExp(`^${category}$`, "i") };
    }

    if (location && location !== "all") {
      query.location = { $regex: new RegExp(`^${location}$`, "i") };
    }

    // Search query
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { category: { $regex: search, $options: "i" } },
        { location: { $regex: search, $options: "i" } },
        { slug: { $regex: search, $options: "i" } },
      ];
    }

    const brochures = await Brochure.find(query)
      .sort({ sortOrder: 1, createdAt: -1 })
      .populate("createdBy", "name email")
      .populate("updatedBy", "name email");

    return NextResponse.json(brochures, { status: 200 });
  } catch (error) {
    console.error("Admin Brochures GET Error:", error);
    return NextResponse.json(
      { message: error.message || "Unauthorized access." },
      { status: error.message && error.message.includes("log in") ? 401 : 500 }
    );
  }
}

export async function POST(request) {
  let uploadedImageKey = null;
  let uploadedPdfKey = null;

  try {
    const admin = await requireAdmin(request);
    await connectDB();

    const contentType = request.headers.get("content-type") || "";
    let name = "";
    let category = "Pharmacist";
    let location = "Australia";
    let description = "";
    let duration = "4 Months";
    let audfees = "";
    let inrfees = "";
    let students = "1000+";
    let brochureUrl = "";
    let brochureLinkUrl = "";
    let courseImageUrl = "";
    let link = "";
    let sortOrder = 0;
    let isPublished = true;
    let customSlug = "";

    if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData();

      name = formData.get("name") || "";
      category = formData.get("category") || "Pharmacist";
      location = formData.get("location") || "Australia";
      description = formData.get("description") || "";
      duration = formData.get("duration") || "4 Months";
      audfees = formData.get("audfees") || "";
      inrfees = formData.get("inrfees") || "";
      students = formData.get("students") || "1000+";
      brochureUrl = formData.get("brochure") || "";
      brochureLinkUrl = formData.get("brochureLink") || "";
      courseImageUrl = formData.get("courseImage") || "";
      link = formData.get("link") || "";
      sortOrder = Number(formData.get("sortOrder")) || 0;
      isPublished = formData.get("isPublished") === "true" || formData.get("isPublished") === true;
      customSlug = formData.get("slug") || "";

      // File upload for Brochure Thumbnail / Image
      const imageFile = formData.get("brochureImageFile");
      if (imageFile && typeof imageFile !== "string" && imageFile.size > 0) {
        const buffer = Buffer.from(await imageFile.arrayBuffer());
        const s3Res = await uploadToS3(buffer, imageFile.type, imageFile.name, "brochures");
        brochureUrl = s3Res.imageUrl;
        uploadedImageKey = s3Res.imageKey;
      }

      // File upload for Brochure PDF Document
      const pdfFile = formData.get("brochurePdfFile");
      if (pdfFile && typeof pdfFile !== "string" && pdfFile.size > 0) {
        const buffer = Buffer.from(await pdfFile.arrayBuffer());
        const s3Res = await uploadToS3(buffer, pdfFile.type, pdfFile.name, "brochures/docs");
        brochureLinkUrl = s3Res.imageUrl;
        uploadedPdfKey = s3Res.imageKey;
      }
    } else {
      const body = await request.json();
      name = body.name || "";
      category = body.category || "Pharmacist";
      location = body.location || "Australia";
      description = body.description || "";
      duration = body.duration || "4 Months";
      audfees = body.audfees || "";
      inrfees = body.inrfees || "";
      students = body.students || "1000+";
      brochureUrl = body.brochure || "";
      brochureLinkUrl = body.brochureLink || "";
      courseImageUrl = body.courseImage || "";
      link = body.link || "";
      sortOrder = Number(body.sortOrder) || 0;
      isPublished = body.isPublished !== false;
      customSlug = body.slug || "";
    }

    if (!name.trim() || !description.trim()) {
      return NextResponse.json(
        { message: "Course Name and Description are required fields." },
        { status: 400 }
      );
    }

    // Generate unique slug
    const finalSlug = customSlug.trim()
      ? await generateUniqueBrochureSlug(customSlug)
      : await generateUniqueBrochureSlug(name);

    const brochure = new Brochure({
      name: name.trim(),
      slug: finalSlug,
      category: category.trim(),
      location: location.trim(),
      description: description.trim(),
      duration: duration.trim(),
      audfees: audfees.trim(),
      inrfees: inrfees.trim(),
      students: students.trim(),
      brochure: brochureUrl.trim(),
      brochureKey: uploadedImageKey || "",
      brochureLink: brochureLinkUrl.trim(),
      brochurePdfKey: uploadedPdfKey || "",
      courseImage: courseImageUrl.trim(),
      link: link.trim(),
      pathname: `/${finalSlug}`,
      sortOrder,
      isPublished,
      createdBy: admin._id,
      createdByName: admin.name || "Admin",
      updatedBy: admin._id,
      updatedByName: admin.name || "Admin",
    });

    await brochure.save();

    return NextResponse.json(brochure, { status: 201 });
  } catch (error) {
    console.error("Admin Brochure Create Error:", error);

    // Rollback S3 uploads if save failed
    if (uploadedImageKey) {
      try {
        await deleteFromS3(uploadedImageKey);
      } catch (e) {
        console.error("Failed to delete S3 image during rollback:", e);
      }
    }
    if (uploadedPdfKey) {
      try {
        await deleteFromS3(uploadedPdfKey);
      } catch (e) {
        console.error("Failed to delete S3 PDF during rollback:", e);
      }
    }

    return NextResponse.json(
      { message: error.message || "Failed to create brochure." },
      { status: error.message && error.message.includes("log in") ? 401 : 500 }
    );
  }
}
