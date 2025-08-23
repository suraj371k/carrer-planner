import { Router } from "express";
import { generateCareerPath, getRoadmapById, getUserRoadmaps } from "../controllers/career.controller";
import { authenticate } from "../middleware/authenticate";

const router = Router();

router.post("/", authenticate, generateCareerPath);
router.get('/roadmaps' , authenticate , getUserRoadmaps)
router.get('/roadmap/:id' , authenticate , getRoadmapById)

export default router;
