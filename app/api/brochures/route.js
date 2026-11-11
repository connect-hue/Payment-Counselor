import { NextResponse } from "next/server";
import connectDB from "@/src/utils/db";
import Brochure from "@/src/models/Brochure";
import { ensureBrochuresSeeded } from "@/src/data/defaultBrochures";
import { getSiteSettings } from "@/src/utils/siteSettings";

export const dynamic = "force-dynamic";

function escapeRegExp(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export async function GET(request) {
  try {
    await connectDB();
    await ensureBrochuresSeeded();

    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const location = searchParams.get("location");
    const search = searchParams.get("search");

    const query = { isPublished: true };

    if (category && category.toLowerCase() !== "all") {
      query.category = { $regex: new RegExp(`^${escapeRegExp(category)}$`, "i") };
    }

    if (location && location.toLowerCase() !== "all") {
      query.location = { $regex: new RegExp(`^${escapeRegExp(location)}$`, "i") };
    }

    if (search) {
      const safeSearch = escapeRegExp(search);
      query.$or = [
        { name: { $regex: safeSearch, $options: "i" } },
        { description: { $regex: safeSearch, $options: "i" } },
        { category: { $regex: safeSearch, $options: "i" } },
        { location: { $regex: safeSearch, $options: "i" } },
      ];
    }

    const [brochures, { showFees }] = await Promise.all([
      Brochure.find(query).sort({ sortOrder: 1, createdAt: -1 }).lean(),
      getSiteSettings(),
    ]);

    const responseData = showFees
      ? brochures
      : brochures.map((item) => ({
          ...item,
          audfees: "",
          inrfees: "",
        }));

    return NextResponse.json(responseData, {
      status: 200,
      headers: {
        "Cache-Control": "no-store, max-age=0",
      },
    });
  } catch (error) {
    console.error("Public Brochures API Error:", error);
    return NextResponse.json(
      { message: error.message || "Failed to fetch brochures." },
      { status: 500 }
    );
  }
}
