import { Request, Response } from "express";
import pool from "../config/db.config";

export const loanToAccID = async (req: Request, res: Response): Promise<void> => {
    const { loanId } = req.query;

    if (!loanId) {
        res.status(400).json({ error: "Loan ID is required" });
        return;
    }
    
    try {
        const response = await pool.query(
            `SELECT ma.account_id
            FROM public.loan_applications la
            JOIN public.membership_applications ma
            ON la.membership_application_id = ma.id
            WHERE la.id = $1;`, [loanId]);
        res.json(response.rows[0]);
    } catch (error) {
        console.error("Error associating loan with account:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}