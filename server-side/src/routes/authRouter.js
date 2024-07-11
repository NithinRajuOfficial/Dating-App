import { Router } from "express";
import {
  googleAuth,
  googleAuthCallback,
} from "../controllers/authController/passport.js";
import { renewalOfAccessToken } from "../utils/exportingJunction.js";

const router = Router();

router.route("/refresh-token").post(renewalOfAccessToken);

router.route("/google").get(googleAuth);
router.route("/google/callback").get(googleAuthCallback);

export default router;
