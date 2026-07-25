import express from "express";
import rateLimit from "express-rate-limit";
import { login, getMe, logout } from "../controllers/adminAuthController.js";
import requireAdmin from "../middleware/requireAdmin.js";

const router = express.Router();

// Rate limiter for admin login (5 attempts per 15 minutes)
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 mins
  max: 5,
  message: { message: "Too many login attempts. Please try again after 15 minutes." },
  standardHeaders: true,
  legacyHeaders: false,
});

router.post("/login", loginLimiter, login);
router.get("/me", requireAdmin, getMe);
router.post("/logout", requireAdmin, logout);

export default router;
