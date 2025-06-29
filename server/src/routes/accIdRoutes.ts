import {Router} from "express";
import { loanToAccID } from "../controllers/accIDController";

const router = Router();

router.get("/loanid", loanToAccID);

export default router;