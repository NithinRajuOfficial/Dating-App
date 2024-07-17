import { isValidPhoneNumber } from "react-phone-number-input";
import axiosInstance from "../utils/axios";
import { showError, showSuccess } from "../utils/toastify";

async function otpSendApi(value, setPhoneError) {
  try {
    if (!isValidPhoneNumber(value)) {
      setPhoneError("Please enter a valid phone number.");
      console.error("Phone number is valid:", value);
      return;
    }
    const response = await axiosInstance.post("/auth/send-otp", {
      phoneNumber: value,
    });
    if (response?.data?.success === true) showSuccess(response?.data?.message);
    return true;
  } catch (error) {
    console.error("Otp Login api error:", error);
    showError(error?.response?.data?.message);
  }
}

async function otpVerifyApi(otp, value) {
  try {
    const response = await axiosInstance.post("/auth/verify-otp", {
      phoneNumber: value,
      otp,
    });
    if (response?.data?.statusCode === 200) {
      showSuccess(response?.data?.message);
      return true
    }
  } catch (error) {
    console.error("OTP Verification Error:", error);
    showError(error?.response?.data?.message);
  }
}

export { otpSendApi, otpVerifyApi };
