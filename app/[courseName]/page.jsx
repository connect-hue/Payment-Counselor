import CourseDetailsPage from "@/src/views/CourseDetailsPage";
import { getSiteSettings } from "@/src/utils/siteSettings";

export const dynamic = "force-dynamic";

export default async function DynamicCoursePage() {
  const { showFees } = await getSiteSettings();
  return <CourseDetailsPage initialShowFees={showFees} />;
}
