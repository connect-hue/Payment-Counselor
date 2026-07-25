import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";

const requireAdmin = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Authentication required. Please log in." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await Admin.findById(decoded.id);

    if (!admin) {
      return res.status(401).json({ message: "Administrator account not found." });
    }

    if (!admin.isActive) {
      return res.status(403).json({ message: "Account is inactive. Access denied." });
    }

    req.admin = admin;
    next();
  } catch (error) {
    console.error("Authentication check failed:", error.message);
    return res.status(401).json({ message: "Session expired or invalid. Please log in again." });
  }
};

export default requireAdmin;
