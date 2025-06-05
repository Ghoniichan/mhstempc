// utils/email.ts
import nodemailer from 'nodemailer';

// Make sure your .env contains:
// SMTP_HOST=smtp.mailtrap.io
// SMTP_PORT=2525
// SMTP_USER=1234567890abcdef
// SMTP_PASS=fedcba0987654321
// EMAIL_FROM="My App" <no-reply@myapp.com>

const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  secure: false, // false for 2525/587, true for 465
  auth: {
    user: "2c54a530f458f9",
    pass: "a0a895b456c47c",
  },
});

export default async function sendEmail(
  toEmail: string,
  subject: string,
  html: string
) {
  const info = await transporter.sendMail({
    from: "hello@demomailtrap.co", // e.g. "My App" <no-reply@myapp.com>
    to: toEmail,
    subject,
    html,
  });
  console.log('Message sent: %s', info.messageId);
}
