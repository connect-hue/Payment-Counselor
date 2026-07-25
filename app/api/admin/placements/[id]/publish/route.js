import { NextResponse } from "next/server";
import connectDB from "@/src/utils/db";
import Placement from "@/src/models/Placement";
import { requireAdmin } from "@/src/utils/auth";

export async function PATCH(request, { params }) {
  try {
    await requireAdmin(request);
    const { id } = await params;
    const { isPublished } = await request.json();

    if (isPublished === undefined) {
      return NextResponse.json(
        { message: "isPublished value is required." },
        { status: 400 }
      );
    }

    await connectDB();
    const placement = await Placement.findByIdAndUpdate(
      id,
      { isPublished },
      { new: true }
    );

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
