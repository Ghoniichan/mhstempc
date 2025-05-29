// controllers/authController.ts
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import pool from '../config/db.config'; // Adjust path to your database connection
import jwtGenerator from '../utils/jwtGenerator'; // Adjust path to your JWT utility

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
    const validPassword = (password == user.rows[0].password_hash)//await bcrypt.compare(password, user.rows[0].user_password);
  
    if (!validPassword) {
      res.status(401).json("Invalid wrong pass");
      return;
    }
    
    // Generate JWT token
    const jwtToken = jwtGenerator(user.rows[0].user_id);
    res.json({ jwtToken });
    
  } catch (err: any) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};