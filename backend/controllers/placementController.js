import Placement from "../models/Placement.js";
import { uploadToS3, deleteFromS3 } from "../utils/s3Helpers.js";

// Helper to generate slug
const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w\-]+/g, "") // Remove all non-word chars
    .replace(/\-\-+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start
    .replace(/-+$/, ""); // Trim - from end
};

// Helper to ensure unique slug
const generateUniqueSlug = async (name, excludeId = null) => {
  const baseSlug = slugify(name) || "candidate";
  let slug = baseSlug;
  let counter = 1;
  while (true) {
    const query = { slug };
    if (excludeId) {
      query._id = { $ne: excludeId };
    }
    const exists = await Placement.findOne(query);
    if (!exists) break;
    slug = `${baseSlug}-${counter}`;
    counter++;
  }
  return slug;
};

// ==========================================
// PUBLIC PLACEMENT ENDPOINTS
// ==========================================

/**
 * Get all published placements
 * GET /api/placements
 */
export const getPublicPlacements = async (req, res, next) => {
  try {
    const placements = await Placement.find({ isPublished: true })
      .sort({ sortOrder: 1, createdAt: -1 })
      .select("-createdBy -__v");

    return res.status(200).json(placements);
  } catch (error) {
    next(error);
  }
};

/**
 * Get a single published placement by slug
 * GET /api/placements/:slug
 */
export const getPublicPlacementBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const placement = await Placement.findOne({ slug, isPublished: true })
      .select("-createdBy -__v");

    if (!placement) {
      return res.status(404).json({ message: "Placement not found." });
    }

    return res.status(200).json(placement);
  } catch (error) {
    next(error);
  }
};

// ==========================================
// ADMIN PLACEMENT ENDPOINTS
// ==========================================

/**
 * Get all placements (Admin Dashboard)
 * GET /api/admin/placements
 */
export const getAdminPlacements = async (req, res, next) => {
  try {
    const { search, status } = req.query;
    const query = {};

    // Filter by published status
    if (status === "published") {
      query.isPublished = true;
    } else if (status === "draft") {
      query.isPublished = false;
    }

    // Search by name or companies
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { companies: { $regex: search, $options: "i" } },
      ];
    }

    const placements = await Placement.find(query)
      .sort({ sortOrder: 1, createdAt: -1 })
      .populate("createdBy", "name email");

    return res.status(200).json(placements);
  } catch (error) {
    next(error);
  }
};

/**
 * Get a single placement by ID (Admin)
 * GET /api/admin/placements/:id
 */
export const getAdminPlacementById = async (req, res, next) => {
  try {
    const placement = await Placement.findById(req.params.id);
    if (!placement) {
      return res.status(404).json({ message: "Placement not found." });
    }
    return res.status(200).json(placement);
  } catch (error) {
    next(error);
  }
};

/**
 * Create a new placement
 * POST /api/admin/placements
 */
export const createPlacement = async (req, res, next) => {
  let uploadedS3Info = null;
  try {
    const {
      name,
      qualification,
      role,
      companies, // Stringified JSON or array
      packages, // Stringified JSON or array
      successStory,
      imageAlt,
      sortOrder,
      isPublished,
    } = req.body;

    if (!name || !successStory) {
      return res.status(400).json({ message: "Name and success story are required fields." });
    }

    if (!req.file) {
      return res.status(400).json({ message: "Candidate image file is required." });
    }

    // Parse array fields if they came as stringified JSON from FormData
    let parsedCompanies = [];
    let parsedPackages = [];
    try {
      parsedCompanies = typeof companies === "string" ? JSON.parse(companies) : companies;
      parsedPackages = typeof packages === "string" ? JSON.parse(packages) : packages;
    } catch (e) {
      // Fallback if not stringified JSON
      parsedCompanies = Array.isArray(companies) ? companies : [companies];
      parsedPackages = Array.isArray(packages) ? packages : [packages];
    }

    if (!parsedCompanies || parsedCompanies.length === 0 || parsedCompanies.filter(Boolean).length === 0) {
      return res.status(400).json({ message: "At least one company is required." });
    }
    if (!parsedPackages || parsedPackages.length === 0 || parsedPackages.filter(Boolean).length === 0) {
      return res.status(400).json({ message: "At least one salary package is required." });
    }

    // Upload to AWS S3
    uploadedS3Info = await uploadToS3(req.file.buffer, req.file.mimetype, req.file.originalname);

    // Generate unique slug
    const slug = await generateUniqueSlug(name);

    // Create placement in database
    const placement = new Placement({
      name,
      slug,
      qualification,
      role: role || "",
      companies: parsedCompanies,
      packages: parsedPackages,
      successStory,
      imageUrl: uploadedS3Info.imageUrl,
      imageKey: uploadedS3Info.imageKey,
      imageAlt: imageAlt || `${name} Placed at ${parsedCompanies.join(", ")}`,
      sortOrder: Number(sortOrder) || 0,
      isPublished: isPublished === "true" || isPublished === true,
      createdBy: req.admin._id,
    });

    await placement.save();
    return res.status(201).json(placement);
  } catch (error) {
    // Rollback: Delete uploaded S3 image if database creation failed
    if (uploadedS3Info && uploadedS3Info.imageKey) {
      console.log("Database creation failed. Rolling back S3 upload for key:", uploadedS3Info.imageKey);
      try {
        await deleteFromS3(uploadedS3Info.imageKey);
      } catch (s3Error) {
        console.error("Failed to delete S3 object during rollback:", s3Error);
      }
    }
    next(error);
  }
};

