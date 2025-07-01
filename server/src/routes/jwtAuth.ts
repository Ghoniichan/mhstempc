// routes/authRoutes.ts
import express from 'express';
import { login, register, verify, genPass, forgotPassword, checkOTP, changePassword} from '../controllers/authController';
import authorize from '../middleware/authorize';

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.post("/verify", authorize, verify);
router.post("/gen-pass/:pass", genPass);
router.post("/forgot-password", forgotPassword);
router.post("/check-otp", checkOTP);
router.post("/change-password", changePassword);

export default router;