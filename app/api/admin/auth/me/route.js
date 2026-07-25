import { NextResponse } from "next/server";
import { requireAdmin } from "@/src/utils/auth";

export async function GET(request) {
  try {
    const admin = await requireAdmin(request);

    return NextResponse.json({
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: error.message || "Unauthorized access." },
      { status: 401 }
    );
  }
}
