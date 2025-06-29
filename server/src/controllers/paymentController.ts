import { Request, Response } from "express";
import pool from "../config/db.config";

export const getAllPayments = async (req: Request, res: Response): Promise<void> => {
    try {
        const result = await pool.query(
            `select CONCAT(m.last_name, ', ', m.first_name) AS name, p.* 
            from payments p
            JOIN loan_applications l
            ON l.id = p.loan_application_id
            JOIN membership_applications m 
            ON m.id = l.membership_application_id`
        );
        res.status(200).json(result.rows);
    } catch (err) {
        console.error("Error fetching payments:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const initializePayments = async (
  req: Request,
  res: Response
): Promise<void> => {
  // 1) Normalize body into an array
  const items = Array.isArray(req.body) ? req.body : [req.body];

  // 2) Validate each item
  for (const [i, item] of items.entries()) {
    const { loan_id, payment_terms, due_date, net_loan_fee_proceeds } = item;
    if (
      !loan_id ||
      typeof payment_terms !== "number" ||
      !due_date ||
      typeof net_loan_fee_proceeds !== "number"
    ) {
      res.status(400).json({
        error: `Invalid payload at index ${i}. Must include loan_id (string), payment_terms (number), due_date (string), net_loan_fee_proceeds (number).`
      });
      return;
    }
    if (isNaN(new Date(due_date).getTime())) {
      res.status(400).json({ error: `Invalid due_date at index ${i}: ${due_date}` });
      return;
    }
  }

  // 3) Build one big INSERT: flatten all installments across all items
  const values: any[] = [];
  const placeholders: string[] = [];
  let idx = 1;

  for (const item of items) {
    const { loan_id, payment_terms, due_date, net_loan_fee_proceeds } = item;
    const start = new Date(due_date);

    // --- compute installments array in cents ---
    const totalCents = Math.round(net_loan_fee_proceeds * 100);
    const terms = payment_terms;
    const baseCents = Math.floor(totalCents / terms);
    const remainder = totalCents - baseCents * terms;
    const installmentCents = Array.from({ length: terms }, (_, i) =>
      baseCents + (i < remainder ? 1 : 0)
    );

    // --- for each installment, compute amount_due and remaining_balance ---
    for (let i = 0; i < terms; i++) {
      const dt = new Date(start);
      dt.setMonth(start.getMonth() + i);

      const amount_due = installmentCents[i] / 100;
      const remaining = amount_due;

      values.push(
        loan_id,
        dt.toISOString().slice(0, 10),
        amount_due,
        remaining
      );
      placeholders.push(`($${idx}, $${idx + 1}, $${idx + 2}, $${idx + 3})`);
      idx += 4;
    }
  }

  const sql = `
    INSERT INTO payments
      (loan_application_id, due_date, amount_due, remaining_balance)
    VALUES
      ${placeholders.join(",\n")}
    RETURNING *;
  `;

  // 4) Execute inside a transaction
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const result = await client.query(sql, values);
    await client.query("COMMIT");
    res.status(201).json({
      insertedCount: result.rows.length,
      payments: result.rows,
    });
  } catch (err) {
    await client.query("ROLLBACK");
    console.error("Error initializing payments:", err);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    client.release();
  }
};

export const updatePayment = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { amountPaid } = req.body;

  if (!amountPaid) {
    res.status(400).json({ error: "Amount paid is required." });
    return;
  }

  try {
    const result = await pool.query(
      `UPDATE payments
       SET remaining_balance = remaining_balance - $1
       WHERE id = $2
       RETURNING *;`,
      [amountPaid, id]
    );

    if (result.rows.length === 0) {
      res.status(404).json({ error: "Payment not found." });
      return;
    }

    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error("Error updating payment:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export const getPaymentTerms = async (req: Request, res: Response): Promise<void> => {
  const { loan_id } = req.params;

  if (!loan_id) {
    res.status(400).json({ error: "Loan ID is required." });
    return;
  }

  try {
    const result = await pool.query(
      `SELECT id, due_date, amount_due FROM payments WHERE loan_application_id = $1;`,
      [loan_id]
    );

    if (result.rows.length === 0) {
      res.status(404).json({ error: "Loan not found." });
      return;
    }

    res.status(200).json(result.rows);
  } catch (err) {
    console.error("Error fetching payment terms:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}