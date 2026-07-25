import { NextResponse } from "next/server";
import connectDB from "@/src/utils/db";
import Placement from "@/src/models/Placement";
import { requireAdmin } from "@/src/utils/auth";

export async function PATCH(request) {
  try {
    await requireAdmin(request);
    const { orders } = await request.json();

    if (!orders || !Array.isArray(orders)) {
      return NextResponse.json(
        { message: "Invalid payload. Expected orders array." },
        { status: 400 }
      );
    }

    await connectDB();
    const bulkOps = orders.map((item) => ({
      updateOne: {
        filter: { _id: item.id },
        update: { sortOrder: item.sortOrder },
      },
    }));

    await Placement.bulkWrite(bulkOps);

    return NextResponse.json(
      { message: "Placements reordered successfully." },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: error.message || "An error occurred." },
      { status: error.message && error.message.includes("log in") ? 401 : 500 }
    );
  }
}
