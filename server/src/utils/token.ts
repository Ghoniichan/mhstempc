import crypto from 'crypto';


export default function generateResetToken() {
  // 32 bytes → hex = 64 characters
  return crypto.randomBytes(32).toString('hex');
}
