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
            `SELECT
                n.*,
                CASE
                    WHEN ac.is_admin THEN 'Admin'
                    ELSE COALESCE(ma.first_name || ' ' || ma.last_name, ac.email)
                END AS sender_name
            FROM
                notifications n
                LEFT JOIN account_credentials ac ON n.sender = ac.account_id
                LEFT JOIN membership_applications ma ON n.sender = ma.account_id
            WHERE $1 = ANY(n.receiver)
            ORDER BY n.created_at DESC;`, [userId]);
        res.json(response.rows);
    } catch (error) {
        console.error("Error fetching notifications:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

export const createNotification = async (req: Request, res: Response): Promise<void> => {
    const { sender } = req.params;
    const { subject, message } = req.body;
    let { receiver } = req.body;

    if (!subject || !message || !receiver || receiver.length === 0) {
        res.status(400).json({ error: "Subject, message, and receiver (as a non-empty array) are required" });
        return;
    }

    //if receiver is not an array, convert it to an array
        if (!Array.isArray(receiver)) {
            receiver = [receiver];
        }

        try {
            const response = await pool.query(
                `INSERT INTO notifications (sender, subject, message, receiver)
                VALUES ($1, $2, $3, $4::uuid[])
                RETURNING *;`, [sender, subject, message, receiver]);
            res.status(201).json(response.rows[0]);
        } catch (error) {
            console.error("Error creating notification:", error);
            res.status(500).json({ error: "Internal server error" });
        }
}

export const markNotificationAsRead = async (req: Request, res: Response): Promise<void> => {
    const { notificationId } = req.params;

    if (!notificationId) {
        res.status(400).json({ error: "Notification ID is required" });
        return;
    }

    try {
        const response = await pool.query(
            `UPDATE notifications
            SET "isRead" = TRUE
            WHERE id = $1
            RETURNING *;`, [notificationId]);
        
        if (response.rowCount === 0) {
            res.status(404).json({ error: "Notification not found" });
            return;
        }

        res.json(response.rows[0]);
    } catch (error) {
        console.error("Error marking notification as read:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

export async function createNotificationDB(
        sender: string, 
        receiver: string | string[], 
        message: string, 
        subject: string
    ) {

    if (!Array.isArray(receiver)) {
        receiver = [receiver];
    }

    try {
        const response = await pool.query(
            `INSERT INTO notifications (sender, subject, message, receiver)
            VALUES ($1, $2, $3, $4::uuid[])
            RETURNING *;`, [sender, subject, message, receiver]);
        return response.rows[0];
    } catch (error) {
        console.error("Error creating notification:", error);
        throw new Error("Internal server error");
    }
}
