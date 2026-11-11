import CourseDetailsPage from "@/src/views/CourseDetailsPage";
import connectDB from "@/src/utils/db";
import Brochure from "@/src/models/Brochure";
import { ensureBrochuresSeeded } from "@/src/data/defaultBrochures";
import { getSiteSettings } from "@/src/utils/siteSettings";

export const dynamic = "force-dynamic";

function escapeRegExp(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

async function getCoursePageData(rawCourseName) {
  const cleanSlug = decodeURIComponent(rawCourseName || "")
    .toLowerCase()
    .replace(/^\//, "");
  const cleanPath = `/${cleanSlug}`;

  if (!cleanSlug) {
    return {
      initialCourse: null,
      hasServerData: true,
      isUnavailable: true,
      showFees: true,
    };
  }

  try {
    await connectDB();
    await ensureBrochuresSeeded();

    const [{ showFees }, primaryMatch] = await Promise.all([
      getSiteSettings(),
      Brochure.findOne({
        $or: [
          { slug: cleanSlug },
          { pathname: cleanPath },
          { pathname: cleanSlug },
        ],
      }).lean(),
    ]);

    let brochure = primaryMatch;

    if (!brochure) {
      brochure = await Brochure.findOne({
        name: { $regex: new RegExp(`^${escapeRegExp(cleanSlug.replace(/-/g, " "))}$`, "i") },
      }).lean();
    }

    if (!brochure || !brochure.isPublished) {
      return {
        initialCourse: null,
        hasServerData: true,
        isUnavailable: true,
        showFees,
      };
    }

    const plain = JSON.parse(JSON.stringify(brochure));
    return {
      initialCourse: showFees
        ? plain
        : { ...plain, audfees: "", inrfees: "" },
      hasServerData: true,
      isUnavailable: false,
      showFees,
    };
  } catch (error) {
    console.error("Failed to fetch brochure details on server:", error);
    return {
      initialCourse: null,
      hasServerData: false,
      isUnavailable: false,
      showFees: true,
    };
  }
}

export default async function DynamicCoursePage({ params }) {
  const resolvedParams = await params;
  const { initialCourse, hasServerData, isUnavailable, showFees } =
    await getCoursePageData(resolvedParams?.courseName);

  return (
    <CourseDetailsPage
      initialShowFees={showFees}
      initialCourse={initialCourse}
      hasServerData={hasServerData}
      isUnavailable={isUnavailable}
    />
  );
}
