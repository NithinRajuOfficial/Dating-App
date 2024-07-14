import generateAccessTokenAndRefreshToken from "../../config/generateAccess&RefreshToken.js";
import { User } from "../../models/userModel.js";
import ApiError from "../../utils/apiError.js";
import ApiResponse from "../../utils/apiResponse.js";
import asyncHandler from "../../utils/asyncHandler.js";

const postLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if ([email, password].some((field) => field.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }

  const isUser = await User.findOne({ email });

  if (!isUser) {
    throw new ApiError(400, "No user found");
  }

  const isPassword = await isUser.isPasswordCorrect(password);

  if (!isPassword) {
    throw new ApiError(400, "No user is found");
  }

  const { accessToken, refreshToken } =
    await generateAccessTokenAndRefreshToken(isUser._id);

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: true,
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
  });

  const resUserData = {
    _id: isUser._id,
    userName: isUser.userName,
    email: isUser.email,
    contactNumber: isUser.contactNumber
  }

  return res.json(new ApiResponse(200, resUserData, "Login Successful"));
});

export default postLogin;
