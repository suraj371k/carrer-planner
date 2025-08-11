import express, { Request,  Response } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./utils/db";

// Routes
import userRoutues from './routes/user.routes'
import careerRoutes from './routes/career.routes'

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
}));


app.get("/", (req: Request, res: Response) => {
  res.send("Hello from Express + TypeScript!");
});

//routes
app.use('/api/users' , userRoutues)
app.use('/api/ai' , careerRoutes)


// Connect to MongoDB
connectDB();
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
