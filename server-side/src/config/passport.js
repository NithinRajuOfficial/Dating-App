import dotenv from "dotenv";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { User } from "../models/userModel.js";
import ApiError from "../utils/apiError.js";

dotenv.config({ path: "./.env" });

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const userExist = await User.findOne({ googleId: profile.id });

        if (userExist) {
          throw new ApiError(400, "User already exist");
        }

        const userData = new User({
          googleId: profile.id,
          userName: profile.displayName,
          email: profile.emails[0].value,
          contactNumber: "Not Verified",
        });
        await userData.save();

        return done(null, userData);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

export default passport;
