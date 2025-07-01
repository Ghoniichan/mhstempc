import { Router } from 'express';
import { getSavings, addSavings, getTotalCapitalAndSavings } from '../controllers/savingsController';

const router = Router();

router.get('/:policy_num', getSavings);
router.post('/add/:policy_num', addSavings);
router.get('/totals/:policy_num', getTotalCapitalAndSavings);

export default router;

