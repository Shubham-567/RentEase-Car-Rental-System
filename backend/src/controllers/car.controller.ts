import { Request, Response } from "express";
import {
  getAllCars,
  getCarById,
  addCar,
  updateCar,
  deleteCar,
} from "../services/car.service.js";

// fetch all available cars
export const getCars = async (_req: Request, res: Response): Promise<void> => {
  try {
    const cars = await getAllCars();

    if (cars.length === 0) {
      res.status(404).json({ message: "No cars available" });

      return;
    }

    res.status(200).json(cars);
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving cars",
      error: (error as Error).message,
    });
  }
};

// get single car
export const getCar = async (req: Request, res: Response): Promise<void> => {
  try {
    const car = await getCarById(Number(req.params.id));

    if (!car) {
      res.status(404).json({ message: "Car not found" });
      return;
    }

    res.status(200).json(car);
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving car",
      error: (error as Error).message,
    });
  }
};

// create car
export const createCar = async (req: Request, res: Response): Promise<void> => {
  const {
    name,
    brand,
    model,
    year,
    type,
    price_per_day,
    fuel_type,
    transmission,
    seats,
  } = req.body;

  // validation
  if (
    !name ||
    !brand ||
    !model ||
    !year ||
    !type ||
    !price_per_day ||
    !fuel_type ||
    !transmission ||
    !seats
  ) {
    res.status(400).json({
      message: "Validation error",
      errors: [
        !name ? { field: "name", message: "Name is required" } : null,
        !brand ? { field: "brand", message: "Brand is required" } : null,
        !model ? { field: "model", message: "Model is required" } : null,
        !year ? { field: "year", message: "Year is required" } : null,
        !type ? { field: "type", message: "Type is required" } : null,
        !price_per_day
          ? { field: "price_per_day", message: "Price per day is required" }
          : null,
        !fuel_type
          ? { field: "fuel_type", message: "Fuel type is required" }
          : null,
        !transmission
          ? { field: "transmission", message: "Transmission is required" }
          : null,
        !seats ? { field: "seats", message: "Seats count is required" } : null,
      ].filter(Boolean), // Remove null values
    });

    return;
  }

  try {
    await addCar(req.body);
    res.status(201).json({ message: "Car added successfully" });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error adding car", error: (error as Error).message });
  }
};

// update car details
export const updateCarDetails = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    await updateCar(Number(req.params.id), req.body);

    res.status(200).json({ message: "Car updated successfully" });
  } catch (error) {
    if ((error as Error).message.includes("not found")) {
      res.status(404).json({ message: (error as Error).message });
    } else {
      res.status(400).json({
        message: "Error updating car",
        error: (error as Error).message,
      });
    }
  }
};

// remove car
export const removeCar = async (req: Request, res: Response): Promise<void> => {
  try {
    await deleteCar(Number(req.params.id));
    res.json({ message: "Car deleted successfully" });
  } catch (error) {
    if ((error as Error).message.includes("not found")) {
      res.status(404).json({ message: (error as Error).message });
    } else {
      res
        .status(500)
        .json({
          message: "Error deleting car",
          error: (error as Error).message,
        });
    }
  }
};
