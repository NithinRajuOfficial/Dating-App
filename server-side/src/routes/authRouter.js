import { Router } from "express";
import { upload } from "../middlewares/multer.js";
import {
  googleAuth,
  googleAuthCallback,
} from "../controllers/authController/passport.js";
import {
  postLogin,
  postSignup,
  sendOtp,
  verifyOtp,
  renewalOfAccessToken,
} from "../utils/exportingJunction.js";

const router = Router();

// refresh-token renewal
router.route("/refresh-token").post(renewalOfAccessToken);

// user signup
router
  .route("/signup")
  .post(upload.fields([{ name: "proImg" }, { name: "shortReel" }]), postSignup);

// user google authentication
router.route("/google").get(googleAuth);
router.route("/google/callback").get(googleAuthCallback);

// user login
router.route("/login").post(postLogin);

// user send-otp
router.route("/send-otp").post(sendOtp);

// user verify-otp
router.route("/verify-otp").post(verifyOtp);

export default router;
