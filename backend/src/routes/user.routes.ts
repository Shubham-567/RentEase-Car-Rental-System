import express from "express";
import {
  changePassword,
  getProfile,
  getUserBookingHistory,
  updateProfile,
} from "../controllers/user.controller.js";
import { authenticateUser } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/profile", authenticateUser, getProfile);
router.get("/bookings", authenticateUser, getUserBookingHistory);
router.put("/profile", authenticateUser, updateProfile);
router.put("/change-password", authenticateUser, changePassword);

export default router;
