import express from "express";
import authRoutes from "./auth.routes.js";
import carRoutes from "./car.routes.js";

const router = express.Router();

router.use("/auth", authRoutes); // authentication routes
router.use("/cars", carRoutes);

export default router;
