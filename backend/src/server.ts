import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./utils/db";

// Routes
import userRoutues from "./routes/user.routes";
import careerRoutes from "./routes/career.routes";
import jobRoutes from "./routes/jobs.routes";
import interviewRoutes from "./routes/interview.routes";
import resumeRoutes from "./routes/resume.routes";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use(cookieParser());
app.use(
  cors({
    origin: "https://carrer-planner.vercel.app",
    credentials: true,
  })
);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello from Express + TypeScript!");
});

//routes
app.use("/api/users", userRoutues);
app.use("/api/career", careerRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/interview", interviewRoutes);
app.use("/api/resume", resumeRoutes);

// Connect to MongoDB
connectDB();
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
