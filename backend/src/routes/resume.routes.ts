import express from "express";
import { upload } from "../middleware/multer";
import { authenticate } from "../middleware/authenticate";
import {
  getUserResumes,
  getResumeById,
  deleteResume,
  getResumeAnalytics,
  analyzeResume,
} from "../controllers/resume.controller";

const router = express.Router();

// All routes require authentication
router.use(authenticate);

// Upload and analyze resume
router.post("/upload", upload.single("resume"), analyzeResume);

// Get user's resume analysis history
router.get("/", getUserResumes);

// Get specific resume analysis
router.get("/:id", getResumeById);

// Delete resume analysis
router.delete("/:id", deleteResume);

// Get resume analytics/stats
router.get("/analytics/stats", getResumeAnalytics);

export default router;
