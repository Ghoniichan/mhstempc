import { Request, Response, RequestHandler } from 'express';
import pool from '../config/db.config'; 

export const loans: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    const {
        membershipInfo,
        loanInfo,
        coMaker,
        submissionDate
    } = req.body;

    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        const membership_id = (await client.query("SELECT id from membership_applications WHERE policy_number = $1;", [membershipInfo.policyNumber]));
        if (membership_id.rows.length === 0) {
            res.status(404).json("Membership not found");
            return;
        }
        const mem_id = membership_id.rows[0].id;
        const result = await client.query(
        `INSERT INTO loan_applications (
            membership_application_id, requested_amount, purpose, payment_terms, application_date, submission_date
        ) VALUES ($1, $2, $3, $4, $5, $6)
         RETURNING id`,
        [
            mem_id,
            loanInfo.amount,
            loanInfo.purpose,
            loanInfo.paymentTerms || loanInfo.otherPaymentTerms,
            loanInfo.dateSigned || new Date(),
            submissionDate || new Date()
        ]
        );
        const loan_id = result.rows[0].id;

        if (coMaker) {
            const coMakerInsert = await client.query(
                `INSERT INTO loan_application_co_makers(loan_application_id, co_maker_name, date_signed)
                 VALUES ($1, $2, $3)
                 RETURNING id`,
                [
                    loan_id,
                    coMaker.name,
                    coMaker.dateSigned || new Date()    
                ]
            );
        }

        res.status(201).json({
            message: "Loan application submitted successfully",
            loan_id
        });
        await client.query('COMMIT');
    } catch (err: any) {
        console.error(err.message);
        res.status(500).send("Server error");
    } finally {
        client.release();
    }
};