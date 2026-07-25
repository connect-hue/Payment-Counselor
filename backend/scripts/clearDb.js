import "dotenv/config";
import mongoose from "mongoose";
import Placement from "../models/Placement.js";
import Admin from "../models/Admin.js";
import connectDB from "../config/database.js";

const clearDB = async () => {
  try {
    await connectDB();
    console.log("Connected to database. Wiping collections...");

    const placementRes = await Placement.deleteMany({});
    console.log(`Deleted ${placementRes.deletedCount} placements.`);

    const adminRes = await Admin.deleteMany({});
    console.log(`Deleted ${adminRes.deletedCount} administrators.`);

    console.log("[SUCCESS] Database cleared successfully!");
  } catch (error) {
    console.error("Failed to clear database:", error.message);
  } finally {
    await mongoose.connection.close();
    console.log("Database connection closed.");
  }
};

clearDB();
