import { Router } from 'express';
import { getSavings, addSavings } from '../controllers/savingsController';

const router = Router();

router.get('/:policy_num', getSavings);
router.post('/add/:policy_num', addSavings);

export default router;

