import express from "express";
import cors from "cors";
import "dotenv/config";
import path from "path";
import { fileURLToPath } from "url";  
import cookieParser from "cookie-parser";
import connectDB from "./utils/db.js";
import authRouter from "./routes/auth.Routes.js";
import nameRouter from "./routes/name.Routes.js";
import dataRouter from "./routes/data.Routes.js";

const app = express();
const port = process.env.PORT;


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

connectDB();

app.use(express.json());
app.use(cookieParser());


app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use("/api/auth", authRouter);
app.use("/api/name", nameRouter);
app.use("/api/data", dataRouter);

app.listen(port, () => console.log(` Server started on PORT: ${port}`));
