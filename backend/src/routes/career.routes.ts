import { Router } from "express";
import { generateCareerPath } from "../controllers/career.controller";
import { authenticate } from "../middleware/authenticate";

const router = Router();

router.post("/career-path", authenticate, generateCareerPath);

export default router;
