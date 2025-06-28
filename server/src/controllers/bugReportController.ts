import { Request, Response } from "express";
import pool from "../config/db.config";

export const getAllBugReports = async (req: Request, res: Response): Promise<void> => {
    try {
        const result = await pool.query(
            `SELECT br.*, CONCAT(m.first_name, ' ', m.last_name) AS reporter_name
             FROM bug_reports br
			 JOIN account_credentials a ON a.account_id = br.account_id
			 JOIN membership_applications m ON m.account_id = a.account_id
             ORDER BY br.date_submitted DESC`
        );
        res.status(200).json(result.rows);
    } catch (err) {
        console.error("Error fetching bug reports:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const submitReport = async (req: Request, res: Response): Promise<void> => {
    const { reporter_id, subject, details } = req.body;

    // Validate input
    if (!reporter_id || !subject || !details) {
        res.status(400).json({ error: "reporter_id, subject, and details are required." });
        return;
    }

    try {
        const result = await pool.query(
            `INSERT INTO bug_reports (account_id, subject, details)
             VALUES ($1, $2, $3)
             RETURNING *`,
            [reporter_id, subject, details]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error("Error submitting bug report:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const resolveReport = async (req: Request, res: Response): Promise<void> => {
    const { report_id } = req.params;

    // Validate input
    if (!report_id) {
        res.status(400).json({ error: "report_id is required." });
        return;
    }

    try {
        const result = await pool.query(
            `UPDATE bug_reports
             SET status = 'resolved'
             WHERE id = $1
             RETURNING *`,
            [report_id]
        );

        if (result.rows.length === 0) {
            res.status(404).json({ error: "Bug report not found." });
            return;
        }

        res.status(200).json(result.rows[0]);
    } catch (err) {
        console.error("Error resolving bug report:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }

}