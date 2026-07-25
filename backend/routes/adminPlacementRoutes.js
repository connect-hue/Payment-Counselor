import express from "express";
import requireAdmin from "../middleware/requireAdmin.js";
import upload from "../middleware/upload.js";
import {
  getAdminPlacements,
  getAdminPlacementById,
  createPlacement,
  updatePlacement,
  deletePlacement,
  togglePublishPlacement,
  reorderPlacements,
} from "../controllers/placementController.js";

const router = express.Router();

// Require administrator authentication for all dashboard routes
router.use(requireAdmin);

router.get("/", getAdminPlacements);
router.get("/:id", getAdminPlacementById);
router.post("/", upload.single("image"), createPlacement);
router.patch("/reorder", reorderPlacements); // Note: put reorder before :id to prevent collision
router.patch("/:id", upload.single("image"), updatePlacement);
router.delete("/:id", deletePlacement);
router.patch("/:id/publish", togglePublishPlacement);

export default router;
