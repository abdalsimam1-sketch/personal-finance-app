import "dotenv/config";
import express, { type Express } from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import morgan from "morgan";
import { notFound } from "./middleware/notFound.js";
import { errorHandler } from "./middleware/errorHandler.js";
import cookieParser from "cookie-parser";

//routes import
import { authRouter } from "./routes/auth.routes.js";

export const app: Express = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(helmet());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);
app.use(
  rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 100,
  }),
);

app.use("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Health check passed",
    data: {},
  });
});

//routes
app.use("/api/v1/auth", authRouter);

app.all("/{*catchall}", notFound);
app.use(errorHandler);
