import jwt from "jsonwebtoken";
import connectDB from "./db";
import Admin from "../models/Admin";

export async function requireAdmin(request) {
  const cookieHeader = request.headers.get("cookie") || "";
  const tokenCookie = cookieHeader
    .split(";")
    .find((cookie) => cookie.trim().startsWith("token="));

  if (!tokenCookie) {
    throw new Error("Authentication required. Please log in.");
  }

  const token = tokenCookie.split("=")[1];
  if (!token) {
    throw new Error("Authentication required. Please log in.");
  }

  await connectDB();

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    throw new Error("Session expired or invalid. Please log in again.");
  }

  const admin = await Admin.findById(decoded.id);
  if (!admin) {
    throw new Error("Administrator account not found.");
  }

  if (!admin.isActive) {
    throw new Error("Account is inactive. Access denied.");
  }

  return admin;
}
