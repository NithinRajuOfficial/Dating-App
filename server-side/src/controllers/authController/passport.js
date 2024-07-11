import passport from "passport";


export const googleAuth = async(req, res, next) => {
 await passport.authenticate('google', { scope: ['profile', 'email'] })(req, res, next);
};

export const googleAuthCallback = (req, res, next) => {
  passport.authenticate('google', {
    failureRedirect: '/',
    successRedirect: 'http://localhost:5173',
  })(req, res, next);
};