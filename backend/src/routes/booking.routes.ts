import express from "express";

import {
  getBookings,
  getBooking,
  createNewBooking,
  changeBookingStatus,
  removeBooking,
} from "../controllers/booking.controller.js";

import { authenticateUser } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", authenticateUser, getBookings);
router.get("/:id", authenticateUser, getBooking);
router.post("/", authenticateUser, createNewBooking);
router.put("/:id/status", authenticateUser, changeBookingStatus);
router.delete("/:id", authenticateUser, removeBooking);

export default router;
