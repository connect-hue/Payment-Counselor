import { NextResponse } from "next/server";
import connectDB from "@/src/utils/db";
import Brochure from "@/src/models/Brochure";
import { ensureBrochuresSeeded } from "@/src/data/defaultBrochures";
import { getSiteSettings } from "@/src/utils/siteSettings";

export const dynamic = "force-dynamic";

function escapeRegExp(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

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

    const [{ showFees }, primaryMatch] = await Promise.all([
      getSiteSettings(),
      Brochure.findOne({
        $or: [
          { slug: cleanSlug },
          { pathname: cleanPath },
          { pathname: cleanSlug },
        ],
        isPublished: true,
      }).lean(),
    ]);

    let brochure = primaryMatch;

    if (!brochure) {
      // Fallback search by regex match on name or slug
      brochure = await Brochure.findOne({
        name: { $regex: new RegExp(`^${escapeRegExp(cleanSlug.replace(/-/g, " "))}$`, "i") },
        isPublished: true,
      }).lean();

      if (!brochure) {
        return NextResponse.json({ message: "Brochure not found." }, { status: 404 });
      }
    }

    const responseData = showFees
      ? brochure
      : {
          ...brochure,
          audfees: "",
          inrfees: "",
        };

    return NextResponse.json(responseData, {
      status: 200,
      headers: {
        "Cache-Control": "no-store, max-age=0",
      },
    });
  } catch (error) {
    console.error("Single Brochure API Error:", error);
    return NextResponse.json(
      { message: error.message || "Failed to fetch brochure." },
      { status: 500 }
    );
  }
}
