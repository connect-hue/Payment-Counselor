import { NextResponse } from "next/server";
import connectDB from "@/src/utils/db";
import Brochure from "@/src/models/Brochure";
import { uploadToS3, deleteFromS3 } from "@/src/utils/s3Helpers";
import { generateUniqueBrochureSlug } from "@/src/utils/slugify";
import { requireAdmin } from "@/src/utils/auth";

export const dynamic = "force-dynamic";

export async function GET(request, { params }) {
  try {
    await requireAdmin(request);
    const { id } = await params;

    await connectDB();
    const brochure = await Brochure.findById(id)
      .populate("createdBy", "name email")
      .populate("updatedBy", "name email");

    if (!brochure) {
      return NextResponse.json({ message: "Brochure not found." }, { status: 404 });
    }

    return NextResponse.json(brochure, { status: 200 });
  } catch (error) {
    console.error("Admin Brochure GET by ID Error:", error);
    return NextResponse.json(
      { message: error.message || "Failed to fetch brochure." },
      { status: error.message && error.message.includes("log in") ? 401 : 500 }
    );
  }
}

export async function PATCH(request, { params }) {
  let uploadedImageKey = null;
  let uploadedPdfKey = null;

  try {
    const admin = await requireAdmin(request);
    const { id } = await params;

    await connectDB();
    const existing = await Brochure.findById(id);
    if (!existing) {
      return NextResponse.json({ message: "Brochure not found." }, { status: 404 });
    }

    const contentType = request.headers.get("content-type") || "";
    let data = {};

    if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData();

      if (formData.has("name")) data.name = formData.get("name");
      if (formData.has("category")) data.category = formData.get("category");
      if (formData.has("location")) data.location = formData.get("location");
      if (formData.has("description")) data.description = formData.get("description");
      if (formData.has("duration")) data.duration = formData.get("duration");
      if (formData.has("audfees")) data.audfees = formData.get("audfees");
      if (formData.has("inrfees")) data.inrfees = formData.get("inrfees");
      if (formData.has("students")) data.students = formData.get("students");
      if (formData.has("brochure")) data.brochure = formData.get("brochure");
      if (formData.has("brochureLink")) data.brochureLink = formData.get("brochureLink");
      if (formData.has("courseImage")) data.courseImage = formData.get("courseImage");
      if (formData.has("link")) data.link = formData.get("link");
      if (formData.has("sortOrder")) data.sortOrder = Number(formData.get("sortOrder"));
      if (formData.has("isPublished")) {
        data.isPublished = formData.get("isPublished") === "true" || formData.get("isPublished") === true;
      }
      if (formData.has("slug")) data.slug = formData.get("slug");

      // Replace / Upload new Brochure Thumbnail Image
      const imageFile = formData.get("brochureImageFile");
      if (imageFile && typeof imageFile !== "string" && imageFile.size > 0) {
        const buffer = Buffer.from(await imageFile.arrayBuffer());
        const s3Res = await uploadToS3(buffer, imageFile.type, imageFile.name, "brochures");
        data.brochure = s3Res.imageUrl;
        uploadedImageKey = s3Res.imageKey;
        data.brochureKey = s3Res.imageKey;

        // Clean up old S3 image
        if (existing.brochureKey && existing.brochureKey !== s3Res.imageKey) {
          try {
            await deleteFromS3(existing.brochureKey);
          } catch (e) {
            console.error("Failed to delete old brochure image from S3:", e);
          }
        }
      }

      // Replace / Upload new Brochure PDF Document
      const pdfFile = formData.get("brochurePdfFile");
      if (pdfFile && typeof pdfFile !== "string" && pdfFile.size > 0) {
        const buffer = Buffer.from(await pdfFile.arrayBuffer());
        const s3Res = await uploadToS3(buffer, pdfFile.type, pdfFile.name, "brochures/docs");
        data.brochureLink = s3Res.imageUrl;
        uploadedPdfKey = s3Res.imageKey;
        data.brochurePdfKey = s3Res.imageKey;

        // Clean up old S3 PDF
        if (existing.brochurePdfKey && existing.brochurePdfKey !== s3Res.imageKey) {
          try {
            await deleteFromS3(existing.brochurePdfKey);
          } catch (e) {
            console.error("Failed to delete old brochure PDF from S3:", e);
          }
        }
      }
    } else {
      data = await request.json();
    }

    // Slug update if changed
    if (data.slug && data.slug !== existing.slug) {
      data.slug = await generateUniqueBrochureSlug(data.slug, existing._id);
      data.pathname = `/${data.slug}`;
    } else if (data.name && data.name !== existing.name && !data.slug) {
      data.slug = await generateUniqueBrochureSlug(data.name, existing._id);
      data.pathname = `/${data.slug}`;
    }

    data.updatedBy = admin._id;
    data.updatedByName = admin.name || "Admin";

    const updated = await Brochure.findByIdAndUpdate(id, { $set: data }, { new: true, runValidators: true });

    return NextResponse.json(updated, { status: 200 });
  } catch (error) {
    console.error("Admin Brochure PATCH Error:", error);

    // Rollback newly uploaded files if update failed
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
      { message: error.message || "Failed to update brochure." },
      { status: error.message && error.message.includes("log in") ? 401 : 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    await requireAdmin(request);
    const { id } = await params;

    await connectDB();
    const brochure = await Brochure.findById(id);
    if (!brochure) {
      return NextResponse.json({ message: "Brochure not found." }, { status: 404 });
    }

    // Delete S3 files if present
    if (brochure.brochureKey) {
      try {
        await deleteFromS3(brochure.brochureKey);
      } catch (e) {
        console.error("Failed to delete brochure image from S3:", e);
      }
    }

    if (brochure.brochurePdfKey) {
      try {
        await deleteFromS3(brochure.brochurePdfKey);
      } catch (e) {
        console.error("Failed to delete brochure PDF from S3:", e);
      }
    }

    await Brochure.findByIdAndDelete(id);

    return NextResponse.json({ message: "Brochure deleted successfully." }, { status: 200 });
  } catch (error) {
    console.error("Admin Brochure DELETE Error:", error);
    return NextResponse.json(
      { message: error.message || "Failed to delete brochure." },
      { status: error.message && error.message.includes("log in") ? 401 : 500 }
    );
  }
}
