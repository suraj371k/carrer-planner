import { Router } from "express";
import { createUser, getUserProfile, loginUser, logoutUser } from "../controllers/user.controller";
import { authenticate } from "../middleware/authenticate";

const router = Router();

router.post("/register", createUser);
router.post('/login' , loginUser)
router.post('/logout' , logoutUser)
router.get('/profile' , authenticate , getUserProfile)

export default router;
