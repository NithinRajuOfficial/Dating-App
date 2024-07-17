import twilio from "twilio";

import {User} from "../../models/userModel.js"
import ApiError from "../../utils/apiError.js";
import asyncHandler from "../../utils/asyncHandler.js";
import ApiResponse from "../../utils/apiResponse.js";

const client = new twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

const sendOtp = asyncHandler(async (req, res) => {
  const { phoneNumber } = req.body;

  if (!phoneNumber) {
    throw new ApiError(400, "Phone Number is required");
  }

  const isUser = await User.findOne({phoneNumber}).select("-password -refreshToken")

  if(!isUser){
    throw new ApiError(400, "No user exist")
  }

  await client.verify.v2
    .services(process.env.TWILIO_VERIFY_SERVICE_SID)
    .verifications.create({ to: phoneNumber, channel: "sms" });

  res.json(new ApiResponse(200, null, "OTP sent successfully"));
});

const verifyOtp = asyncHandler(async (req, res) => {
  const { phoneNumber, otp } = req.body;

  if (!phoneNumber || !otp) {
    throw new ApiError(400, "Phone Number and OTP are required");
  }

  const response = await client.verify.v2
    .services(process.env.TWILIO_VERIFY_SERVICE_SID)
    .verificationChecks.create({ to: phoneNumber, code: otp.join("") });

  if (response?.status === "approved") {
    res.json(new ApiResponse(200, null, "OTP verified successfully"));
  } else {
    res.json(new ApiResponse(400, null, "Invalid OTP"));
  }
});

export { sendOtp, verifyOtp };
