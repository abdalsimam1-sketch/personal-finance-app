import express from "express";

import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import morgan from "morgan";
import "./lib/passport.js";

import { notFound } from "./middleware/notFound.js";
import { errorHandler } from "./middleware/errorHandler.js";

import { authRouter } from "./routes/auth.routes.js";

export const app = express();
app.set("trust proxy", 1);

app.use(express.json());
app.use(cookieParser());

app.use(morgan("dev"));

//security
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);
app.use(helmet());
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 100,
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

app.use("/api/v1/auth", authRouter);

app.all("*splat", notFound);

app.use(errorHandler);
