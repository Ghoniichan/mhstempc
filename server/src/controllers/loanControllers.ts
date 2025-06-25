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

export const getComputations = async (req: Request, res: Response): Promise<void> => {
    const { loan_id } = req.params;
    const { amount_loan, paymentTerms } = req.body;

    function termToMonths(term: string): number {
        const map: Record<string, number> = {
            oneMonth:       1,
            twoMonths:      2,
            threeMonths:    3,
            fourMonths:     4,
            fiveMonths:     5,
            sixMonths:      6,
            sevenMonths:    7,
            eightMonths:    8,
            nineMonths:     9,
            tenMonths:     10,
            elevenMonths:   11,
            twelveMonths:   12,
        };

        const months = map[term];
        if (months == null) {
            throw new Error(`Unrecognized payment term: "${term}"`);
        }
        return months;
    }

    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        // Check if loan exists
        const loanCheck = await client.query(
            'SELECT id FROM loan_applications WHERE id = $1',
            [loan_id]
        );
        if (loanCheck.rows.length === 0) {
            res.status(404).json({ error: 'Loan application not found' });
            return;
        }

        if (!amount_loan || !paymentTerms) {
            res.status(400).json({ error: "Missing 'amount_loan' or 'paymentTerms' in request body" });
            return;
        }
        
        function getInterestRate(termKey: string): number {
            const months = termToMonths(termKey);

            if (months >= 1 && months <= 3)  return 0.02;
            if (months >= 4 && months <= 6)  return 0.03;
            if (months >= 7 && months <= 12) return 0.05;

            throw new Error(`No interest rate defined for ${months} months`);
        }

        const interestRate = getInterestRate(paymentTerms);
        const interest = amount_loan * interestRate;
        const paid_up = amount_loan * 0.02;
        const paid_up_capital = Math.floor(paid_up / 50) * 50;
        const savings = paid_up - paid_up_capital;

        function getServiceFee(loan: number): number {
            if (loan >= 3000 && loan <= 5000) return 100;
            if (loan > 5000 && loan <= 10000) return 150;
            if (loan > 10000 && loan <= 15000) return 200;
            if (loan > 15000 && loan <= 20000) return 250;
            if (loan > 20000 && loan <= 25000) return 300;
            if (loan > 25000 && loan <= 30000) return 400;

            return 0; // Default to 0 if no conditions met
        }

        const service_fee = getServiceFee(amount_loan);
        const net_amount = amount_loan - service_fee - interest;

        // const capital = await client.query('SELECT public.get_capital_share_balance($1)', [loan_id]);

        res.status(200).json({
            message: "Computations",
            amount_loan: amount_loan,
            interest: interest,
            paid_up_capital: paid_up_capital,
            savings: savings,
            service_fee: service_fee,
            net_amount: net_amount
        });

        await client.query('COMMIT');
    } catch (err: any) {
        console.error(err.message);
        res.status(500).send("Server error");
    } finally {
        client.release();
    }
}