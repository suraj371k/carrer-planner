"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// routes/interview.routes.ts
const express_1 = __importDefault(require("express"));
const interview_controller_1 = require("../controllers/interview.controller");
const authenticate_1 = require("../middleware/authenticate");
const voiceInterview_controller_1 = require("../controllers/voiceInterview.controller");
const router = express_1.default.Router();
router.post('/start', authenticate_1.authenticate, interview_controller_1.startInterview);
router.post('/answer', authenticate_1.authenticate, interview_controller_1.submitAnswer);
router.get('/tracks', interview_controller_1.getAllTracks);
router.get('/user-sessions', authenticate_1.authenticate, interview_controller_1.getUserSession);
router.get('/all-sessions', authenticate_1.authenticate, interview_controller_1.getALlSessions);
//speech routes
router.post('/start-voice', authenticate_1.authenticate, voiceInterview_controller_1.startVoiceInterview);
router.post('/vapi/webhook', authenticate_1.authenticate, voiceInterview_controller_1.vapiWebhook);
router.post('/finish', authenticate_1.authenticate, voiceInterview_controller_1.finishVoiceInterview);
exports.default = router;
//# sourceMappingURL=interview.routes.js.map