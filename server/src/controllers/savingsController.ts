import { Request, Response } from "express";
import pool from "../config/db.config";

export const getSavings = (req: Request, res: Response): void => {
    const { policy_num } = req.params;
    if (!policy_num) {
        res.status(400).json({ error: "Policy number is required" });
        return;
    }

    try {
        pool.query("SELECT s.* FROM savings s JOIN membership_applications m ON s.membership_id = m.id WHERE m.policy_number = $1;", 
            [policy_num], (error, result) => {
            if (error) {
                console.error("Error fetching savings:", error);
                res.status(500).json({ error: "Internal Server Error" });
                return;
            }
            res.status(200).json(result.rows);
        });
    } catch (error) {
        console.error("Error processing savings request:", error);
        res.status(500).json({ error: "Internal Server Error" });
        return;
        
    }
};

export const addSavings = (req: Request, res: Response): void => {
    const { policy_num } = req.params;
    const { receivedAmount, date, withdrawal } = req.body;
    if (!policy_num || !receivedAmount || !date) {
        res.status(400).json({ error: "Policy number, received amount, and entry date are required" });
        return;
    }

    try {
        pool.query("INSERT INTO savings (membership_id, received_amount, entry_date, withdrawal) SELECT id, $1, $2, $3 FROM membership_applications WHERE policy_number = $4 RETURNING *;",
            [receivedAmount, date, withdrawal, policy_num], (error, result) => {
            if (error) {
                console.error("Error adding savings:", error);
                res.status(500).json({ error: "Internal Server Error" });
                return;
            }
            res.status(201).json(result.rows[0]);
        });
    } catch (error) {
        console.error("Error adding savings:", error);
        res.status(500).json({ error: "Internal Server Error" });
        return;
    }
}