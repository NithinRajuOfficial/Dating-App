import axiosInstance from "../utils/axios";
import { showError, showSuccess } from "../utils/toastify";

export default async function signupApi(data) {
  try {
    const response = await axiosInstance.post(
      "http://localhost:3000/api/auth/signup",
      data,{
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    );
    showSuccess(response?.data?.message);
  } catch (error) {
    console.error("Signup api call failed:", error);
    showError(error?.response?.data?.message);
  }
}
