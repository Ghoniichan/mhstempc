import { Request, Response } from "express";
import pool from "../config/db.config";
import { createNotificationDB } from "../controllers/notificationController";

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

        const admin_ids = (await pool.query("SELECT account_id FROM account_credentials WHERE is_admin = TRUE")).rows;
        const adminIds = admin_ids.map(r => r.account_id);
        if (adminIds.length === 0) {
            res.status(404).json({ error: "No admin accounts found" });
            return;
        }
        // Create a notification for the reporter
        await createNotificationDB(
            reporter_id,
            reporter_id,
            `Your bug report titled "${subject}" has been submitted successfully.`,
            "Bug Report Submitted"
        );

        await createNotificationDB(
            reporter_id,
            adminIds,
            `A new bug report titled "${subject}" has been submitted by ${reporter_id}.`,
            "New Bug Report"
        );

        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error("Error submitting bug report:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const resolveReport = async (req: Request, res: Response): Promise<void> => {
    const { report_id, account_id } = req.params;

    // Validate input
    if (!report_id) {
        res.status(400).json({ error: "report_id is required." });
        return;
    }

    const client = await pool.connect();

    try {
        await client.query("BEGIN");
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

        const reporter = result.rows[0].account_id;
        const subject = result.rows[0].subject;
        await createNotificationDB(
            account_id,
            reporter,
            `Your bug report titled "${subject}" has been resolved.`,
            "Bug Report Resolved"
        );

        res.status(200).json(result.rows[0]);
        await client.query("COMMIT");
    } catch (err) {
        console.error("Error resolving bug report:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }finally {
        client.release();
    }

}