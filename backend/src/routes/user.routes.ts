import express from "express";
import {
  changePassword,
  getProfile,
  getUserBookingHistory,
  getUsers,
  updateProfile,
} from "../controllers/user.controller.js";
import {
  authenticateUser,
  authorizeAdmin,
} from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/all", authenticateUser, authorizeAdmin, getUsers); // get all user(admin only)

router.get("/profile", authenticateUser, getProfile); // get user profile
router.get("/bookings", authenticateUser, getUserBookingHistory); //get user bookings
router.put("/profile", authenticateUser, updateProfile); // update user profile
router.put("/change-password", authenticateUser, changePassword); // update user password

export default router;
