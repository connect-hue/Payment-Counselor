import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import connectDB from "@/src/utils/db";
import SiteSetting from "@/src/models/SiteSetting";
import { requireAdmin } from "@/src/utils/auth";
import { getSiteSettings } from "@/src/utils/siteSettings";

export const dynamic = "force-dynamic";

function isAuthError(error) {
  const msg = error?.message || "";
  return (
    msg.includes("log in") ||
    msg.includes("Authentication") ||
    msg.includes("Administrator") ||
    msg.includes("inactive")
  );
}

export async function GET(request) {
  try {
    await requireAdmin(request);
    const settings = await getSiteSettings();

    return NextResponse.json(settings, {
      status: 200,
      headers: {
        "Cache-Control": "no-store, max-age=0",
      },
    });
  } catch (error) {
    console.error("Admin Settings GET Error:", error);
    return NextResponse.json(
      { message: error.message || "Failed to fetch site settings." },
      { status: isAuthError(error) ? 401 : 500 }
    );
  }
}

export async function PATCH(request) {
  try {
    const admin = await requireAdmin(request);
    const body = await request.json();

    if (typeof body.showFees !== "boolean") {
      return NextResponse.json(
        { message: "showFees must be a boolean." },
        { status: 400 }
      );
    }

    await connectDB();

    const updated = await SiteSetting.findOneAndUpdate(
      { key: "global" },
      {
        $set: {
          key: "global",
          showFees: body.showFees,
          updatedBy: admin._id,
          updatedByName: admin.name || "Admin",
        },
      },
      {
        upsert: true,
        new: true,
        setDefaultsOnInsert: true,
      }
    ).lean();

    try {
      revalidatePath("/", "layout");
    } catch (revalErr) {
      console.warn("Revalidation warning:", revalErr);
    }

    return NextResponse.json(
      {
        showFees: updated.showFees !== false,
        updatedByName: updated.updatedByName || "",
        updatedAt: updated.updatedAt || null,
      },
      {
        status: 200,
        headers: {
          "Cache-Control": "no-store, max-age=0",
        },
      }
    );
  } catch (error) {
    console.error("Admin Settings PATCH Error:", error);
    return NextResponse.json(
      { message: error.message || "Failed to update site settings." },
      { status: isAuthError(error) ? 401 : 500 }
    );
  }
}

