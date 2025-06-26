import express from "express";
import { clients, addMember, user, profile } from "../controllers/infoControllers";

const router = express.Router();

router.post("/add-member", addMember);
router.get("/clients", clients);
router.get("/:policy_no", user);
router.get("/profile/:id", profile);
export default router;