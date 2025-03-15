import { Request, Response } from "express";
import {
  changeUserPassword,
  getUserProfile,
  updateUserProfile,
  getUserBookings,
  getAllUsers,
} from "../services/user.service.js";

// fetch all users (admin only)
export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await getAllUsers();

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error as Error,
    });
  }
};

// get user profile
export const getProfile = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = (req as any).user?.userId; // jwt

    if (!userId) {
      res.status(400).json({ message: "Invalid user ID" });
      return;
    }

    // console.log("fetching user with id of: " + userId);

    const user = await getUserProfile(userId);

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: (error as Error).message,
    });
  }
};

// update user profile
export const updateProfile = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = (req as any).user.userId;
    const { name, phone } = req.body;

    if (!name || !phone) {
      res.status(400).json({ message: "Name and phone are required" });
      return;
    }

    await updateUserProfile(userId, name, phone);

    res.status(200).json({ message: "Profile updated successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: (error as Error).message,
    });
  }
};

// change password
export const changePassword = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = (req as any).user.userId;
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      res.status(400).json({ message: "Old and new passwords are required" });
      return;
    }

    await changeUserPassword(userId, oldPassword, newPassword);
    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: (error as Error).message,
    });
  }
};

// get user booking history
export const getUserBookingHistory = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = (req as any).user.userId;
    const bookings = await getUserBookings(userId);
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: (error as Error).message,
    });
  }
};
