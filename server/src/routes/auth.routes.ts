import { Router } from "express";
import * as authControllers from "../controllers/auth.controllers.js";
export const authRouter = Router();
import { auth } from "../middleware/auth.middleware.js";

//signup
authRouter.post("/signup", authControllers.signup);

//login
authRouter.post("/login", authControllers.login);
//get me
authRouter.get("/me", auth, authControllers.getMe);
//logout
authRouter.post("/logout", auth, authControllers.logout);
//rotate tokens
//verify email
//resend verification email
//forgot password
//reset password
//google
//google callback
