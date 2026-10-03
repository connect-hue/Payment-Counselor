import { NextResponse } from "next/server";
import connectDB from "@/src/utils/db";
import Brochure from "@/src/models/Brochure";
import { initialBrochuresData } from "@/src/data/defaultBrochures";
import { requireAdmin } from "@/src/utils/auth";
import { slugify } from "@/src/utils/slugify";

export const dynamic = "force-dynamic";

export async function POST(request) {
  try {
    const admin = await requireAdmin(request);
    await connectDB();

    let createdCount = 0;
    let updatedCount = 0;

    for (let i = 0; i < initialBrochuresData.length; i++) {
      const item = initialBrochuresData[i];
      const slug = (item.pathname ? item.pathname.replace(/^\//, "") : slugify(item.name)) || `course-${i + 1}`;

      const existing = await Brochure.findOne({ slug });
      if (!existing) {
        await Brochure.create({
          ...item,
          slug,
          isPublished: true,
          sortOrder: item.sortOrder || i + 1,
          createdBy: admin._id,
          createdByName: admin.name || "Admin",
          updatedBy: admin._id,
          updatedByName: admin.name || "Admin",
        });
        createdCount++;
      } else {
        // Update brochure details without overwriting custom uploads
        existing.category = existing.category || item.category;
        existing.location = existing.location || item.location;
        existing.description = existing.description || item.description;
        existing.duration = existing.duration || item.duration;
        existing.audfees = existing.audfees || item.audfees;
        existing.inrfees = existing.inrfees || item.inrfees;
        existing.students = existing.students || item.students;
        existing.brochure = existing.brochure || item.brochure;
        existing.brochureLink = existing.brochureLink || item.brochureLink;
        existing.courseImage = existing.courseImage || item.courseImage;
        existing.link = existing.link || item.link;
        await existing.save();
        updatedCount++;
      }
    }

    return NextResponse.json({
      message: `Sync completed. Created: ${createdCount}, Checked/Updated: ${updatedCount}`,
    }, { status: 200 });
  } catch (error) {
    console.error("Brochure Seed Error:", error);
    return NextResponse.json(
      { message: error.message || "Failed to seed brochures." },
      { status: 500 }
    );
  }
}
