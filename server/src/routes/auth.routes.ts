import { Router } from "express";
import * as authControllers from "../controllers/auth.controllers.js";
export const authRouter = Router();
import passport from "passport";

//signup
authRouter.post("/signup", authControllers.signup);

//login
authRouter.post("/login", authControllers.login);

//rotate-tokens
authRouter.post("/rotate-tokens", authControllers.rotateTokens);

//getMe

//google
authRouter.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  }),
);
//google callback
authRouter.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  authControllers.googleCallback,
);

//logout
authRouter.post("/logout", authControllers.logout);

//resend verification email
authRouter.post(
  "/resend-verification-email",
  authControllers.resendVerificationEmail,
);

//verify-account
authRouter.post("/verify-account/:token", authControllers.verifyAccount);

//forgot password
//reset password
