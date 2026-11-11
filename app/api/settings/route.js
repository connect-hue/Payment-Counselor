import { NextResponse } from "next/server";
import { getSiteSettings } from "@/src/utils/siteSettings";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const { showFees } = await getSiteSettings();
    return NextResponse.json(
      { showFees },
      {
        status: 200,
        headers: {
          "Cache-Control": "no-store, max-age=0",
        },
      }
    );
  } catch (error) {
    console.error("Public Settings GET Error:", error);
    return NextResponse.json(
      { showFees: true },
      {
        status: 200,
        headers: {
          "Cache-Control": "no-store, max-age=0",
        },
      }
    );
  }
}

