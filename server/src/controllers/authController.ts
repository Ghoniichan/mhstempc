// controllers/authController.ts
import { Request, Response, RequestHandler } from 'express';
import bcrypt from 'bcrypt';
import pool from '../config/db.config'; // Adjust path to your database connection
import jwtGenerator from '../utils/jwtGenerator'; // Adjust path to your JWT utility
import {createNotificationDB} from '../controllers/notificationController'; // Adjust path to your notification controller
import { create } from 'domain';



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