import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import session from "express-session";
import passport from "./config/passport.js";

dotenv.config({ path: "./.env" });

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

// // Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// importing routes
import userRouter from "./routes/userRouter.js";
import authRouter from "./routes/authRouter.js";

app.use("/api/user/", userRouter);
app.use("/api/auth/", authRouter);

export default app;
