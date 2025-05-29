import dotenv from "dotenv";
import { Pool } from "pg";

dotenv.config();

const database = process.env.PGDATABASE;

const connectionString = `postgresql://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}:${process.env.PGPORT}/${database}`;

const pool = new Pool({
  connectionString,
});

export default pool;
