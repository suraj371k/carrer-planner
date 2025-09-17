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

// Trust Render/Proxy so Secure cookies are set correctly
app.set("trust proxy", 1);

app.use(express.json());

// CORS configuration
const envOrigins = (process.env.ALLOWED_ORIGINS || "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);
const allowedOrigins = [process.env.CLIENT_URL, "http://localhost:3000", ...envOrigins].filter(
  Boolean
) as string[];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true); // allow non-browser or same-origin
      if (allowedOrigins.includes(origin)) return callback(null, true);
      // Optionally allow all Vercel preview deployments when enabled
      if (
        process.env.ALLOW_VERCEL_PREVIEWS === "true" &&
        /\.vercel\.app$/.test(new URL(origin).hostname)
      ) {
        return callback(null, true);
      }
      return callback(new Error(`Not allowed by CORS: ${origin}`));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(cookieParser());

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
