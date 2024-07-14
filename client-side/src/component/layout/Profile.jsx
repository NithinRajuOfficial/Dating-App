import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axiosInstance from "../../utils/axios";
import { showError } from "../../utils/toastify";
import { toggleSignupDialog } from "../../redux/slices/signupDialog";

export default function Profile() {

  const navigate = useNavigate()
  const dispatch = useDispatch()
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
        dispatch(toggleSignupDialog())
        showError(error.message)
      }
    })();
  });
  return <div>Profile section</div>;
}
