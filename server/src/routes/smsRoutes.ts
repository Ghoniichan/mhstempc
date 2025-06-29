import {Router} from 'express';
import {send_sms} from '../controllers/smsController';

const router = Router();

router.post('/send', send_sms);

export default router;