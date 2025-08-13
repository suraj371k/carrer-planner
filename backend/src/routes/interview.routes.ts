// routes/interview.routes.ts
import express from 'express';
import { 
  startInterview, 
  submitAnswer 
} from '../controllers/interview.controller';
import { authenticate } from '../middleware/authenticate';

const router = express.Router();

router.post('/start', authenticate, startInterview);
router.post('/answer', authenticate, submitAnswer);

export default router;