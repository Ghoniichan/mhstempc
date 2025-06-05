import { Request, Response } from "express";
import pool from "../config/db.config";

export const getProducts = (req: Request, res: Response): void => {
  pool.query("SELECT * FROM loan_products", (error, result) => {
    if (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
    res.status(200).json(result.rows);
  });
};

export const getTestUsers = (req: Request, res: Response): void => {
  pool.query("SELECT * FROM account_credentials", (error, result) => {
    if (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
    res.status(200).json(result.rows);
  });
};

