import express from "express";
import authRoutes from "./auth.routes.js";
import carRoutes from "./car.routes.js";
import bookingRoutes from "./booking.routes.js";
import userRoutes from "./user.routes.js";
import paymentRoutes from "./payment.routes.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/cars", carRoutes);
router.use("/bookings", bookingRoutes);
router.use("/users", userRoutes);
router.use("/payment", paymentRoutes);

export default router;
