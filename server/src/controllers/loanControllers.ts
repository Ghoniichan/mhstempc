import { Request, Response, RequestHandler } from 'express';
import pool from '../config/db.config'; 
import { stat } from 'fs';

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
    const ALLOWED_STATUSES = ['pending', 'approved', 'disapproved', 'processing'];
    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        const { id } = req.params;
        const { status } = req.body;

        // Validate presence
        if (!status) {
            await client.query('ROLLBACK');
            res.status(400).json({ error: "Missing 'status' in request body" });
            return;
        }
        // Validate allowed values
        if (!ALLOWED_STATUSES.includes(status)) {
            await client.query('ROLLBACK');
            res.status(400).json({ error: `Invalid status value. Allowed: ${ALLOWED_STATUSES.join(', ')}` });
            return;
        }

        // Check if loan exists
        const findRes = await client.query(
            'SELECT id, status, membership_application_id, requested_amount, application_date, due_date FROM loan_applications WHERE id = $1',
            [id]
        );
        if (findRes.rows.length === 0) {
            await client.query('ROLLBACK');
            res.status(404).json({ error: 'Loan application not found' });
            return;
        }
        const loanRow = findRes.rows[0];

        // Update status
        const updateRes = await client.query(
            `UPDATE loan_applications
             SET status = $1
             WHERE id = $2
             RETURNING id, membership_application_id, requested_amount, application_date, due_date, status`,
            [status, id]
        );
        if (updateRes.rows.length === 0) {
            // This should not normally happen since we already checked existence, but handle defensively
            await client.query('ROLLBACK');
            res.status(404).json({ error: 'Loan application not found after update' });
            return;
        }
        const updatedLoan = updateRes.rows[0];

        // If approved, insert into capital_share (after checking computations)
        if (status === 'approved') {
            // Fetch computations for this loan
            const compRes = await client.query(
                `SELECT savings, paid_up_capital FROM computations WHERE loan_application_id = $1`,
                [id]
            );
            if (compRes.rows.length === 0) {
                // No computations found: rollback and error
                await client.query('ROLLBACK');
                res.status(500).json({ error: 'No computations found for approved loan' });
                return;
            }
            const { paid_up_capital } = compRes.rows[0];
            const { savings } = compRes.rows[0];

            // Insert into capital_share
            await client.query(
                `INSERT INTO capital_share (membership_id, amount, entry_date)
                VALUES ($1, $2, $3)`,
                [loanRow.membership_application_id, paid_up_capital, new Date()]
            );

            const savingsNum = Number(savings);
            if ( savingsNum !== 0){
                await client.query(
                    `INSERT INTO savings (membership_id, received_amount, entry_date)
                    VALUES ($1, $2, $3)`,
                    [loanRow.membership_application_id, savings, new Date()]
                )
            }

            // Commit transaction
            await client.query('COMMIT');

            // Respond with both updated loan and new capital_share info
            res.status(200).json({
                message: 'Loan approved and capital share updated',
            });
            return;
        }

        // For other statuses: just commit and respond
        await client.query('COMMIT');
        res.status(200).json({
            message: `Loan status updated to '${status}'`,
            loan: updatedLoan
        });

    } catch (err: any) {
        console.error('Error in updateLoanStatus:', err);
        try {
            await client.query('ROLLBACK');
        } catch (rollbackErr) {
            console.error('Error rolling back transaction:', rollbackErr);
        }
        // If headers not sent yet, send 500
        if (!res.headersSent) {
            res.status(500).json({ error: 'Internal server error' });
        }
    } finally {
        client.release();
    }
};

export const newComputations: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    const { loan_id, loan_amount, interest, paid_up_capital, service_fee, savings, net_loan_proceeds } = req.body;

    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        // Insert new computations
        await client.query(
            `INSERT INTO computations (loan_application_id, amount_of_loan, interest, paid_up_capital, service_fee, savings, net_loan_fee_proceeds)
             VALUES ($1, $2, $3, $4, $5, $6, $7)`,
            [loan_id, loan_amount, interest, paid_up_capital, service_fee, savings, net_loan_proceeds]
        );

        await client.query('COMMIT');
        res.status(201).json({ message: "New computations created successfully" });
    } catch (error: any) {
        console.error('Error in newComputations:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}