import express from "express";
import { getInfo, addMember } from "../controllers/infoControllers";

const router = express.Router();

router.post("/add-member", addMember);
router.get("/getInfo", getInfo);

export default router;