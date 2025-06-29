import {Router} from "express";
import {getNotifications, createNotification} from "../controllers/notificationController";

const router = Router();

router.get("/:userId", getNotifications);
router.post("/send/:sender", createNotification);

export default router;