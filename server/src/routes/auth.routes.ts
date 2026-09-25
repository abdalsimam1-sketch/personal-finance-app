import { Router } from "express";
import * as authControllers from "../controllers/auth.controllers.js";
export const authRouter = Router();
import { auth } from "../middleware/auth.middleware.js";
import passport from "passport";

//google
authRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
);
//google callback
authRouter.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  authControllers.googleCallback,
);
//signup
authRouter.post("/signup", authControllers.signup);

//login
authRouter.post("/login", authControllers.login);
//get me
authRouter.get("/me", auth, authControllers.getMe);
//logout
authRouter.post("/logout", auth, authControllers.logout);
//rotate tokens
authRouter.post("/rotate-tokens", auth, authControllers.rotateTokens);
//resend verification email
authRouter.post(
  "/resend-verification-email",
  authControllers.resendVerificationEmail,
);
//forgot password
authRouter.post("/forgot-password", authControllers.forgotPassword);
//verify email
authRouter.post("/verify-email/:token", authControllers.verifyEmail);
//reset password
authRouter.post("/reset-password/:token", authControllers.resetPassword);
