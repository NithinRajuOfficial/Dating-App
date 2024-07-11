import * as Yup from "yup";

const signupValidationSchema = {
  validationSchema: Yup.object({
    userName: Yup.string().required("Username is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    contactNumber: Yup.string()
      .matches(/^(\+\d{1,3}[- ]?)?\d{10}$/, "Contact number is invalid")
      .required("Contact number is required"),
    password: Yup.string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Enter a valid password"
      )
      .required("Password is required"),
  }),
  initialValues: { userName: "", email: "", contactNumber: "", password: "" },
};

export { signupValidationSchema };
