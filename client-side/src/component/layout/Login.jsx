import { Button, Dialog } from "@material-tailwind/react";
import { Formik, Form } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { IoCloseSharp } from "react-icons/io5";
import { IoMdLogIn } from "react-icons/io";
import { nanoid } from "nanoid";

import { loginInputData } from "../../constants";
import { loginValidationSchema } from "../../utils/validation";
import loginApi from "../../services/loginApi";
import InputTag from "../common/InputTag";
import { toggleLoginDialog } from "../../redux/slices/loginDialog";
import { toggleSignupDialog } from "../../redux/slices/signupDialog";
import { toggleOtpDialog } from "../../redux/slices/otpDialog";
import handleGoogleAuthentication from "../../services/googleAuth";
import { toggleUserLogStatus } from "../../redux/slices/userLoggedIn";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoginDialogOpen } = useSelector((state) => state.loginDialog);
  return (
    <Dialog
      size="xl"
      open={isLoginDialogOpen}
      animate={{
        mount: { scale: 1, y: 0, transition: { duration: 0.3 } },
        unmount: { scale: 0.9, y: -100, transition: { duration: 0.3 } },
      }}
      className="flex justify-center h-[100vh] p-5 sm:p-20 bg-transparent shadow-none"
    >
      <div
        className="w-full border-4 flex justify-between rounded-3xl pl-4 md:pl-2"
        style={{
          backgroundImage: `url(/loginBg.jpg)`,
          backgroundSize: "cover",
          backgroundPosition: "right",
        }}
      >
        <Formik
          initialValues={loginValidationSchema.initialValues}
          validationSchema={loginValidationSchema.validationSchema}
          onSubmit={async (values) => {
            const response = await loginApi(values);
            if (response === true) {
              dispatch(toggleUserLogStatus())
              navigate("/");
              dispatch(toggleLoginDialog());
            }
          }}
        >
          <Form className="lg:w-2/4 flex flex-col items-center justify-center sm:px-10 md:px-32 gap-3">
            <div className="text-center pb-2">
              <h1 className="text-5xl font-black text-gray-900">WELCOME</h1>
              <p className="text-sm font-light">
                Please enter the details to Login
              </p>
            </div>

            {loginInputData.map((elm) => (
              <InputTag key={nanoid()} data={elm} />
            ))}
            <div className="flex gap-8 pt-4 pb-2">
              <Button
                variant="gradient"
                size="sm"
                ripple={true}
                className="hover:scale-105 duration-300"
                type="submit"
              >
                Login
              </Button>
              <Link
                onClick={() => {
                  dispatch(toggleSignupDialog());
                  dispatch(toggleLoginDialog());
                }}
                to="/signup"
              >
                <Button
                  variant="gradient"
                  size="sm"
                  ripple={true}
                  className="hover:scale-105 duration-300"
                >
                  Signup
                </Button>
              </Link>
            </div>
            <div className="flex w-full justify-center items-center pl-4 md:pl-8 pr-4 md:pr-8 pb-2 ">
              <hr className="border-white  w-full" />
              <h2 className="pl-3 pr-3 text-white text-xs md:text-sm">OR</h2>
              <hr className="border-white  w-full" />
            </div>

            <div className="flex gap-5">
              <Link to={"/otp-login"}>
                <Button
                  onClick={() => {
                    dispatch(toggleOtpDialog());
                    dispatch(toggleLoginDialog());
                  }}
                >
                  <span className="flex items-center gap-2">
                    OTP Login <IoMdLogIn className="text-xl" />
                  </span>
                </Button>
              </Link>

              <Button
                size="sm"
                variant="outlined"
                color="blue-gray"
                className="flex items-center gap-3 bg-gray-900"
                onClick={() => {
                  dispatch(toggleLoginDialog());
                  handleGoogleAuthentication();
                }}
              >
                <img
                  src="https://docs.material-tailwind.com/icons/google.svg"
                  alt="metamask"
                  className="h-6 w-6"
                />
              </Button>
            </div>
          </Form>
        </Formik>
        <IoCloseSharp
          className="text-2xl md:text-2xl mt-1 md:mr-2 md:mt-2 cursor-pointer hover:scale-125 duration-300 hover:text-red-700"
          onClick={() => dispatch(toggleLoginDialog())}
        />
      </div>
    </Dialog>
  );
}
