import { Router } from 'express';
import {initializePayments, getAllPayments} from '../controllers/paymentController';

const router = Router();

router.post('/initialize', initializePayments);
router.get('/', getAllPayments);

export default router;