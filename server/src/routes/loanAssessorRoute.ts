import express from 'express';
import axios from 'axios';

const router = express.Router();

router.post('/assess', async (req, res) => {
  try {
    const { loan_amount, capital_share, savings } = req.body;
    // Forward data to Python FastAPI server
    const response = await axios.post('http://localhost:8000/predict', {
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

export default router;