import { Router } from "express";
import {
  googleAuth,
  googleAuthCallback,
} from "../controllers/authController/passport.js";
import { postLogin, postSignup, renewalOfAccessToken } from "../utils/exportingJunction.js";

const router = Router();

// refresh-token renewal
router.route("/refresh-token").post(renewalOfAccessToken);

// user signup
router.route("/signup").post(postSignup);

// user google authentication
router.route("/google").get(googleAuth);
router.route("/google/callback").get(googleAuthCallback);

// user login
router.route("/login").post(postLogin)

export default router;
