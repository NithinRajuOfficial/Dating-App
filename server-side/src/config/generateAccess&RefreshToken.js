import { User } from "../models/userModel.js";
import ApiError from "../utils/apiError.js";

export default async function generateAccessTokenAndRefreshToken(userId) {
  try {
    const user = await User.findById(userId);

    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    console.error("Failed to generate Access or Refresh Token ERROR:", error);
    throw new ApiError(
      500,
      "Something wrong happened while generating access or refresh tokens"
    );
  }
}
