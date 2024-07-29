import { v2 as cloudinary } from "cloudinary";
import fileRemover from "./fileRemover.js";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_API_KEY,
});

// uploading file to cloudinary
const uploadOnCloudinary = async (localFilePath) => {
  try {
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    await fileRemover(localFilePath);
    return response;
  } catch (error) {
    console.error("Cloudinary file uploading ERROR: ", error);
    await fileRemover(localFilePath);
  }
};

export default uploadOnCloudinary;
