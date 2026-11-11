import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import connectDB from "@/src/utils/db";
import Admin from "@/src/models/Admin";

export async function POST(request) {
  try {
    await connectDB();
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required." },
        { status: 400 }
      );
    }

    const admin = await Admin.findOne({ email: email.toLowerCase() });
    if (!admin) {
      return NextResponse.json(
        { message: "Invalid email or password." },
        { status: 401 }
      );
    }

    if (!admin.isActive) {
      return NextResponse.json(
        { message: "Account is inactive. Access denied." },
        { status: 403 }
      );
    }

    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return NextResponse.json(
        { message: "Invalid email or password." },
        { status: 401 }
      );
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
    const forwardedProto = request.headers.get("x-forwarded-proto") || "";
    const isHttps =
      forwardedProto.split(",")[0].trim() === "https" ||
      request.url.startsWith("https://");
    const requestHost = (request.headers.get("host") || "").split(":")[0].toLowerCase();
    const cookieDomain = (process.env.COOKIE_DOMAIN || "").trim().toLowerCase();

    let cookieString = `token=${token}; HttpOnly; Path=/; Max-Age=${7 * 24 * 60 * 60}; SameSite=${isHttps ? "None" : "Lax"}`;
    if (isHttps) {
      cookieString += "; Secure";
    }
    if (cookieDomain && cookieDomain !== "localhost" && requestHost.endsWith(cookieDomain)) {
      cookieString += `; Domain=${cookieDomain}`;
    }

    const response = NextResponse.json({
      message: "Login successful.",
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    }, { status: 200 });

    response.headers.append("Set-Cookie", cookieString);
    return response;
  } catch (error) {
    console.error("Admin Login Error:", error);
    return NextResponse.json(
      { message: error.message || "An error occurred during login." },
      { status: 500 }
    );
  }
}
