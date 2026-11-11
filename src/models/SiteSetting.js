import mongoose from "mongoose";

const siteSettingSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      required: true,
      unique: true,
      default: "global",
      trim: true,
    },
    showFees: {
      type: Boolean,
      default: true,
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
    },
    updatedByName: {
      type: String,
      default: "Admin",
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const SiteSetting =
  mongoose.models.SiteSetting || mongoose.model("SiteSetting", siteSettingSchema);

export default SiteSetting;

