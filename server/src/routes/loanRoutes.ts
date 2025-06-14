import {loans, getloans} from '../controllers/loanControllers';
import { Router } from 'express';

const router = Router();
router.post('/new', loans);
router.get('/all', getloans);

export default router;
