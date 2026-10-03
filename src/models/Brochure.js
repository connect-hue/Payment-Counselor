import mongoose from "mongoose";

const brochureSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Course/Brochure name is required"],
      trim: true,
    },
    slug: {
      type: String,
      required: [true, "Slug is required"],
      unique: true,
      trim: true,
      lowercase: true,
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
      default: "Pharmacist",
    },
    location: {
      type: String,
      required: [true, "Location is required"],
      trim: true,
      default: "Australia",
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
    duration: {
      type: String,
      default: "4 Months",
      trim: true,
    },
    audfees: {
      type: String,
      default: "",
      trim: true,
    },
    inrfees: {
      type: String,
      default: "",
      trim: true,
    },
    students: {
      type: String,
      default: "1000+",
      trim: true,
    },
    // Thumbnail / Preview image (SVG / WebP / PNG / JPG)
    brochure: {
      type: String,
      default: "",
      trim: true,
    },
    brochureKey: {
      type: String,
      default: "",
    },
    // PDF or Google Drive download link
    brochureLink: {
      type: String,
      default: "",
      trim: true,
    },
    brochurePdfKey: {
      type: String,
      default: "",
    },
    // Optional Course banner image
    courseImage: {
      type: String,
      default: "",
      trim: true,
    },
    courseImageKey: {
      type: String,
      default: "",
    },
    // Video embed / YouTube link
    link: {
      type: String,
      default: "",
      trim: true,
    },
    pathname: {
      type: String,
      default: "",
      trim: true,
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
    sortOrder: {
      type: Number,
      default: 0,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
    },
    createdByName: {
      type: String,
      default: "Admin",
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
    },
    updatedByName: {
      type: String,
      default: "Admin",
    },
  },
  {
    timestamps: true,
  }
);

brochureSchema.index({ category: 1, location: 1 });
brochureSchema.index({ isPublished: 1, sortOrder: 1 });

const Brochure = mongoose.models.Brochure || mongoose.model("Brochure", brochureSchema);

export default Brochure;
