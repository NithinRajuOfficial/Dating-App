import { Router } from "express";
import { postSignup } from "../controllers/userController/signup.js";

const router = Router();

// user signup
router.route("/signup").post(postSignup);

export default router;
