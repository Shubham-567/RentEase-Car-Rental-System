import bcrypt from "bcryptjs";
import { Pool } from "../config/db.js";
import { generateToken } from "../utils/jwt.utils.js";
import { User } from "../models/user.model.js";

// user registration
export const registerUser = async (user: User) => {
  //check if user exists
  const [existingUsers]: any = await Pool.query(
    "SELECT id FROM users WHERE email = ?",
    [user.email]
  );

  if (existingUsers.length > 0) {
    throw new Error("Email is already in use. Please try logging in.");
  }

  // hash the password
  const hashedPassword = await bcrypt.hash(user.password, 10);

  // insert new user in database
  await Pool.query(
    "INSERT INTO users (name, email, password, phone, role) VALUES (?, ?, ?, ?, ?)",
    [user.name, user.email, hashedPassword, user.phone, user.role || "customer"]
  );
};

// user login
export const loginUser = async (email: string, password: string) => {
  const [rows]: any = await Pool.query("SELECT * FROM users WHERE email = ?", [
    email,
  ]);

  if (!rows || rows.length === 0) {
    throw new Error("Invalid email or password");
  }

  // check if password is valid or not
  const user = rows[0];
  const isValidPassword = await bcrypt.compare(password, user.password);

  if (!isValidPassword) {
    throw new Error("Invalid email or password");
  }

  // Return JWT token
  return generateToken(user.id, user.role);
};
