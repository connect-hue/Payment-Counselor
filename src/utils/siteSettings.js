import connectDB from "./db";
import SiteSetting from "../models/SiteSetting";

/**
 * Fetches global site settings from MongoDB, defaulting to showFees: true
 * when no settings document exists yet or the database is unreachable.
 */
export async function getSiteSettings() {
  try {
    await connectDB();
    const setting = await SiteSetting.findOne({ key: "global" }).lean();
    if (!setting) {
      return {
        showFees: true,
        updatedByName: "",
        updatedAt: null,
      };
    }

    return {
      showFees: setting.showFees !== false,
      updatedByName: setting.updatedByName || "",
      updatedAt: setting.updatedAt || null,
    };
  } catch (error) {
    console.error("Failed to fetch site settings:", error);
    return {
      showFees: true,
      updatedByName: "",
      updatedAt: null,
    };
  }
}

