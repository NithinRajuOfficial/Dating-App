import { Router } from "express";
import postSignup from "../controllers/userController/signup.js";
import profile from "../controllers/userController/profileController.js";
import verifyJwt from "../middlewares/jwtAuth.js";

const router = Router();

// user signup
router.route("/signup").post(postSignup);
router.route("/profile").get(verifyJwt,profile);

export default router;
