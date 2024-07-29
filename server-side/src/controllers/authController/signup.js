import ApiError from "../../utils/apiError.js";
import asyncHandler from "../../utils/asyncHandler.js";
import { User } from "../../models/userModel.js";
import ApiResponse from "../../utils/apiResponse.js";
import generateAccessTokenAndRefreshToken from "../../config/generateAccess&RefreshToken.js";
import uploadOnCloudinary from "../../utils/cloudinary.js";
import fileRemover from "../../utils/fileRemover.js";

const postSignup = asyncHandler(async (req, res) => {
  const {
    userName,
    email,
    contactNumber,
    password,
    dateOfBirth,
    qualification,
    smokingHabits,
    drinkingHabits,
    hobbies,
  } = req.body;

  const { proImg, shortReel } = req.files;
  if (
    [
      userName,
      email,
      contactNumber,
      password,
      dateOfBirth,
      qualification,
      smokingHabits,
      drinkingHabits,
    ].some((field) => field?.trim() === "") ||
    [hobbies, proImg, shortReel].some((field) => field?.length === 0)
  ) {
    throw new ApiError(400, "All fields are required");
  }

  if (await User.findOne({ $or: [{ userName }, { email }] })) {
    await fileRemover(proImg[0]?.path);
    await fileRemover(shortReel[0]?.path);
    throw new ApiError(400, "User already exist with same credentials");
  }

  const avatar = await uploadOnCloudinary(proImg[0]?.path);
  const reel = await uploadOnCloudinary(shortReel[0]?.path);

  if (!avatar || !reel) {
    throw new ApiError(500, "Error uploading files");
  }

  const userData = await User.create({
    userName,
    email,
    contactNumber,
    password,
    dateOfBirth,
    qualification,
    smokingHabits,
    drinkingHabits,
    hobbies,
    proImg: avatar.url,
    shortReel: reel.url,
  });

  const createdUser = await User.findById(userData._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong on user registration");
  }
  const { accessToken, refreshToken } =
    await generateAccessTokenAndRefreshToken(createdUser._id);

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: true,
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
  });

  return res.json(
    new ApiResponse(201, createdUser, "Successfully registered user")
  );
});

export default postSignup;
