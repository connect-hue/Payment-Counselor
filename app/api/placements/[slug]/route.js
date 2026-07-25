import { NextResponse } from "next/server";
import connectDB from "@/src/utils/db";
import Placement from "@/src/models/Placement";

export async function GET(request, { params }) {
  try {
    const { slug } = await params;
    await connectDB();
    const placement = await Placement.findOne({ slug, isPublished: true })
      .select("-createdBy -__v");

    if (!placement) {
      return NextResponse.json({ message: "Placement not found." }, { status: 404 });
    }

    return NextResponse.json(placement, { status: 200 });
  } catch (error) {
    console.error("Public Placement By Slug Fetch Error:", error);
    return NextResponse.json(
      { message: "An error occurred while fetching placement details." },
      { status: 500 }
    );
  }
}
