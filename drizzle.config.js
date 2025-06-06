import dotenv from "dotenv";
dotenv.config();

export default {
  dialect: "postgresql",
  schema: "./db/schema.js", 
  out: "./db/migrations", 
  dbCredentials: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    ssl: true,
  },
};
