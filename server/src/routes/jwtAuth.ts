// routes/authRoutes.ts
import express from 'express';
import { login, register, verify, genPass} from '../controllers/authController';
import authorize from '../middleware/authorize';

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.post("/verify", authorize, verify);
router.post("/gen-pass/:pass", genPass);

export default router;