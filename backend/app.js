import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import indexRoutes from "./routes/index.js";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
const app = express();
app.use(cookieParser())
dotenv.config()
app.use(express.json());
app.use(bodyParser.json({ limit: '30mb' })); 
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors({
    origin: 'http://localhost:5173',
    credentials:true
}));
app.use(morgan("dev"));
app.use("/api",indexRoutes)


export default app;
