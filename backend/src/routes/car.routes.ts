import express from "express";
import {
  getCars,
  getCar,
  createCar,
  updateCarDetails,
  removeCar,
} from "../controllers/car.controller.js";
import {
  authenticateUser,
  authorizeAdmin,
} from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", getCars);
router.get("/:id", getCar);
router.post("/", authenticateUser, authorizeAdmin, createCar);
router.put("/:id", authenticateUser, authorizeAdmin, updateCarDetails);
router.delete("/:id", authenticateUser, authorizeAdmin, removeCar);

export default router;
