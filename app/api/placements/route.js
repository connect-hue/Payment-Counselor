import { NextResponse } from "next/server";
import connectDB from "@/src/utils/db";
import Placement from "@/src/models/Placement";

export async function GET(request) {
  try {
    await connectDB();
    const placements = await Placement.find({ isPublished: true })
      .sort({ sortOrder: 1, createdAt: -1 })
      .select("-createdBy -__v");

    return NextResponse.json(placements, { status: 200 });
  } catch (error) {
    console.error("Public Placements Fetch Error:", error);
    return NextResponse.json(
      { message: "An error occurred while fetching placements." },
      { status: 500 }
    );
  }
}
