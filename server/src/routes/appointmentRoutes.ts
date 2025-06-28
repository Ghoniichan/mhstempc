import express from 'express';
import { bookAppointment, getMyAppointments, updateAppointmentStatus } from '../controllers/appointmentController';

const router = express.Router();

router.post('/book-appointment', bookAppointment);
router.get('/get-my-appointments/:adminId', getMyAppointments);
router.patch('/update/status/:id', updateAppointmentStatus);

export default router;