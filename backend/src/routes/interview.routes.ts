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

const router = express.Router();

router.post('/start', authenticate , startInterview);

router.post('/answer', authenticate, submitAnswer);

router.get('/tracks' , getAllTracks)

router.get('/user-sessions' , authenticate , getUserSession)

router.get('/all-sessions' , authenticate , getALlSessions)


export default router;