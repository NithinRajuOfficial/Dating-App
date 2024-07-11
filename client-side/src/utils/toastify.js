import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const showSuccess = (message) => {
  toast.success(message);
};

export const showError = (message) => {
  toast.error(message);
};
