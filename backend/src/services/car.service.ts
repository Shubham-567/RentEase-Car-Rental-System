import { Pool } from "../config/db.js";
import { Car } from "../models/car.model.js";

// fetch all available cars
export const getAllCars = async (): Promise<Car[]> => {
  const [rows]: any = await Pool.query(
    "SELECT * FROM cars WHERE availability = true"
  );

  if (!rows.length) {
    throw new Error("No available cars found");
  }

  return rows;
};

// fetch single car with id
export const getCarById = async (id: number): Promise<Car> => {
  const [rows]: any = await Pool.query("SELECT * FROM cars WHERE id = ?", [id]);

  if (!rows.length) {
    throw new Error("Car not found");
  }

  return rows[0];
};

// add new car
export const addCar = async (car: Car): Promise<number> => {
  try {
    const [result]: any = await Pool.query(
      "INSERT INTO cars (name, brand, model, year, type, price_per_day, fuel_type, transmission, seats, availability, image_url) VALUES (?,?,?,?,?,?,?,?,?,?,?)",
      [
        car.name,
        car.brand,
        car.model,
        car.year,
        car.type,
        car.price_per_day,
        car.fuel_type,
        car.transmission,
        car.seats,
        car.availability ?? true,
        car.image_url ?? null,
      ]
    );

    // console.log(result);
    return result.insertId; // id of newly inserted car
  } catch (error) {
    throw new Error("Failed to add car: " + (error as Error).message);
  }
};

// update an existing car
export const updateCar = async (
  id: number,
  car: Partial<Car>
): Promise<void> => {
  if (Object.keys(car).length === 0) {
    throw new Error("No fields provided for update");
  }

  // fields = "name, brand, model, etc..";
  const fields = Object.keys(car)
    .map((key) => `${key} = ?`)
    .join(", ");

  const values = Object.values(car); // array of values

  const [result]: any = await Pool.query(
    `UPDATE cars SET ${fields} WHERE id = ?`,
    [...values, id]
  );

  if (result.affectedRows === 0) {
    throw new Error(`Car with ID ${id} not found`);
  }
};

// delete car
export const deleteCar = async (id: number): Promise<void> => {
  const [result]: any = await Pool.query("DELETE FROM cars WHERE id = ?", [id]);

  if (result.affectedRows === 0) {
    throw new Error(`Car with ID ${id} not found`);
  }
};
