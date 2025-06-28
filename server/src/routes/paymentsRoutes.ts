import { Router } from 'express';
import {initializePayments, getAllPayments, updatePayment} from '../controllers/paymentController';

const router = Router();

router.post('/initialize', initializePayments);
router.get('/', getAllPayments);
router.patch('/:id', updatePayment);

export default router;