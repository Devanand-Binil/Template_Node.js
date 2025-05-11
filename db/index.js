// =======================================================
//                Database Configuration
// =======================================================
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema.js'; 
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

pool.connect()
  .then((client) => {
    console.log('✅ Database connected successfully');
    client.release(); 
  })
  .catch(err => {
    console.error('❌ Database connection error:', err.message);
    process.exit(1);
  });

const db = drizzle(pool, { schema });
export default db ;
