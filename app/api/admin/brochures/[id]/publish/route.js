import { NextResponse } from "next/server";
import connectDB from "@/src/utils/db";
import Brochure from "@/src/models/Brochure";
import { requireAdmin } from "@/src/utils/auth";

export const dynamic = "force-dynamic";

export async function PATCH(request, { params }) {
  try {
    const admin = await requireAdmin(request);
    const { id } = await params;
    const { isPublished } = await request.json();

    await connectDB();
    const brochure = await Brochure.findById(id);
    if (!brochure) {
      return NextResponse.json({ message: "Brochure not found." }, { status: 404 });
    }

    brochure.isPublished = Boolean(isPublished);
    brochure.updatedBy = admin._id;
    brochure.updatedByName = admin.name || "Admin";
    await brochure.save();

    return NextResponse.json(brochure, { status: 200 });
  } catch (error) {
    console.error("Brochure Publish Toggle Error:", error);
    return NextResponse.json(
      { message: error.message || "Failed to update publish state." },
      { status: error.message && error.message.includes("log in") ? 401 : 500 }
    );
  }
}
