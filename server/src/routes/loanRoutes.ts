import {loans, getloans, updateLoanStatus, newComputations, getActiveLoans, getLoanByPN, getForPayment} from '../controllers/loanControllers';
import { Router } from 'express';

const router = Router();
router.post('/new', loans);
router.get('/all', getloans);
router.get('/by-policy/:policy_no', getLoanByPN);
router.patch('/:id/status', updateLoanStatus);
router.post('/new/computations', newComputations);
router.get('/active', getActiveLoans);
router.get('/for-payment/:loan_id', getForPayment);

export default router;
