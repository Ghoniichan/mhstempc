import { Request, Response, RequestHandler } from 'express';
import pool from '../config/db.config'; // Adjust path to your database connection
import {register} from './authController'; // Adjust path to your auth controller

export const getInfo: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await pool.query("SELECT * FROM info");
    res.status(200).json(result.rows);
  } catch (err: any) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

export const addMember: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  const { account, member, beneficiaries, employer } = req.body;
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // 1) Insert into accounts_credential
    const accountInsert = await client.query(
      `INSERT INTO account_credentials (email)
       VALUES ($1)
       RETURNING account_id`,
      [account.email]
    );
    const accountId = accountInsert.rows[0].account_id;

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
        member.membership_date,
        member.policy_number,
        member.first_name,
        member.middle_name,
        member.last_name,
        member.present_address,
        member.provincial_address,
        member.house_type,
        member.birth_date,
        member.tel_cel_no,
        member.civil_status,
        member.sex,
        member.citizenship,
        member.religion,
        member.tin_number,
        member.spouse_name,
        member.spouse_age,
        member.spouse_occupation,
        member.fb_acc_email_address,
        member.application_status,
        new Date(), // created_at
        new Date()  // updated_at
      ]
    );
    const applicationId = appInsert.rows[0].id;

    // 3) Create beneficiaries
    if (Array.isArray(beneficiaries)) {
      for (const b of beneficiaries) {
        await client.query(
          `INSERT INTO beneficiaries (
             membership_application_id, beneficiary_name, allowed_percentage, order_sequence
           ) VALUES ($1,$2,$3,$4)`,
          [
            applicationId,
            b.beneficiary_name,
            b.allowed_percentage,
            b.order_sequence
          ]
        );
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
          e.employer_name,
          e.employment_date,
          e.employer_tel_cel_no,
          e.order_sequence,
        );
      });
      await client.query(
        `INSERT INTO employment_history (membership_application_id, employer_name, employment_date, employer_tel_cel_no, order_sequence) VALUES ${empParams.join(',')}`,
        empValues
      );
    }

    await client.query('COMMIT');
    res.status(201).json({ member_id: member, account_id: accountId });
  } catch (err: any) {
    await client.query('ROLLBACK');
    console.error(err.message);
    res.status(500).send('Registration failed');
  } finally {
    client.release();
  }
};
