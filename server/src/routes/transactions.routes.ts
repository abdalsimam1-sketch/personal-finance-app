import { Router } from "express";
export const transactionsRouter = Router();
import { auth } from "../middleware/auth.middleware.js";
import * as transactionsControllers from "../controllers/transactions.controllers.js";

transactionsRouter.use(auth);

//get all transactions
//add new transaction
transactionsRouter.post("/", transactionsControllers.addTransaction);
//edit transaction
//delete transaction
