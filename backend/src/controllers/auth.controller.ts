import { Request, Response } from "express";
import { registerUser, loginUser } from "../services/auth.service.js";

export const register = async (req: Request, res: Response) => {
  const { name, email, password, phone, role } = req.body;

  // validations
  if (!name || !email || !password || !phone) {
    return res.status(400).json({
      message: "Validation error",
      errors: [
        !name ? { field: "name", message: "Name is required" } : null,
        !email ? { field: "email", message: "Email is required" } : null,
        !password
          ? { field: "password", message: "Password is required" }
          : null,
        !phone ? { field: "phone", message: "Phone number is required" } : null,
      ].filter(Boolean), // Removes null values
    });
  }

  try {
    await registerUser(req.body);
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const token = await loginUser(email, password);

    res.json({ token });
  } catch (error) {
    res.status(401).json({ message: (error as Error).message });
  }
};
