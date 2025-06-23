import { Request, Response } from "express";
import pool from "../config/db.config";

export const getCapital = (req: Request, res: Response): void => {
    const {policy_num} = req.params;

    if (!policy_num) {
        res.status(400).json({ error: "Policy number is required" });
        return;
    }

    try {
        pool.query("SELECT c.* FROM capital_share c JOIN membership_applications m ON c.membership_id = m.id WHERE m.policy_number = $1;", 
            [policy_num], (error, result) => {
            if (error) {
                console.error("Error fetching capital:", error);
                res.status(500).json({ error: "Internal Server Error" });
                return;
            }
            res.status(200).json(result.rows);
        });
    } catch (error) {
        console.error("Error fetching capital:", error);
        res.status(500).json({ error: "Internal Server Error" });
        return;
    }
};

export const addCapital = (req: Request, res: Response): void => {
    const { policy_num } = req.params;
    const { amount, date } = req.body;

    try {
        pool.query("INSERT INTO capital_share (membership_id, amount, entry_date) SELECT id, $1, $2 FROM membership_applications WHERE policy_number = $3 RETURNING *;",
            [amount, date, policy_num], (error, result) => {
            if (error) {
                console.error("Error adding capital:", error);
                res.status(500).json({ error: "Internal Server Error" });
                return;
            }
            res.status(201).json(result.rows[0]);
        });
    } catch (error) {
        console.error("Error adding capital:", error);
        res.status(500).json({ error: "Internal Server Error" });
        return;
    }
}