import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import readline from "readline";

// Define Admin schema directly for script independence
const adminSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ["admin", "super-admin"], default: "admin" },
  isActive: { type: Boolean, default: true }
});

const Admin = mongoose.models.Admin || mongoose.model("Admin", adminSchema);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (query) => new Promise((resolve) => rl.question(query, resolve));

async function run() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error("Error: MONGODB_URI is not set in process.env. Make sure to run this script loading the .env file.");
    process.exit(1);
  }

  console.log("\n=============================");
  console.log("CREATE NEW ADMINISTRATOR");
  console.log("=============================\n");

  const name = await question("Enter admin name: ");
  const email = await question("Enter admin email: ");
  const password = await question("Enter password: ");
  const roleInput = await question("Enter role (admin / super-admin, default is admin): ");

  rl.close();

  if (!name.trim() || !email.trim() || !password.trim()) {
    console.error("Error: Name, email, and password are required.");
    process.exit(1);
  }

  const role = roleInput.trim().toLowerCase() === "super-admin" ? "super-admin" : "admin";

  try {
    console.log("\nConnecting to database...");
    await mongoose.connect(uri);

    const existing = await Admin.findOne({ email: email.trim().toLowerCase() });
    if (existing) {
      console.error(`Error: Admin with email ${email} already exists!`);
      await mongoose.disconnect();
      process.exit(1);
    }

    console.log("Encrypting password...");
    const passwordHash = await bcrypt.hash(password, 10);

    const admin = new Admin({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      passwordHash,
      role,
      isActive: true
    });

    console.log("Writing to database...");
    await admin.save();

    console.log("\n🎉 Admin created successfully!");
    console.log(`- Name: ${admin.name}`);
    console.log(`- Email: ${admin.email}`);
    console.log(`- Role: ${admin.role}\n`);

    await mongoose.disconnect();
  } catch (err) {
    console.error("\nDatabase error:", err.message);
    process.exit(1);
  }
}

run();
