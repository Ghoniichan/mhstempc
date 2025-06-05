import express from 'express';
import sendEmail from '../utils/email'; // Adjust the path to your email utility
import { Request, Response } from 'express';

const router = express.Router();

// Route to send a notification email
router.post('/send-notification', async (req: Request, res: Response) => {
  const { to, subject, text } = req.body;

  try {
    // Call the sendEmail utility function
    await sendEmail(to, subject, text);
    res.status(200).json({ message: 'Notification sent successfully' });
  } catch (error) {
    console.error('Error sending notification:', error);
    res.status(500).json({ error: 'Failed to send notification' });
  }
});

export default router;