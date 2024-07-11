import passport from "passport";

import generateAccessTokenAndRefreshToken from "../../config/generateAccess&RefreshToken.js";

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
      const sanitizedUser = {
        googleId: user?.googleId,
        userName: user?.userName,
        email: user?.email,
        contactNumber: user?.contactNumber,
        _id: user?._id,
      };

      try {
        const { accessToken, refreshToken } =
          await generateAccessTokenAndRefreshToken(user?._id);

        res.cookie("accessToken", accessToken, {
          httpOnly: true,
          secure: true,
        });

        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: true,
          // sameSite: 'strict', // Prevent CSRF attacks
        });
        return res.redirect(
          `http://localhost:5173/?user=${encodeURIComponent(
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
