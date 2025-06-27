import { Request, Response } from "express";
import pool from "../config/db.config";

export const initializePayments = async (req: Request, res: Response): Promise<void> => {
  const {
    loan_id,                 // UUID of the loan_application
    payment_terms,           // total number of installments (integer)
    due_date,                // first due date, e.g. "2025-12-26"
    net_loan_fee_proceeds,   // total amount to split across terms, e.g. 16860.00
  } = req.body;

  // 1) Basic validation
  if (
    !loan_id ||
    typeof payment_terms !== "number" ||
    !due_date ||
    typeof net_loan_fee_proceeds !== "number"
  ) {
    res.status(400).json({
      error:
        "Request body must include loan_id (string), payment_terms (number), due_date (string), and net_loan_fee_proceeds (number).",
    });
    return;
  }

  // 2) Parse + sanity-check date
  const start = new Date(due_date);
  if (isNaN(start.getTime())) {
    res.status(400).json({ error: `Invalid due_date: ${due_date}` });
    return;
  }

  // 3) Compute per-installment amount (you may decide on rounding)
  const rawInstallment = net_loan_fee_proceeds / payment_terms;
  // Optionally round to 2 decimals:
  const installmentAmt = Math.round(rawInstallment * 100) / 100;

  // 4) Build INSERT … VALUES placeholders
  const values: any[] = [];
  const placeholders: string[] = [];
  let idx = 1;

  for (let i = 0; i < payment_terms; i++) {
    // due date = start + i months
    const dt = new Date(start);
    dt.setMonth(dt.getMonth() + i);

    // remaining balance = number of unpaid terms × installmentAmt
    const remaining = Math.round((payment_terms - i) * installmentAmt * 100) / 100;

    values.push(
      loan_id,
      dt.toISOString().slice(0, 10), // YYYY-MM-DD
      installmentAmt,
      remaining
    );
    placeholders.push(`($${idx}, $${idx + 1}, $${idx + 2}, $${idx + 3})`);
    idx += 4;
  }

  const sql = `
    INSERT INTO payments
      (loan_application_id, due_date, amount_due, remaining_balance)
    VALUES
      ${placeholders.join(",\n")}
    RETURNING *;
  `;

  try {
    const result = await pool.query(sql, values);
    res.status(201).json({
      insertedCount: result.rows.length,
      payments: result.rows,
    });
  } catch (err) {
    console.error("Error initializing payments:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

