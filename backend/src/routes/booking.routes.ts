import express from "express";

import {
  getBookings,
  getBooking,
  createNewBooking,
  changeBookingStatus,
  removeBooking,
} from "../controllers/booking.controller.js";

import {
  authenticateUser,
  authorizeAdmin,
} from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", authenticateUser, authorizeAdmin, getBookings);
router.get("/:id", authenticateUser, authorizeAdmin, getBooking);
router.post("/", authenticateUser, createNewBooking);
router.put(
  "/:id/status",
  authenticateUser,
  authorizeAdmin,
  changeBookingStatus
);
router.delete("/:id", authenticateUser, removeBooking);

export default router;
