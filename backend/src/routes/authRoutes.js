import express from 'express';
import { registerUser, loginUser, getProfile, updateUserProfile } from '../controllers/authController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/',authMiddleware,getProfile)
router.patch('/',authMiddleware,updateUserProfile)
export default router;
