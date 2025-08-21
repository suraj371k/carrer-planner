"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authenticate_1 = require("../middleware/authenticate");
const jobs_controller_1 = require("../controllers/jobs.controller");
const router = express_1.default.Router();
router.get('/', authenticate_1.authenticate, jobs_controller_1.jobs);
exports.default = router;
//# sourceMappingURL=jobs.routes.js.map