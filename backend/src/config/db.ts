import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

export const Pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export const connectDB = async () => {
  try {
    await Pool.getConnection();
    console.log("MySQL Database Connected");
  } catch (error) {
    console.error("Database Connection Failed", error);
    process.exit(1);
  }
};
