import { Request, Response } from "express";
import pool from "../config/db.config";
import {createNotificationDB} from "../controllers/notificationController";

export const bookAppointment = async (req: Request, res: Response): Promise<void> => {
    const { sender, appointment_date, appointment_time, message } = req.body;
    if (!sender || !appointment_date || !appointment_time || !message) {
        res.status(400).json({ error: "All fields are required" });
        return;
        }

    const client = await pool.connect();

    if (!client) {
        res.status(500).json({ error: "Database connection failed" });
        return;
    }

    try {
        await client.query('BEGIN');

        const member_id = await client.query(
            "SELECT id FROM membership_applications WHERE account_id = $1",
            [sender]
        );
        
        if (member_id.rows.length === 0) {
            res.status(404).json({ error: "Member not found" });
            return;
        }

        const admin_ids = (await client.query("SELECT account_id FROM account_credentials WHERE is_admin = TRUE")).rows;
        const adminIds = admin_ids.map(r => r.account_id);
        if (adminIds.length === 0) {
            res.status(404).json({ error: "No admin accounts found" });
            return;
        }


        const insertResult = await client.query(
        `INSERT INTO appointments
            (sender, receiver, appointment_date, appointment_time, message)
        VALUES
            ($1, $2::uuid[], $3, $4, $5)
        RETURNING *`,
        [member_id.rows[0].id, adminIds, appointment_date, appointment_time, message]
        );

        if (insertResult.rows.length === 0) {
            res.status(500).json({ error: "Failed to book appointment" });
            return;
        }
        // Create notification for each admin
        createNotificationDB(
            sender, 
            adminIds, 
            `New appointment booked for ${appointment_date} at ${appointment_time}`, 
            "Appointment Notification"
        );

        createNotificationDB(
            sender, 
            sender, 
            `Your appointment for ${appointment_date} at ${appointment_time} has been successfully booked.`, 
            "Appointment Confirmation"
        )
        
        
        await client.query('COMMIT');

        res.status(201).json({
            message: "Appointment booked successfully",
            appointment: insertResult.rows[0]
        });

    } catch (error) {
        console.error("Error booking appointment:", error);
        res.status(500).json({ error: "Internal Server Error" });
    } finally {
        client.release();
    }
}

export const getMyAppointments = async (req: Request, res: Response) => {
  const adminId: string = req.params.adminId;      // or pull from auth token, etc.
  const client = await pool.connect();

  try {
    // example using ANY()
    const result = await client.query(
      `SELECT a.id, CONCAT(m.last_name, ', ', m.first_name) AS name, a.message, a.appointment_date, a. appointment_time, a.status
        FROM appointments a
        JOIN membership_applications m ON m.id = a.sender
        WHERE $1::uuid = ANY(receiver)
        ORDER BY appointment_date, appointment_time`,
      [adminId]
    );

    res.status(200).json({ appointments: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch appointments" });
  } finally {
    client.release();
  }
};

export const updateAppointmentStatus = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { status } = req.body; 
    const client = await pool.connect();
    
    try {
        // Validate status
        const validStatuses = ['accepted', 'declined', 'pending'];
        if (!validStatuses.includes(status)) {
            res.status(400).json({ error: 'Invalid status value' });
            return;
        }

        const updateResult = await client.query(
            `UPDATE appointments
                 SET status = $1
             WHERE id = $2
         RETURNING *`,
            [status, id]
        );
        
        if (updateResult.rows.length === 0) {
            res.status(404).json({ error: 'Appointment not found' });
            return;
        }

        res.status(200).json({ appointment: updateResult.rows[0] });
    } catch (error) {
        console.error('Error updating appointment status:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    } finally {
        client.release();
    }
};

