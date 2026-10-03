import { NextResponse } from "next/server";
import connectDB from "@/src/utils/db";
import Brochure from "@/src/models/Brochure";
import { ensureBrochuresSeeded } from "@/src/data/defaultBrochures";

export const dynamic = "force-dynamic";

export async function GET(request, { params }) {
  try {
    const { slug } = await params;
    if (!slug) {
      return NextResponse.json({ message: "Slug is required." }, { status: 400 });
    }

    await connectDB();
    await ensureBrochuresSeeded();

    const cleanSlug = slug.toLowerCase().replace(/^\//, "");
    const cleanPath = `/${cleanSlug}`;

    // Find by slug, pathname, or case-insensitive name converted to slug
    const brochure = await Brochure.findOne({
      $or: [
        { slug: cleanSlug },
        { pathname: cleanPath },
        { pathname: cleanSlug },
      ],
      isPublished: true,
    });

    if (!brochure) {
      // Fallback search by regex match on name or slug
      const fallback = await Brochure.findOne({
        name: { $regex: new RegExp(`^${cleanSlug.replace(/-/g, " ")}$`, "i") },
        isPublished: true,
      });

      if (!fallback) {
        return NextResponse.json({ message: "Brochure not found." }, { status: 404 });
      }

      return NextResponse.json(fallback, { status: 200 });
    }

    return NextResponse.json(brochure, { status: 200 });
  } catch (error) {
    console.error("Single Brochure API Error:", error);
    return NextResponse.json(
      { message: error.message || "Failed to fetch brochure." },
      { status: 500 }
    );
  }
}
