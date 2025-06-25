import {loans, getloans, updateLoanStatus, newComputations, getActiveLoans} from '../controllers/loanControllers';
import { Router } from 'express';

const router = Router();
router.post('/new', loans);
router.get('/all', getloans);
router.patch('/:id/status', updateLoanStatus);
router.post('/new/computations', newComputations);
router.get('/active', getActiveLoans);

export default router;
