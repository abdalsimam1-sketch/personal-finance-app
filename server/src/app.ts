import dotenv from "dotenv";
dotenv.config();
import express,{type Express} from "express"
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import morgan from "morgan"
import { notFound } from "./middleware/notFound.js";
import { errorHandler } from "./middleware/errorHandler.js";

export const app : Express = express();

app.use(express.json())
app.use(morgan("dev"))
app.use(helmet())
app.use(cors({
    origin:process.env.CLIENT_URL,
    credentials:true
}))
app.use(rateLimit({
    windowMs:10*60*1000,
    max:100
}))

app.use("/health",(req, res) => {
  res.status(200).json({
    success: true,
    message: "Health check passed",
    data:{
        
    }
  });
    
})
app.all("/{*catchall}",notFound)
app.use(errorHandler)


