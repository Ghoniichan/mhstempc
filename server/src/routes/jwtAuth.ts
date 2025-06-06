// routes/authRoutes.ts
import express from 'express';
import { login, register, verify} from '../controllers/authController';
import authorize from '../middleware/authorize';

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.post("/verify", authorize, verify);

export default router;