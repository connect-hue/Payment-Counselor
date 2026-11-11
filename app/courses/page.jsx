import CourseList from "@/src/Components/CourseList";
import { getSiteSettings } from "@/src/utils/siteSettings";

export const dynamic = "force-dynamic";

export default async function CoursesPage() {
  const { showFees } = await getSiteSettings();
  return (
    <CourseList courses={[]} showFees={showFees} />
  );
}
