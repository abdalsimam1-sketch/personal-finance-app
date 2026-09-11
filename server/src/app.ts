import dotenv from "dotenv";
dotenv.config();
import express,{type Express} from "express"
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { notFound } from "./middleware/notFound.js";
import { errorHandler } from "./middleware/errorHandler.js";

export const app : Express = express();

app.use(express.json())
app.use(helmet())
app.use(cors({
    origin:process.env.CLIENT_URL,
    credentials:true
}))
app.use(rateLimit({
    windowMs:10*60*1000,
    max:100
}))
app.all("*",notFound)
app.use(errorHandler)


