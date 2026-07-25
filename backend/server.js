import "dotenv/config";
import app from "./app.js";
import connectDB from "./config/database.js";

const PORT = process.env.PORT || 5000;

// Connect to MongoDB Database
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV || "development"} mode on port ${PORT}`);
  });
}).catch((error) => {
  console.error("Database connection failure. Server unable to start:", error);
  process.exit(1);
});
