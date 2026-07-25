import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";

/**
 * Admin Login
 * POST /api/admin/auth/login
 */
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }

    const admin = await Admin.findOne({ email: email.toLowerCase() });
    if (!admin) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    if (!admin.isActive) {
      return res.status(403).json({ message: "Account is inactive. Access denied." });
    }

    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    // Update last login timestamp
    admin.lastLoginAt = new Date();
    await admin.save();

    // Sign Token
    const token = jwt.sign(
      { id: admin._id, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
    );

    // Cookie configuration
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // none if frontend/backend are on different domains in production
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    };

    if (process.env.COOKIE_DOMAIN && process.env.COOKIE_DOMAIN !== "localhost") {
      cookieOptions.domain = process.env.COOKIE_DOMAIN;
    }

    res.cookie("token", token, cookieOptions);

    return res.status(200).json({
      message: "Login successful.",
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get current admin session
 * GET /api/admin/auth/me
 */
export const getMe = async (req, res, next) => {
  try {
    return res.status(200).json({
      admin: {
        id: req.admin._id,
        name: req.admin.name,
        email: req.admin.email,
        role: req.admin.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Admin Logout
 * POST /api/admin/auth/logout
 */
export const logout = async (req, res, next) => {
  try {
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    };

    if (process.env.COOKIE_DOMAIN && process.env.COOKIE_DOMAIN !== "localhost") {
      cookieOptions.domain = process.env.COOKIE_DOMAIN;
    }

    res.clearCookie("token", cookieOptions);
    return res.status(200).json({ message: "Logout successful." });
  } catch (error) {
    next(error);
  }
};
