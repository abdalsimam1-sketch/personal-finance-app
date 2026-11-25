import { Router } from "express";
import * as potsControllers from "../controllers/pots.controllers.js";
import { auth } from "../middleware/auth.middleware.js";

export const potsRouter = Router();
potsRouter.use(auth);

//add a pot
potsRouter.post("/", potsControllers.addPot);
//get pots with pagination
potsRouter.get("/", potsControllers.getPots);
//edit a pot
//delete a pot
//add money
//withdraw money
