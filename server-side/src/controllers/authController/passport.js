import passport from "passport";
import { User } from "../../models/userModel.js";

export const googleAuth = async (req, res, next) => {
  await passport.authenticate("google", { scope: ["profile", "email"] })(
    req,
    res,
    next
  );
};

export const googleAuthCallback = (req, res, next) => {
  passport.authenticate("google", (err, user, info) => {
    if (err) {
      return res.redirect(
        `http://localhost:5173/signup?error=${encodeURIComponent(err.message)}`
      );
    }
    if (!user) {
      return res.redirect(
        "http://localhost:5173/signup?error=Authentication failed"
      );
    }
    req.logIn(user, async (loginErr) => {
      if (loginErr) {
        return res.redirect(
          `http://localhost:5173/signup?error=${encodeURIComponent(
            loginErr.message
          )}`
        );
      }

      try {
        if (await User.findOne({ googleId: user?.googleId })) {
          return res.redirect("http://localhost:5173/");
        }

        const sanitizedUser = {
          googleId: user?.googleId,
          userName: user?.userName,
          email: user?.email,
          contactNumber: user?.contactNumber,
        };
        return res.redirect(
          `http://localhost:5173/user-data/?user=${encodeURIComponent(
            JSON.stringify(sanitizedUser)
          )}`
        );
      } catch (error) {
        return res.redirect(
          `http://localhost:5173/signup?error=${encodeURIComponent(
            error.message
          )}`
        );
      }
    });
  })(req, res, next);
};
