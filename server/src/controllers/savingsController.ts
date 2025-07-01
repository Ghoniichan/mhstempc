import { Request, Response } from "express";
import pool from "../config/db.config";

export const getSavings = (req: Request, res: Response): void => {
    const { policy_num } = req.params;
    if (!policy_num) {
        res.status(400).json({ error: "Policy number is required" });
        return;
    }

    try {
        pool.query("SELECT s.* FROM savings s JOIN membership_applications m ON s.membership_id = m.id WHERE m.policy_number = $1 ORDER BY s.entry_date;", 
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
};

export const getTotalCapitalAndSavings = async (req: Request, res: Response): Promise<void> => {
  const { policy_num } = req.params;
  if (!policy_num) {
    res.status(400).json({ error: "Policy number is required" });
    return;
  }

  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const query = `
      SELECT get_latest_capital_share_by_policy($1) AS total_capital, get_latest_savings_balance($1) AS total_savings;
    `;
    // *** Use client.query here, not pool.query ***
    const { rows } = await client.query(query, [policy_num]);
    const totals = rows[0];

    await client.query('COMMIT');

    res.status(200).json({
      policy_number: policy_num,
      totalCapitalShare: parseFloat(totals.total_capital),
      totalSavings: parseFloat(totals.total_savings)
    });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error("Error fetching totals:", error);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    client.release();
  }
};