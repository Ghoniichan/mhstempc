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

export const getloans: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    const client = await pool.connect();
    try {
        const result = await client.query(
            `SELECT CONCAT(m.last_name, ', ', m.first_name) AS name, m.policy_number, l.id, l.requested_amount, l.application_date, l.due_date, l.status
            FROM membership_applications m
            JOIN loan_applications l ON m.id = l.membership_application_id;`
        );
        res.status(200).json(result.rows);
    } catch (err: any) {
        console.error(err.message);
        res.status(500).send("Server error");
    } finally {
        client.release();
    }
};




export const updateLoanStatus: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    const ALLOWED_STATUSES = ['pending', 'approved', 'rejected', 'processing'];
    const client = await pool.connect();
    try {
    const { id } = req.params;
    const { status } = req.body;

    // Validate presence
    if (!status) {
        res.status(400).json({ error: "Missing 'status' in request body" });
        return;
    }
    // Optionally validate allowed values
    if (!ALLOWED_STATUSES.includes(status)) {
        res.status(400).json({ error: `Invalid status value. Allowed: ${ALLOWED_STATUSES.join(', ')}` });
        return;
    }

    // Check if loan exists
    const findRes = await client.query(
        'SELECT id, status FROM loan_applications WHERE id = $1',
        [id]
    );
    if (findRes.rows.length === 0) {
        res.status(404).json({ error: 'Loan application not found' });
        return;
    }

    // Update status
    const updateRes = await client.query(
        `UPDATE loan_applications
            SET status = $1
        WHERE id = $2
        RETURNING id, membership_application_id, requested_amount, application_date, due_date, status`
        ,
        [status, id]
    );
    const updatedLoan = updateRes.rows[0];

    res.status(200).json({
        message: "Status updated successfully",
        loan: updatedLoan,
    });
    } catch (err: any) {
    console.error('Error in updateLoanStatus:', err);
    // If you had a transaction here, you might roll back; but since it's a single UPDATE, no explicit BEGIN/COMMIT needed.
    res.status(500).json({ error: 'Internal server error' });
    } finally {
    client.release();
    }
};