import express from "express";
import {
  getCars,
  getCar,
  createCar,
  updateCarDetails,
  removeCar,
} from "../controllers/car.controller.js";
import { authenticateUser } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", getCars);
router.get("/:id", getCar);
router.post("/", authenticateUser, createCar);
router.put("/:id", authenticateUser, updateCarDetails);
router.delete("/:id", authenticateUser, removeCar);

export default router;
