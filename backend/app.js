import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

import authRoutes from "./routes/adminAuthRoutes.js";
import adminPlacementRoutes from "./routes/adminPlacementRoutes.js";
import publicPlacementRoutes from "./routes/publicPlacementRoutes.js";
import errorHandler from "./middleware/errorHandler.js";

dotenv.config();

const app = express();

// Security middleware
app.use(helmet());

// CORS configuration (no wildcards, must support credentials)
const allowedOrigins = [process.env.FRONTEND_URL || "http://localhost:5173"];
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow local development tool calls / server-to-server or no-origin clients (like mobile, curl, postman)
      if (!origin) return callback(null, true);
      
      if (allowedOrigins.includes(origin) || process.env.NODE_ENV === "development") {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// Standard parsers with body size limits (5MB to match image upload limit)
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true, limit: "5mb" }));
app.use(cookieParser());

// REST Endpoints
app.use("/api/admin/auth", authRoutes);
app.use("/api/admin/placements", adminPlacementRoutes);
app.use("/api/placements", publicPlacementRoutes);

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", env: process.env.NODE_ENV });
});

// 404 Route handler
app.use((req, res, next) => {
  res.status(404);
  const error = new Error(`Resource Not Found - ${req.originalUrl}`);
  next(error);
});

// Centralized error handler
app.use(errorHandler);

export default app;
