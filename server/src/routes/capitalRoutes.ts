import { Router } from 'express';
import { getCapital, addCapital, userGetCapital } from '../controllers/capitalController';

const router = Router();

router.get('/:policy_num', getCapital);
router.post('/add/:policy_num', addCapital);
router.get('/user/:account_id', userGetCapital);

export default router;