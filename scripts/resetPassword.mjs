import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const email = "admin@academically.com";
const newPassword = "Academically@01";

async function resetPassword() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error("MONGODB_URI not found in process.env");
    process.exit(1);
  }

  try {
    await mongoose.connect(uri);
    const hash = await bcrypt.hash(newPassword, 10);
    const result = await mongoose.connection.collection("admins").updateOne(
      { email: email.toLowerCase() },
      { $set: { passwordHash: hash } }
    );

    if (result.matchedCount === 0) {
      console.log(`No admin found with email: ${email}`);
    } else {
      console.log(`Password updated successfully for: ${email}`);
    }
    await mongoose.disconnect();
  } catch (err) {
    console.error("Error:", err);
    process.exit(1);
  }
}

resetPassword();
