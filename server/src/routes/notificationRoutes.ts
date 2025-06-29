import {Router} from "express";
import {getNotifications} from "../controllers/notificationController";

const router = Router();

router.get("/:userId", getNotifications);

export default router;