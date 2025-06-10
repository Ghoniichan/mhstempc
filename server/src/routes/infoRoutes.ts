import express from "express";
import { clients, addMember } from "../controllers/infoControllers";

const router = express.Router();

router.post("/add-member", addMember);
router.get("/clients", clients);

export default router;