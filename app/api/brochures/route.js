import { NextResponse } from "next/server";
import connectDB from "@/src/utils/db";
import Brochure from "@/src/models/Brochure";
import { ensureBrochuresSeeded } from "@/src/data/defaultBrochures";

export const dynamic = "force-dynamic";

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
      query.category = { $regex: new RegExp(`^${category}$`, "i") };
    }

    if (location && location.toLowerCase() !== "all") {
      query.location = { $regex: new RegExp(`^${location}$`, "i") };
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { category: { $regex: search, $options: "i" } },
        { location: { $regex: search, $options: "i" } },
      ];
    }

    const brochures = await Brochure.find(query).sort({ sortOrder: 1, createdAt: -1 });

    return NextResponse.json(brochures, {
      status: 200,
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
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
