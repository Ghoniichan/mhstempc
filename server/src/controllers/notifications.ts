import { Request, Response } from "express";
import pool from "../config/db.config";


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
        [sender, adminIds, appointment_date, appointment_time, message]
        );

        if (insertResult.rows.length === 0) {
            res.status(500).json({ error: "Failed to book appointment" });
            return;
        }
        
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
      `SELECT *
         FROM appointments
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