import { Router } from "express";
import {
  googleAuth,
  googleAuthCallback,
} from "../controllers/authController/passport.js";

const router = Router();

router.route("/google").get(googleAuth);
router.route("/google/callback").get(googleAuthCallback);

export default router;
