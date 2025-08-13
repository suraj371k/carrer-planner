import express from 'express'
import { authenticate } from '../middleware/authenticate'
import { jobs } from '../controllers/jobs.controller'
const router = express.Router()

router.get('/' , authenticate , jobs)

export default router