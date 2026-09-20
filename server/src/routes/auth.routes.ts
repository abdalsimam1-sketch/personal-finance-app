import { Router } from "express";
import * as authControllers from "../controllers/auth.controllers.js";
export const authRouter = Router();

//signup
authRouter.post("/signup", authControllers.signup);

//login
authRouter.post("/login", authControllers.login);
//get me
//logout
//rotate tokens
//verify email
//resend verification email
//forgot password
//reset password
//google
//google callback
