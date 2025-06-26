import { Request, Response } from "express";
import pool from "../config/db.config";

export const audit = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { action, details } = req.body;
    try {

        // Insert audit log into the database
        await pool.query(
            "INSERT INTO audit_log (account_id, action, details) VALUES ($1, $2, $3)",
            [id, action, details]
        );

        res.status(201).json({ message: "Audit log created successfully" });
    } catch (error) {
        console.error("Error creating audit log:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const getAuditLogs = async (req: Request, res: Response): Promise<void> => {
    try {
        const result = await pool.query("SELECT * FROM audit_log ORDER BY created_at DESC");
        res.status(200).json(result.rows);
    } catch (error) {
        console.error("Error fetching audit logs:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}