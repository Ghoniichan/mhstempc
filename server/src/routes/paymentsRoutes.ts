import { Router } from 'express';
import {initializePayments, getAllPayments, updatePayment, getPaymentTerms} from '../controllers/paymentController';

const router = Router();

router.post('/initialize', initializePayments);
router.get('/', getAllPayments);
router.patch('/:id', updatePayment);
router.get('/terms/:loan_id', getPaymentTerms);

export default router;