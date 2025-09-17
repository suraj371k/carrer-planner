"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = require("../middleware/multer");
const authenticate_1 = require("../middleware/authenticate");
const resume_controller_1 = require("../controllers/resume.controller");
const router = express_1.default.Router();
// All routes require authentication
router.use(authenticate_1.authenticate);
// Upload and analyze resume
router.post("/upload", multer_1.upload.single("resume"), resume_controller_1.analyzeResume);
// Get user's resume analysis history
router.get("/", resume_controller_1.getUserResumes);
// Get specific resume analysis
router.get("/:id", resume_controller_1.getResumeById);
// Delete resume analysis
router.delete("/:id", resume_controller_1.deleteResume);
// Get resume analytics/stats
router.get("/analytics/stats", resume_controller_1.getResumeAnalytics);
exports.default = router;
//# sourceMappingURL=resume.routes.js.map