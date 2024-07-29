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

const loginValidationSchema = {
  validationSchema: Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Enter a valid password"
      )
      .required("Password is required"),
  }),
  initialValues: { email: "", password: "" },
};

const otpLoginValidationSchema = {
  validationSchema: Yup.object({
    contactNumber: Yup.string()
      .matches(/^(\+\d{1,3}[- ]?)?\d{10}$/, "Contact number is invalid")
      .required("Contact number is required"),
  }),
  initialValues: { contactNumber: "" },
};

const userDataDialogValidationSchema = {
  validationSchema: Yup.object({
    dateOfBirth: Yup.date()
      .max(new Date(), "Date cannot be in the future")
      .required("Date of Birth is required"),
    qualification: Yup.string().required("Qualification is required"),
    proImg: Yup.mixed().required("Profile image is required"),
  }),
  initialValues: {
    dateOfBirth: "",
    qualification: "",
    smokingHabits: false,
    drinkingHabits: false,
    proImg: null,
    shortReel: null,
  },
};

const userHobbiesDialogValidationSchema = {
  validateYupSchema: Yup.object({
    hobbies: Yup.array().min(5, "Select minimum 5 hobbies"),
  }),
  initialValues: {
    hobbies: [],
  },
};

export {
  loginValidationSchema,
  signupValidationSchema,
  otpLoginValidationSchema,
  userDataDialogValidationSchema,
  userHobbiesDialogValidationSchema,
};
