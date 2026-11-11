import Filter from "@/src/Components/Filter";
import { getSiteSettings } from "@/src/utils/siteSettings";

export const dynamic = "force-dynamic";

export default async function PreviewPage() {
  const { showFees } = await getSiteSettings();
  return <Filter initialShowFees={showFees} />;
}
