import { Button, Dialog } from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import { nanoid } from "nanoid";
import { useDispatch, useSelector } from "react-redux";
import { IoCloseSharp } from "react-icons/io5";

import InputTag from "../common/InputTag";
import { signupInputData } from "../../constants";
import { signupValidationSchema } from "../../utils/validation";
import handleGoogleAuthentication from "../../services/googleAuth";
import { toggleSignupDialog } from "../../redux/slices/signupDialog";
import { toggleLoginDialog } from "../../redux/slices/loginDialog";
import { toggleUserDataDialog } from "../../redux/slices/userDataDialog";
import { toggleUserLogStatus } from "../../redux/slices/userLoggedIn";

export default function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isSignupDialogOpen } = useSelector((state) => state.signupDialog);
  return (
    <Dialog
      size="xl"
      open={isSignupDialogOpen}
      animate={{
        mount: { scale: 1, y: 0, transition: { duration: 0.3 } },
        unmount: { scale: 0.9, y: -100, transition: { duration: 0.3 } },
      }}
      className="flex justify-center h-[100vh] p-5 sm:p-20 bg-transparent shadow-none"
    >
      <div
        className="w-full border-4 flex justify-end rounded-3xl "
        style={{
          backgroundImage: `url(/signupBg.jpg)`,
          backgroundSize: "cover",
          backgroundPosition: "left",
        }}
      >
        <Formik
          initialValues={signupValidationSchema.initialValues}
          validationSchema={signupValidationSchema.validationSchema}
          onSubmit={async (values) => {
            navigate("/user-data", { state: { formData: values } });
            dispatch(toggleSignupDialog()),
              dispatch(toggleUserDataDialog()),
              dispatch(toggleUserLogStatus());
          }}
        >
          <Form className="lg:w-2/4 flex flex-col items-center justify-center sm:px-10 md:px-32 gap-3">
            <div className="text-center pb-2">
              <h1 className="text-5xl font-black text-black">WELCOME</h1>
              <p className="text-sm font-light">
                Please enter the details to signup
              </p>
            </div>

            {signupInputData.map((elm) => (
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
                Signup
              </Button>
              <Link
                onClick={() => {
                  dispatch(toggleLoginDialog());
                  dispatch(toggleSignupDialog());
                }}
                to="/login"
              >
                <Button
                  variant="gradient"
                  size="sm"
                  ripple={true}
                  className="hover:scale-105 duration-300"
                >
                  Login
                </Button>
              </Link>
            </div>
            <div className="flex w-full justify-center items-center pl-4 md:pl-8 pr-4 md:pr-8 pb-2 ">
              <hr className="border-white  w-full" />
              <h2 className="pl-3 pr-3 text-white text-xs md:text-sm">OR</h2>
              <hr className="border-white  w-full" />
            </div>

            <Button
              size="lg"
              variant="outlined"
              color="blue-gray"
              className="flex items-center gap-3 hover:bg-gray-100 hover:scale-110 duration-300"
              onClick={() => {
                dispatch(toggleSignupDialog());
                handleGoogleAuthentication();
              }}
            >
              <img
                src="https://docs.material-tailwind.com/icons/google.svg"
                alt="metamask"
                className="h-6 w-6"
              />
            </Button>
          </Form>
        </Formik>
        <IoCloseSharp
          className="text-xl md:text-2xl mt-1 md:mr-2 md:mt-2 cursor-pointer hover:scale-125 duration-300 hover:text-red-700"
          onClick={() => dispatch(toggleSignupDialog())}
        />
      </div>
    </Dialog>
  );
}
