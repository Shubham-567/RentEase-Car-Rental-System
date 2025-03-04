import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const generateToken = (userId: number, role: string) => {
  return jwt.sign({ userId, role }, process.env.JWT_SECRET as string, {
    expiresIn: "7d",
  });
};
