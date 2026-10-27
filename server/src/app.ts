import express from "express";

import cookierParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import morgan from "morgan";

import { notFound } from "./middleware/notFound.js";
import { errorHandler } from "./middleware/errorHandler.js";

export const app = express();

app.use(express.json());
app.use(cookierParser());

app.use(morgan("dev"));

//security
app.use(cors());
app.use(helmet());
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
  }),
);

//routes
app.use("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is healthy",
    data: {},
  });
});

app.all("*splat", notFound);

app.use(errorHandler);
