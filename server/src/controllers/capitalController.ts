import { Request, Response } from "express";
import pool from "../config/db.config";

export const getCapital = (req: Request, res: Response): void => {
    const {policy_num} = req.params;

    if (!policy_num) {
        res.status(400).json({ error: "Policy number is required" });
        return;
    }

    try {
        pool.query("SELECT c.* FROM capital_share c JOIN membership_applications m ON c.membership_id = m.id WHERE m.policy_number = $1 ORDER BY c.entry_date DESC;", 
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

export const userGetCapital = async (req: Request, res: Response): Promise<void> => {
    const { account_id } = req.params;

    try {
        const response = await pool.query(`SELECT
                cs.entry_date AS "Date",
                cs.or_code_generated AS "OR",
                cs.ref_code AS "REF",
                cs.amount AS "Received",
                cs.balance AS "Balance"
            FROM
                public.account_credentials ac
            JOIN
                public.membership_applications ma ON ac.account_id = ma.account_id
            JOIN
                public.capital_share cs ON ma.id = cs.membership_id
            WHERE
                ac.account_id = $1
            ORDER BY
                cs.entry_date, cs.id ASC;`, [account_id]);
        res.status(200).json(response.rows);
    } catch (error) {
        console.error("Error fetching user capital:", error);
        res.status(500).json({ error: "Internal Server Error" });
        return;
    }
}