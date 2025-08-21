// routes/interview.routes.ts
import express from 'express';
import { 
  getALlSessions,
  getAllTracks,
  getUserSession,
  startInterview, 
  submitAnswer 
} from '../controllers/interview.controller';
import { authenticate } from '../middleware/authenticate';
import { finishVoiceInterview, startVoiceInterview, vapiWebhook } from '../controllers/voiceInterview.controller';


const router = express.Router();

router.post('/start', authenticate, startInterview);

router.post('/answer', authenticate, submitAnswer);

router.get('/tracks' , getAllTracks)

router.get('/user-sessions' , authenticate , getUserSession)

router.get('/all-sessions' , authenticate , getALlSessions)

//speech routes
router.post('/start-voice' , authenticate , startVoiceInterview)

router.post('/vapi/webhook' , authenticate , vapiWebhook)

router.post('/finish' , authenticate , finishVoiceInterview)

export default router;