import axiosInstance from "../utils/axios";
import { showError, showSuccess } from "../utils/toastify";
export default async function loginApi(data) {
  try {
    const response = await axiosInstance.post("auth/login", data);
    showSuccess(response?.data?.message);
    return true
  } catch (error) {
    console.error("Login Error:", error);
    showError(error.message);
  }
}
