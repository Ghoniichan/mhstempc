import { Router } from 'express';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

const router = Router();

const transporter = nodemailer.createTransport({
    service: 'gmail', // or any other email service
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

export const buildPasswordEmail = (username: string, password: string): string => `
  <div style="
    max-width: 480px;
    margin: auto;
    font-family: Arial, sans-serif;
    color: #333;
  ">
    <!-- Header -->
    <div style="
      background: #007bff;
      color: #fff;
      padding: 16px;
      text-align: center;
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;
    ">
      <h1 style="margin: 0; font-size: 20px;">Welcome, ${username}!</h1>
    </div>

    <!-- White content box with its own drop‐shadow -->
    <div style="
      background: #ffffff;
      padding: 20px;
      box-shadow: 0 4px 16px rgba(0,0,0,0.1);
      border-bottom-left-radius: 8px;
      border-bottom-right-radius: 8px;
    ">
      <p>We've created your account and generated a secure password for you:</p>
      <div style="  
        background: #f7f7f7;
        padding: 12px 16px;
        border-radius: 4px;
        font-family: 'Courier New', monospace;
        font-size: 16px;
        text-align: center;
        margin: 16px 0;
      ">
        <strong>${password}</strong>
      </div>
      <p>You can log in using this password. For your security, please change it as soon as you log in.</p>
      <p style="font-size: 12px; color: #777;">
        If you did not request this, please contact our support team immediately.
      </p>
    </div>
  </div>
`;

export const buildPasswordOTP = (otp: string): string => `
  <div style="
    max-width: 480px;
    margin: auto;
    font-family: Arial, sans-serif;
    color: #333;
  ">
    <!-- Header -->
    <div style="
      background: #28a745;
      color: #fff;
      padding: 16px;
      text-align: center;
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;
    ">
      <h1 style="margin: 0; font-size: 20px;">Hello, this is your OTP.</h1>
    </div>

    <!-- Content -->
    <div style="
      background: #ffffff;
      padding: 20px;
      box-shadow: 0 4px 16px rgba(0,0,0,0.1);
      border-bottom-left-radius: 8px;
      border-bottom-right-radius: 8px;
    ">
      <p>We have received a request to reset your password. Please use the one-time code below to proceed:</p>
      <div style="  
        background: #f7f7f7;
        padding: 16px;
        border-radius: 4px;
        font-family: 'Courier New', monospace;
        font-size: 24px;
        text-align: center;
        margin: 20px 0;
        letter-spacing: 2px;
      ">
        <strong>${otp}</strong>
      </div>
      <p>This code will expire in <strong>15 minutes</strong>.</p>
      <p>If you did not request a password reset, please ignore this email or contact support.</p>
      <p style="font-size: 12px; color: #777;">Thank you,<br/>The Support Team</p>
    </div>
  </div>
`;



router.post('/send-email', async (req, res) => {
  const { to, subject, text } = req.body;

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
    });
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
});

router.post('/send-email', async (req, res) => {
  const { to, subject, text } = req.body;

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
    });
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
});

export const sendEmail = async (to: string, subject: string, html: string) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      html,
    });
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
}

export default router;
