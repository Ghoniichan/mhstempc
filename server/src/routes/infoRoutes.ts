import express from "express";
import { clients, addMember, user, profile, accountStatement } from "../controllers/infoControllers";

const router = express.Router();

router.post("/add-member", addMember);
router.get("/clients", clients);
router.get("/:policy_no", user);
router.get("/profile/:id", profile);
router.get("/statement/:id", accountStatement);
export default router;