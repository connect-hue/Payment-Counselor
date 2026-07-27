import mongoose from "mongoose";
import { formatS3Url } from "@/src/utils/s3Helpers";

const placementSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    qualification: {
      type: String,
      trim: true,
      default: "",
    },
    role: {
      type: String,
      trim: true,
      default: "",
    },
    companies: {
      type: [String],
      required: true,
      default: [],
    },
    packages: {
      type: [String],
      required: true,
      default: [],
    },
    successStory: {
      type: String,
      required: true,
      trim: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    imageKey: {
      type: String,
      required: true,
    },
    imageAlt: {
      type: String,
      trim: true,
      default: "",
    },
    isPublished: {
      type: Boolean,
      default: true,
      index: true,
    },
    sortOrder: {
      type: Number,
      default: 0,
      index: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for searching and sorting

placementSchema.index({ name: 1 });
placementSchema.index({ companies: 1 });
// Compound search index or text index for name and companies
placementSchema.index({ name: "text", companies: "text" });

// Normalize company/package arrays and format S3 image URLs
placementSchema.pre("save", function (next) {
  if (this.imageUrl) {
    this.imageUrl = formatS3Url(this.imageUrl);
  }
  if (this.companies) {
    this.companies = this.companies
      .map((c) => (typeof c === "string" ? c.trim() : ""))
      .filter((c) => c !== "");
  }
  if (this.packages) {
    this.packages = this.packages
      .map((p) => (typeof p === "string" ? p.trim() : ""))
      .filter((p) => p !== "");
  }
  next();
});

placementSchema.set("toJSON", {
  transform: (doc, ret) => {
    if (ret.imageUrl) {
      ret.imageUrl = formatS3Url(ret.imageUrl);
    }
    return ret;
  },
});

placementSchema.set("toObject", {
  transform: (doc, ret) => {
    if (ret.imageUrl) {
      ret.imageUrl = formatS3Url(ret.imageUrl);
    }
    return ret;
  },
});

const Placement = mongoose.models.Placement || mongoose.model("Placement", placementSchema);

export default Placement;
