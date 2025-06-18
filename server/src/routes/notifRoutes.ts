import express from 'express';
import { bookAppointment, getMyAppointments } from '../controllers/notifications';

const router = express.Router();

router.post('/book-appointment', bookAppointment);
router.get('/get-my-appointments/:adminId', getMyAppointments);

export default router;