"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const career_controller_1 = require("../controllers/career.controller");
const authenticate_1 = require("../middleware/authenticate");
const router = (0, express_1.Router)();
router.post("/", authenticate_1.authenticate, career_controller_1.generateCareerPath);
router.get('/roadmaps', authenticate_1.authenticate, career_controller_1.getUserRoadmaps);
router.get('/roadmap/:id', authenticate_1.authenticate, career_controller_1.getRoadmapById);
exports.default = router;
//# sourceMappingURL=career.routes.js.map