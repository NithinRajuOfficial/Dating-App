import dotenv from "dotenv";
import express from "express";
import cors from "cors";

dotenv.config({ path: "./.env" });

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// importing routes
import userRouter from "./routes/userRouter.js";

app.use("/api/user/", userRouter);

export default app;
