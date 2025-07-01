import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();
const loanAssessorUrl = process.env.LOAN_ASSESSOR_URL;

const router = express.Router();

router.post('/assess', async (req, res) => {
  try {
    const { loan_amount, capital_share, savings } = req.body;
    // Forward data to Python FastAPI server
    const response = await axios.post(`${loanAssessorUrl}`, {
      loan_amount,
      capital_share,
      savings,
    });

    // Send back the result from Python to the client
    res.json(response.data);
  } catch (error) {
    console.error('Error connecting to loan assessor:', error);
    res.status(500).json({ error: 'Loan assessor service unavailable.' });
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