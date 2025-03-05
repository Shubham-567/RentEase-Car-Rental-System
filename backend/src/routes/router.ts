import express from "express";
import authRoutes from "./auth.routes.js";
import carRoutes from "./car.routes.js";
import bookingRoutes from "./booking.routes.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/cars", carRoutes);
router.use("/bookings", bookingRoutes);

export default router;
