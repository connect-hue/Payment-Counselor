import connectDB from "@/src/utils/db";
import Placement from "@/src/models/Placement";
import PlacementsPage from "@/src/views/PlacementsPage";

// Revalidate this page in the background at most every 60 seconds (Incremental Static Regeneration)
export const revalidate = 60;

async function getPlacements() {
  try {
    await connectDB();
    const placements = await Placement.find({ isPublished: true })
      .sort({ sortOrder: 1, createdAt: -1 })
      .select("-createdBy -__v");
    return JSON.parse(JSON.stringify(placements));
  } catch (error) {
    console.error("Failed to fetch placements on server:", error);
    return [];
  }
}

export default async function Placements() {
  const initialPlacements = await getPlacements();
  return <PlacementsPage initialPlacements={initialPlacements} />;
}
