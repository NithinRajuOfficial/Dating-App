import mongoose from "mongoose";

export default async function connectDB() {
  try {
    await mongoose.connect(process.env.DB_CREDENTIALS);
    console.log("MongoDb Connected Successfully");
  } catch (error) {
    console.error("Connecting to MongoDB failed:", error);
    process.exit(1);
  }
}