/**
 * Update an existing placement
 * PATCH /api/admin/placements/:id
 */
export const updatePlacement = async (req, res, next) => {
  let newS3Info = null;
  let oldImageKeyToDelete = null;

  try {
    const { id } = req.params;
    const placement = await Placement.findById(id);

    if (!placement) {
      return res.status(404).json({ message: "Placement not found." });
    }

    const {
      name,
      qualification,
      role,
      companies,
      packages,
      successStory,
      imageAlt,
      sortOrder,
      isPublished,
    } = req.body;

    // Parse array fields if they came as stringified JSON
    let parsedCompanies;
    let parsedPackages;
    if (companies !== undefined) {
      try {
        parsedCompanies = typeof companies === "string" ? JSON.parse(companies) : companies;
      } catch (e) {
        parsedCompanies = Array.isArray(companies) ? companies : [companies];
      }
      if (!parsedCompanies || parsedCompanies.length === 0 || parsedCompanies.filter(Boolean).length === 0) {
        return res.status(400).json({ message: "At least one company is required." });
      }
      placement.companies = parsedCompanies;
    }

    if (packages !== undefined) {
      try {
        parsedPackages = typeof packages === "string" ? JSON.parse(packages) : packages;
      } catch (e) {
        parsedPackages = Array.isArray(packages) ? packages : [packages];
      }
      if (!parsedPackages || parsedPackages.length === 0 || parsedPackages.filter(Boolean).length === 0) {
        return res.status(400).json({ message: "At least one salary package is required." });
      }
      placement.packages = parsedPackages;
    }

    if (name !== undefined) {
      placement.name = name;
      placement.slug = await generateUniqueSlug(name, id);
    }
    if (qualification !== undefined) placement.qualification = qualification;
    if (role !== undefined) placement.role = role;
    if (successStory !== undefined) placement.successStory = successStory;
    if (imageAlt !== undefined) placement.imageAlt = imageAlt;
    if (sortOrder !== undefined) placement.sortOrder = Number(sortOrder);
    if (isPublished !== undefined) {
      placement.isPublished = isPublished === "true" || isPublished === true;
    }

    // Handle image replacement if file provided
    if (req.file) {
      // 1. Upload new image
      newS3Info = await uploadToS3(req.file.buffer, req.file.mimetype, req.file.originalname);
      // Store old key to delete later after DB succeeds
      oldImageKeyToDelete = placement.imageKey;

      placement.imageUrl = newS3Info.imageUrl;
      placement.imageKey = newS3Info.imageKey;
    }

    // 2. Save database changes
    await placement.save();

    // 3. Delete old S3 image after DB update success
    if (oldImageKeyToDelete) {
      console.log("DB updated. Deleting old S3 object with key:", oldImageKeyToDelete);
      try {
        await deleteFromS3(oldImageKeyToDelete);
      } catch (s3Error) {
        console.error("Failed to delete old S3 object after update:", s3Error);
      }
    }

    return res.status(200).json(placement);
  } catch (error) {
    // DB failed: rollback new S3 image if uploaded
    if (newS3Info && newS3Info.imageKey) {
      console.log("DB update failed. Rolling back new S3 image for key:", newS3Info.imageKey);
      try {
        await deleteFromS3(newS3Info.imageKey);
      } catch (s3Error) {
        console.error("Failed to delete newly uploaded S3 object on error:", s3Error);
      }
    }
    next(error);
  }
};

/**
 * Delete a placement
 * DELETE /api/admin/placements/:id
 */
export const deletePlacement = async (req, res, next) => {
  try {
    const { id } = req.params;
    const placement = await Placement.findById(id);

    if (!placement) {
      return res.status(404).json({ message: "Placement not found." });
    }

    // 1. Delete S3 object
    console.log("Deleting S3 image for candidate:", placement.name, "Key:", placement.imageKey);
    try {
      await deleteFromS3(placement.imageKey);
    } catch (s3Error) {
      console.error("S3 image deletion failed during placement delete:", s3Error);
      // We continue to delete the DB record even if S3 delete fails to prevent stuck records,
      // but log the error.
    }

    // 2. Delete MongoDB record
    await Placement.findByIdAndDelete(id);

    return res.status(200).json({
      message: `Placement for ${placement.name} deleted successfully.`,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Toggle placement publication status
 * PATCH /api/admin/placements/:id/publish
 */
export const togglePublishPlacement = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { isPublished } = req.body;

    if (isPublished === undefined) {
      return res.status(400).json({ message: "isPublished value is required." });
    }

    const placement = await Placement.findByIdAndUpdate(
      id,
      { isPublished },
      { new: true }
    );

    if (!placement) {
      return res.status(404).json({ message: "Placement not found." });
    }

    return res.status(200).json(placement);
  } catch (error) {
    next(error);
  }
};

/**
 * Reorder placements
 * PATCH /api/admin/placements/reorder
 */
export const reorderPlacements = async (req, res, next) => {
  try {
    const { orders } = req.body; // Expected format: [ { id: "ID", sortOrder: 0 }, ... ]

    if (!orders || !Array.isArray(orders)) {
      return res.status(400).json({ message: "Invalid payload. Expected orders array." });
    }

    const bulkOps = orders.map((item) => ({
      updateOne: {
        filter: { _id: item.id },
        update: { sortOrder: item.sortOrder },
      },
    }));

    await Placement.bulkWrite(bulkOps);

    return res.status(200).json({ message: "Placements reordered successfully." });
  } catch (error) {
    next(error);
  }
};
