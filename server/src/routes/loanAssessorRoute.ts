import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import pool from "../config/db.config";

dotenv.config();
const loanAssessorUrl = process.env.LOAN_ASSESSOR_URL;

const router = express.Router();

router.get('/totals/:policy_num', async (req, res) => {
  const { policy_num } = req.params;

  if (!policy_num) {
    res.status(400).json({ error: "Policy number is required" });
    return;
  }

  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const query = `
      SELECT
        COALESCE(SUM(cs.amount), 0) AS total_capital_share,
        COALESCE(SUM(s.received_amount - s.withdrawal), 0) AS total_savings
      FROM membership_applications m
      LEFT JOIN capital_share cs ON m.id = cs.membership_id
      LEFT JOIN savings s ON m.id = s.membership_id
      WHERE m.policy_number = $1
    `;

    const result = await pool.query(query, [policy_num]);
    const totals = result.rows[0];
    const total_capital_share = parseFloat(totals.total_capital_share);
    const total_savings = parseFloat(totals.total_savings);

    res.status(200).json({
      policy_number: policy_num,
      totalCapitalShare: total_capital_share,
      totalSavings: total_savings
    });

    await client.query('COMMIT');
  } catch (error) {
    console.error("Error fetching totals:", error);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    client.release();
  }
});

router.post('/assess', async (req, res) => {

  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const { loan_amount, policy_num } = req.body;

    const query = `
    SELECT
      COALESCE(SUM(cs.amount), 0) AS total_capital_share,
      COALESCE(SUM(s.received_amount - s.withdrawal), 0) AS total_savings
    FROM membership_applications m
    LEFT JOIN capital_share cs ON m.id = cs.membership_id
    LEFT JOIN savings s ON m.id = s.membership_id
    WHERE m.policy_number = $1
  `;

    const result = await pool.query(query, [policy_num]);
    const totals = result.rows[0];
    const total_capital_share = parseFloat(totals.total_capital_share);
    const total_savings = parseFloat(totals.total_savings);

    // Forward data to Python FastAPI server
    const response = await axios.post(`${loanAssessorUrl}`, {
      loan_amount,
      total_capital_share,
      total_savings,
    });

    // Send back the result from Python to the client
    res.json(response.data);
  } catch (error) {
    console.error('Error connecting to loan assessor:', error);
    res.status(500).json({ error: 'Loan assessor service unavailable.' });
  } finally {
    await client.query('COMMIT');
    client.release();
  }
});

router.get('/test-internal', async (req, res) => {
  try {
    const response = await axios.get('http://amusing-spontaneity.railway.internal:8080/'); // Or /predict if GET is allowed
    res.send(response.data);
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : String(e);
    res.status(500).send({ error: errorMessage });
  }
});

export default router;