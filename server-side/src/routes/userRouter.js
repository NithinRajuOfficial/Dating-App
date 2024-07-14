import { Router } from "express";
import profile from "../controllers/userController/profileController.js";
import verifyJwt from "../middlewares/jwtAuth.js";

const router = Router();

router.route("/profile").get(verifyJwt,profile);

export default router;
