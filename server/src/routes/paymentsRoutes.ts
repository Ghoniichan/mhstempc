import { Router } from 'express';
import {initializePayments} from '../controllers/paymentController';

const router = Router();

router.post('/initialize', initializePayments);

export default router;