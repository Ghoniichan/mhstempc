import {loans, getloans, updateLoanStatus} from '../controllers/loanControllers';
import { Router } from 'express';

const router = Router();
router.post('/new', loans);
router.get('/all', getloans);
router.patch('/:id/status', updateLoanStatus);

export default router;
