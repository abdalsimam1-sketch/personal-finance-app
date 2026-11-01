import { Router } from "express";
import * as authControllers from "../controllers/auth.controllers.js";
export const authRouter = Router();

//signup
authRouter.post("/signup", authControllers.signup);
//login
//rotate-tokens
//getMe
//google
//google callback
//logout
//verify-account
//resend verification email
//forgot password
//reset password
