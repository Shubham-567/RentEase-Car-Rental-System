import bcrypt from "bcryptjs";
import { Pool } from "../config/db.js";
import { User } from "../models/user.model.js";

// fetch user profile by id
export const getUserProfile = async (userId: number): Promise<User | null> => {
  const [rows]: any = await Pool.query(
    "SELECT id, name, email, phone, role FROM users WHERE id = ?",
    [userId]
  );

  if (rows.length === 0) return null;

  return rows[0]; // user profile
};

// update user profile
export const updateUserProfile = async (
  userId: number,
  name: string,
  phone: string
): Promise<void> => {
  await Pool.query("UPDATE users SET name = ?, phone = ? WHERE id = ?", [
    name,
    phone,
    userId,
  ]);
};

// change password
export const changeUserPassword = async (
  userId: number,
  oldPassword: string,
  newPassword: string
) => {
  const [rows]: any = await Pool.query(
    "SELECT password FROM users WHERE id = ?",
    [userId]
  );

  if (rows.length === 0) throw new Error("User not found");

  const isMatch = await bcrypt.compare(oldPassword, rows[0].password);
  if (!isMatch) throw new Error("Incorrect old password");

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  await Pool.query("UPDATE users SET password = ? WHERE id = ?", [
    hashedPassword,
    userId,
  ]);
};

// get user booking history
export const getUserBookings = async (userId: number) => {
  const [rows]: any = await Pool.query(
    `SELECT 
      b.id, 
      c.name AS car_name, 
      c.brand, 
      b.start_date, 
      b.end_date, 
      b.total_price, 
      b.status, 
      (SELECT image_url FROM car_images WHERE car_id = c.id LIMIT 1) AS car_image
    FROM bookings b
    JOIN cars c ON b.car_id = c.id
    WHERE b.user_id = ? 
    ORDER BY b.start_date DESC`,
    [userId]
  );

  return rows;
};
