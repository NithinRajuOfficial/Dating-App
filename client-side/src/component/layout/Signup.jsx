import { Button } from "@material-tailwind/react";
import { Formik, Form } from "formik";
import { nanoid } from "nanoid";

import InputTag from "../common/InputTag";
import { signupInputData } from "../../constants";
import { signupValidationSchema } from "../../utils/validation";
import signupApi from "../../services/signupApi";
import handleGoogleAuthentication from "../../services/googleAuth";

export default function Signup() {
  return (
    <section className="flex justify-center h-[100vh] p-5 sm:p-20">
      <div
        className="w-full border-4 flex justify-center md:justify-end rounded-3xl"
        style={{
          backgroundImage: `url(/signupBg.jpg)`,
          backgroundSize: "cover",
          backgroundPosition: "left",
        }}
      >
        <Formik
          initialValues={signupValidationSchema.initialValues}
          validationSchema={signupValidationSchema.validationSchema}
          onSubmit={(values) => {
            signupApi(values);
          }}
        >
          <Form className="lg:w-2/4 flex flex-col items-center justify-center sm:px-10 md:px-32 gap-3">
            <div className="text-center pb-2">
              <h1 className="text-5xl font-black">WELCOME</h1>
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
              <Button
                variant="gradient"
                size="sm"
                ripple={true}
                className="hover:scale-105 duration-300"
              >
                Login
              </Button>
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
              onClick={handleGoogleAuthentication}
            >
              <img
                src="https://docs.material-tailwind.com/icons/google.svg"
                alt="metamask"
                className="h-6 w-6"
              />
            </Button>
          </Form>
        </Formik>
      </div>
    </section>
  );
}
