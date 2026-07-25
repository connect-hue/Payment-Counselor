import "dotenv/config";
import mongoose from "mongoose";
import readline from "readline";
import bcrypt from "bcryptjs";
import Admin from "../models/Admin.js";
import connectDB from "../config/database.js";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const askQuestion = (query) => new Promise((resolve) => rl.question(query, resolve));

const run = async () => {
  try {
    await connectDB();

    console.log("\n=== Create First Administrator ===");
    
    const name = await askQuestion("Enter administrator name: ");
    if (!name.trim()) {
      console.error("Name is required.");
      process.exit(1);
    }

    const email = await askQuestion("Enter email address: ");
    if (!email.trim() || !email.includes("@")) {
      console.error("A valid email address is required.");
      process.exit(1);
    }

    const password = await askQuestion("Enter secure password: ");
    if (password.length < 6) {
      console.error("Password must be at least 6 characters.");
      process.exit(1);
    }

    const roleInput = await askQuestion("Select role (admin/super-admin) [admin]: ");
    const role = roleInput.trim() === "super-admin" ? "super-admin" : "admin";

    // Double check email uniqueness
    const exists = await Admin.findOne({ email: email.toLowerCase().trim() });
    if (exists) {
      console.error(`Error: An administrator with email ${email} already exists.`);
      process.exit(1);
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const admin = new Admin({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      passwordHash,
      role,
      isActive: true,
    });

    await admin.save();
    console.log(`\n[SUCCESS] Admin user created:`);
    console.log(`- ID: ${admin._id}`);
    console.log(`- Name: ${admin.name}`);
    console.log(`- Email: ${admin.email}`);
    console.log(`- Role: ${admin.role}\n`);
    
  } catch (error) {
    console.error("Error creating administrator:", error);
  } finally {
    rl.close();
    mongoose.connection.close();
  }
};

run();
