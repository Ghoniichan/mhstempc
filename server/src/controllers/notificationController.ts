import { Request, Response } from "express";
import pool from "../config/db.config";

export const getNotifications = async (req: Request, res: Response): Promise<void> => {
    const {userId} = req.params;

    if (!userId) {
        res.status(400).json({ error: "User ID is required" });
        return;
    }

    try {
        const response = await pool.query(
            `SELECT *
            FROM notifications
            WHERE $1 = ANY(receiver);`, [userId]);
        res.json(response.rows);
    } catch (error) {
        console.error("Error fetching notifications:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

