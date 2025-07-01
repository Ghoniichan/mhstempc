import { Request, Response, RequestHandler } from 'express';
import pool from '../config/db.config'; 
import bcrypt from 'bcrypt';
import getRandomPassword from '../utils/passwordGene'; // Adjust path to your utility
import { sendEmail, buildPasswordEmail } from '../routes/emailerRoutes'; // Adjust path to your emailer routes

export const clients: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await pool.query("SELECT CONCAT(last_name, ', ', first_name) AS name, policy_number, fb_acc_email_address, tel_cel_no FROM membership_applications");
    res.status(200).json(result.rows);
  } catch (err: any) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

export const user: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  const { policy_no } = req.params;
  try {
    const result = await pool.query("SELECT first_name, middle_name, last_name, present_address, tel_cel_no, membership_date, policy_number, get_latest_capital_share_by_policy($1) AS capital, get_latest_savings_balance($1) AS savings FROM membership_applications WHERE policy_number = $1;", [policy_no]);
    if (result.rows.length === 0) {
      res.status(404).json("User not found");
      return;
    }
    res.status(200).json(result.rows[0]);
  } catch (err: any) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
}

export const profile: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const result = await pool.query("SELECT first_name, middle_name, last_name, present_address, fb_acc_email_address, tel_cel_no, policy_number, membership_date FROM membership_applications WHERE account_id = $1;", [id]);
    if (result.rows.length === 0) {
      res.status(404).json("User not found");
      return;
    }
    res.status(200).json(result.rows[0]);
  } catch (err: any) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
}

export const addMember: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  const { userInfo, beneficiaries, employer } = req.body;
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const user = await pool.query("SELECT * FROM account_credentials WHERE email = $1", [
      userInfo.fbAccEmailAddress
    ]);

    if (user.rows.length > 0) {
      res.status(401).json("User already exist!");
      return;
    }
    
    const salt = await bcrypt.genSalt(10);
    const pass = getRandomPassword(5);
    const bcryptPassword = await bcrypt.hash(pass, salt);

    console.log(`Generated password for ${userInfo.fbAccEmailAddress}: ${pass}`);
    
    // 1) Insert into accounts_credential
    const accountInsert = await client.query(
      `INSERT INTO account_credentials (email, password_hash)
       VALUES ($1, $2)
       RETURNING account_id`,
      [userInfo.fbAccEmailAddress, bcryptPassword]
    );
    const accountId = accountInsert.rows[0].account_id;

    const safeSpouseAge = parseInt(userInfo.spouseAge) || 0;


    // 2) Insert into member_info
    const appInsert = await client.query(
      `INSERT INTO membership_applications(
       account_id, membership_date, policy_number, first_name, middle_name,
       last_name, present_address, provincial_address, house_type, birth_date,
       tel_cel_no, civil_status, sex, citizenship, religion,
       tin_number, spouse_name, spouse_age, spouse_occupation,
       fb_acc_email_address, application_status, created_at, updated_at
       ) VALUES (
       $1, $2, $3, $4, $5,
       $6, $7, $8, $9, $10,
       $11, $12, $13, $14, $15,
       $16, $17, $18, $19, $20,
       $21, $22, $23
       ) RETURNING id`,
      [
      accountId,
      userInfo.date,
      userInfo.policyNumber,
      userInfo.firstName,
      userInfo.middleName,
      userInfo.lastName,
      userInfo.presentAddress,
      userInfo.provincialAddress,
      userInfo.houseType,
      userInfo.birthDate,
      userInfo.telCelNo,
      userInfo.civilStatus,
      userInfo.sex,
      userInfo.citizenship,
      userInfo.religion,
      userInfo.tinNumber,
      userInfo.spouseName,
      safeSpouseAge,
      userInfo.spouseOccupation,
      userInfo.fbAccEmailAddress,
      userInfo.applicationStatus,
      new Date(), // createdAt
      new Date()  // updatedAt
      ]
    );
    const applicationId = appInsert.rows[0].id;

    // 3) Create beneficiaries
    if (beneficiaries && Array.isArray(beneficiaries)) {
      for (const b of beneficiaries) {
      if (b && b.name && b.percentage && b.order_sequence) {
        await client.query(
        `INSERT INTO beneficiaries (
           membership_application_id, beneficiary_name, allowed_percentage, order_sequence
         ) VALUES ($1,$2,$3,$4)`,
        [
          applicationId,
          b.name,
          b.percentage,
          b.order_sequence
        ]
        );
      }
      }
    }


    if (employer && Array.isArray(employer.history)) {
      const empParams: string[] = [];
      const empValues: any[] = [];
      employer.history.forEach((e: any, idx: number) => {
        const base = idx * 5;
        empParams.push(`($${base+1}, $${base+2}, $${base+3}, $${base+4}, $${base+5})`);
        empValues.push(
          applicationId,
          e.employerName,
          e.employmentDate,
          e.telCelNo,
          e.order_sequence,
        );
      });
      await client.query(
        `INSERT INTO employment_history (membership_application_id, employer_name, employment_date, employer_tel_cel_no, order_sequence) VALUES ${empParams.join(',')}`,
        empValues
      );
    }

    const emailContent = buildPasswordEmail(userInfo.firstName, pass);
    await sendEmail(userInfo.fbAccEmailAddress, "Your Account Password", emailContent);

    await client.query('COMMIT');
    res.status(201).json({ member_id: userInfo, account_id: accountId, password: pass });
  } catch (err: any) {
    await client.query('ROLLBACK');
    console.error(err.message);
    res.status(500).send('Registration failed');
  } finally {
    client.release();
  }
};


export const accountStatement: RequestHandler = async (req: Request, res: Response): Promise<void> => { 

  const client = await pool.connect();
  if (!client) {
    res.status(500).json({ error: "Failed to connect to database" });
    return;
  }
  try {
    await client.query('BEGIN');

    const userId = req.params.id;
    const user = await client.query(
      `select CONCAT(m.last_name, ', ', m.first_name) AS name, m.policy_number
      from account_credentials ac
      join membership_applications m on m.account_id = ac.account_id
      WHERE ac.account_id = $1`,
      [userId]
    );

    const totals = await client.query(`
      SELECT 
        total_loan, 
        remaining, 
        (total_loan - remaining) AS paid
      FROM (
        SELECT
          get_total_net_loan_fee_proceeds($1) AS total_loan,
          get_total_remaining($1) AS remaining
      ) AS data;  
    `, [userId]);

    const payments = await client.query(`
      select p.due_date, p.amount_due
      from payments p
      join loan_applications l on l.id = p.loan_application_id
      join membership_applications m on m.id = l.membership_application_id
      where m.account_id = $1
    `, [userId]);

    await client.query('COMMIT');
    res.status(200).json({ user: user.rows[0], totals: totals.rows[0], payments: payments.rows });
  } catch (error: any) {
    console.error("Error fetching account statement:", error);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    client.release();
  }
}