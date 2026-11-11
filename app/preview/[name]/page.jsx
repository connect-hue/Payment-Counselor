import Filter from "@/src/Components/Filter";
import connectDB from "@/src/utils/db";
import Brochure from "@/src/models/Brochure";
import { ensureBrochuresSeeded } from "@/src/data/defaultBrochures";
import { getSiteSettings } from "@/src/utils/siteSettings";
import { formatS3Url } from "@/src/utils/s3Helpers";

export const dynamic = "force-dynamic";

function escapeRegExp(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

async function getCategoryPageData(rawName) {
  const categoryName = decodeURIComponent(rawName || "");
  const { showFees } = await getSiteSettings();

  try {
    await connectDB();
    await ensureBrochuresSeeded();

    const query = { isPublished: true };
    if (categoryName && categoryName.toLowerCase() !== "all") {
      query.category = { $regex: new RegExp(`^${escapeRegExp(categoryName)}$`, "i") };
    }

    const docs = await Brochure.find(query)
      .sort({ sortOrder: 1, createdAt: -1 })
      .lean();

    const initialCourses = docs.map((item) => {
      const plain = JSON.parse(JSON.stringify(item));
      return {
        ...plain,
        brochure: formatS3Url(plain.brochure),
        audfees: showFees ? plain.audfees : "",
        inrfees: showFees ? plain.inrfees : "",
        fees: showFees ? (plain.audfees || plain.inrfees || "Contact for fees") : "",
      };
    });

    return {
      initialCourses,
      hasServerData: true,
      showFees,
    };
  } catch (error) {
    console.error("Failed to fetch category brochures on server:", error);
    return {
      initialCourses: null,
      hasServerData: false,
      showFees,
    };
  }
}

export default async function PreviewPage({ params }) {
  const resolvedParams = await params;
  const { initialCourses, hasServerData, showFees } = await getCategoryPageData(
    resolvedParams?.name
  );

  return (
    <Filter
      initialShowFees={showFees}
      initialCourses={initialCourses}
      hasServerData={hasServerData}
    />
  );
}
