import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "./config/passport.js";

dotenv.config({ path: "./.env" });

const app = express();

app.use(helmet());

// Custom Content Security Policy using Helmet
app.use(
  helmet.contentSecurityPolicy({
    useDefaults: true,
    directives: {
      defaultSrc: ["'self'"], // Only allow resources from the same origin
      scriptSrc: ["'self'", process.env.CORS_ORIGIN], // Allow scripts from the same origin and a trusted CDN
      styleSrc: ["'self'", process.env.CORS_ORIGIN], // Allow styles from the same origin and a trusted CDN
      imgSrc: ["'self'", process.env.CORS_ORIGIN], // Allow images from the same origin and an image hosting service
      connectSrc: ["'self'", process.env.CORS_ORIGIN], // Allow AJAX requests to the same origin and a trusted API
      fontSrc: ["'self'", process.env.CORS_ORIGIN], // Allow fonts from the same origin and Google Fonts
      objectSrc: ["'none'"], // Disallow <object>, <embed>, or <applet> elements
      upgradeInsecureRequests: [], // Automatically upgrade HTTP to HTTPS
    },
  })
);

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
app.use(cookieParser());

// importing routes
import userRouter from "./routes/userRouter.js";
import authRouter from "./routes/authRouter.js";

app.use("/api/user/", userRouter);
app.use("/api/auth/", authRouter);

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message || "An unexpected error occurred",
    error: process.env.NODE_ENV === "production" ? {} : err,
  });
});

export default app;
