import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axios";
import { showError } from "../../utils/toastify";

export default function Profile() {

  const navigate = useNavigate()

  useEffect(() => {
    (async () => {
      try {
        const response = await axiosInstance.get(
          "http://localhost:3000/api/user/profile"
        );
        console.log(response, "response of Profile");
      } catch (error) {
        console.error("Profile call failed:", error);
        navigate('/signup')
        showError(error.message)
      }
    })();
  });
  return <div>Profile section</div>;
}
