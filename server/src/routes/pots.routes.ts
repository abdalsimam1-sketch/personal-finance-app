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
potsRouter.patch("/:id", potsControllers.editPot);
//delete a pot
potsRouter.delete("/:id", potsControllers.deletePot);
//add money
potsRouter.patch("/add/:id", potsControllers.addToPot);
//withdraw money
potsRouter.patch("/withdraw/:id", potsControllers.withdrawFromPot);
