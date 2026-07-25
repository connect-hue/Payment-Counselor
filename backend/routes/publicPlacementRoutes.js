import express from "express";
import {
  getPublicPlacements,
  getPublicPlacementBySlug,
} from "../controllers/placementController.js";

const router = express.Router();

router.get("/", getPublicPlacements);
router.get("/:slug", getPublicPlacementBySlug);

export default router;
