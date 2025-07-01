import express from 'express';
import { getMissedPayments } from '../controllers/missedPayController';

const router = express.Router();

router.get('/', getMissedPayments);

export default router;
