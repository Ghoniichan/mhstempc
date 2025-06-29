import {Router} from "express";
import {getNotifications, createNotification, markNotificationAsRead} from "../controllers/notificationController";

const router = Router();

router.get("/:userId", getNotifications);
router.post("/send/:sender", createNotification);
router.patch("/read/:notificationId", markNotificationAsRead);

export default router;