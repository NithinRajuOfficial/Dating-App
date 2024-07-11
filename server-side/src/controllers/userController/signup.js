import ApiError from "../../utils/apiError.js";
import asyncHandler from "../../utils/asyncHandler.js";
import { User } from "../../models/userModel.js";
import ApiResponse from "../../utils/apiResponse.js";
import generateAccessTokenAndRefreshToken from "../../config/generateAccess&RefreshToken.js";

const postSignup = asyncHandler(async (req, res) => {
  const { userName, email, contactNumber, password } = req.body;

  if (
    [userName, email, contactNumber, password].some(
      (field) => field?.trim() === ""
    )
  ) {
    throw new ApiError(400, "All fields are required");
  }

  if (await User.findOne({ $or: [{ userName }, { email }] })) {
    throw new ApiError(400, "User already exist with same credentials");
  }

  const userData = await User.create({
    userName,
    email,
    contactNumber,
    password,
  });

  const createdUser = await User.findById(userData._id).select("-password");

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong on user registration");
  }
  const { accessToken, refreshToken } = await generateAccessTokenAndRefreshToken(
    createdUser._id
  );

  res.cookie('accessToken', accessToken, {
    httpOnly: true,
    secure: true,
  });

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: true,
    // sameSite: 'strict', // Prevent CSRF attacks
  });

  console.log(accessToken,"+++++++", refreshToken)
  return res.json(
    new ApiResponse(201, createdUser, "Successfully registered user")
  );
});

export default postSignup;
