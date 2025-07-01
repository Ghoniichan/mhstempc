// controllers/authController.ts
import { Request, Response, RequestHandler } from 'express';
import bcrypt from 'bcrypt';
import pool from '../config/db.config'; // Adjust path to your database connection
import jwtGenerator from '../utils/jwtGenerator'; // Adjust path to your JWT utility
import {createNotificationDB} from '../controllers/notificationController'; // Adjust path to your notification controller
import { sendEmail, buildPasswordOTP } from '../routes/emailerRoutes'; // Adjust path to your emailer routes


export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  
  try {
    // Check if user exists
    const user = await pool.query("SELECT * FROM account_credentials WHERE email = $1", [email]);
    
    if (user.rows.length === 0) {
      res.status(401).json("Invalid Credentials");
      return;
    }
    
    // Validate password
    const validPassword = await bcrypt.compare(password, user.rows[0].password_hash);
  
    if (!validPassword) {
      // bump the counter, get new count back
      const { rows } = await pool.query<{ attempt_count: number }>(`
        INSERT INTO attempt (account_id, attempt_count)
        VALUES ($1, 1)
        ON CONFLICT (account_id)
        DO UPDATE SET attempt_count = attempt.attempt_count + 1
        RETURNING attempt_count;
      `, [user.rows[0].account_id]);
      const count = rows[0].attempt_count;

      // optional lockout after 3 failures
      if (count >= 3) {
        const notification = await createNotificationDB(
          '9ea7cd3d-56a1-4c8a-990e-7244525b7cb3',
          user.rows[0].account_id,
          'Too many login attempts',
          'Account Locked'
        );

        console.log(notification);

         res
          .status(429)
          .set('Retry-After', String(5 * 60))
          .json('Too many attempts. Try again later.');
         return;
      }

       res.status(401).json("Invalid Credentials");
       return;
    }     

    await pool.query(`DELETE FROM attempt WHERE account_id = $1`, [user.rows[0].account_id]);
    
    // Generate JWT token
    const jwtToken = jwtGenerator(user.rows[0].account_id, user.rows[0].is_admin);
    res.json({ jwtToken });
    
  } catch (err: any) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

export const register: RequestHandler = async(req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await pool.query("SELECT * FROM account_credentials WHERE email = $1", [
      email
    ]);

    if (user.rows.length > 0) {
      res.status(401).json("User already exist!");
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const bcryptPassword = await bcrypt.hash(password, salt);

    let newUser = await pool.query(
      "INSERT INTO account_credentials (email, password_hash) VALUES ($1, $2) RETURNING *",
      [email, bcryptPassword]
    );

    const jwtToken = jwtGenerator(newUser.rows[0].account_id, newUser.rows[0].is_admin);

    res.json({ jwtToken });
  } catch (err: any) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
}

export const verify = async (req: Request, res: Response): Promise<void> => {
  try {
    res.json(true);
  } catch (err: any) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
}

export const genPass = async (req: Request, res: Response): Promise<void> => {
  const { pass } = req.params; 
  try {
    const salt = await bcrypt.genSalt(10);
    const bcryptPassword = await bcrypt.hash(pass, salt);
    res.json({ password: pass, hash: bcryptPassword });
  } catch (err: any) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
}

export const forgotPassword = async (req: Request, res: Response): Promise<void> => {
  const { email } = req.body;
  if (!email) {
    res.status(400).json({ error: 'Email is required' });
    return;
  }

  try {
    // 1) Find the user
    const userRes = await pool.query(
      `SELECT account_id FROM account_credentials WHERE email = $1 LIMIT 1`,
      [email]
    );
    if (userRes.rowCount === 0) {
      res.status(404).json({ error: 'No account found with that email' });
      return;
    }
    const accountID: string = userRes.rows[0].account_id;

    // 2) Generate a 4‑digit code
    const code = Math.floor(1000 + Math.random() * 9000).toString();

    // 3) Compute expiry (15 minutes from now)
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000); 

    // 4) Store in password_resets (you’ll need to create this table)
    await pool.query(
      `INSERT INTO password_resets (account_id, code, expires_at)
       VALUES ($1, $2, $3)
       ON CONFLICT (account_id) 
         DO UPDATE SET code = EXCLUDED.code, expires_at = EXCLUDED.expires_at;`,
      [accountID, code, expiresAt]
    );

    // 5) TODO: send `code` via email here
    const otp = buildPasswordOTP(code);
    await sendEmail(email, 'Password Reset Code', otp);

    res.status(200).json({
      message: 'Reset code generated and sent if email exists',
      // for development only—remove in production:
      resetCode: code
    });
  } catch (err) {
    console.error('forgotPassword error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const checkOTP = async (req: Request, res: Response): Promise<void> => {
  const { email, otp } = req.body;
  if (!email || !otp) {
    res.status(400).json({ error: 'Email and OTP code are required' });
    return;
  }

  try {
    // 1) Find user ID by email
    const userRes = await pool.query(
      `SELECT account_id FROM account_credentials WHERE email = $1 LIMIT 1;`,
      [email]
    );
    if (userRes.rowCount === 0) {
      res.status(404).json({ error: 'No account found with that email' });
      return;
    }
    const userId: string = userRes.rows[0].account_id;

    // 2) Look up the OTP record
    const otpRes = await pool.query(
      `SELECT code, expires_at
         FROM password_resets
        WHERE account_id = $1
          AND code = $2
        LIMIT 1;`,
      [userId, otp]
    );
    if (otpRes.rowCount === 0) {
      res.status(400).json({ error: 'Invalid code' });
      return;
    }

    const { expires_at } = otpRes.rows[0];
    const now = new Date();

    // 3) Check expiration
    if (now > expires_at) {
      // Optionally clean up expired code
      await pool.query(
        `DELETE FROM password_resets WHERE account_id = $1;`,
        [userId]
      );
      res.status(410).json({ error: 'Code has expired. Please request a new one.' });
      return;
    }

    // 4) (Optional) Invalidate this code so it can’t be reused
    await pool.query(
      `DELETE FROM password_resets WHERE account_id = $1;`,
      [userId]
    );

    // 5) Success
    res.status(200).json({ message: 'Code verified. You may now reset your password.' });
  } catch (err) {
    console.error('checkOTP error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const changePassword = async (req: Request, res: Response): Promise<void> => {
  const { email, newPassword } = req.body;
  if (!email || !newPassword) {
    res.status(400).json({ error: 'Email and new password are required' });
    return;
  }

  try {
    // 1) Find the user
    const userRes = await pool.query(
      `SELECT account_id FROM account_credentials WHERE email = $1 LIMIT 1;`,
      [email]
    );
    if (userRes.rowCount === 0) {
      res.status(404).json({ error: 'No account found with that email' });
      return;
    }
    const userId: string = userRes.rows[0].account_id;

    // 2) Hash the new password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

    // 3) Update the user's password
    await pool.query(
      `UPDATE account_credentials
          SET password_hash = $1
        WHERE account_id = $2;`,
      [hashedPassword, userId]
    );

    res.status(200).json({ message: 'Password changed successfully' });
  } catch (err) {
    console.error('changePassword error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
