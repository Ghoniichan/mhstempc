import { Request, Response } from "express";
import pool from "../config/db.config";

export const getMissedPayments = async (req: Request, res: Response): Promise<void> => {
    try {
        const result = await pool.query(`
            select mp.*, CONCAT(m.last_name, ', ', m.first_name) AS name, m.policy_number, c.net_loan_fee_proceeds, l.due_date, m.tel_cel_no, get_remaining_balance(l.id) remaining_balance
            from missed_payments mp
            join loan_applications l on mp.loan_no = l.id
            join computations c on c.loan_application_id = l.id
            join membership_applications m on m.id = l.membership_application_id
        `);
        res.status(200).json(result.rows);
    } catch (error) {
        console.error("Error fetching missed payments:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};