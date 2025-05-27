import express from "express";
import { getProducts, getTestUsers } from "../controllers/accountsController";

const router = express.Router();

router.get("/products", getProducts);
router.get("/users", getTestUsers);

export default router;
