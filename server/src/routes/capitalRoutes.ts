import { Router } from 'express';
import { getCapital, addCapital } from '../controllers/capitalController';

const router = Router();

router.get('/:policy_num', getCapital);
router.post('/add/:policy_num', addCapital);

export default router;