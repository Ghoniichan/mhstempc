function generateRandomPassword(length: number = 5): string {
  const maxLen = 5;
  const actualLen = Math.min(Math.max(1, length), maxLen);  // Clamp to [1, 5]
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let password = '';
  for (let i = 0; i < actualLen; i++) {
    const idx = Math.floor(Math.random() * chars.length);
    password += chars[idx];
  }
  return password;
}

export default generateRandomPassword;