import { Pool } from "../config/db.js";
import { Car } from "../models/car.model.js";

// fetch all available cars
export const getAllCars = async (): Promise<Car[]> => {
  const [cars]: any = await Pool.query(
    "SELECT * FROM cars WHERE availability = true"
  );

  if (!cars.length) {
    throw new Error("No available cars found");
  }

  for (const car of cars) {
    const [images]: any = await Pool.query(
      "SELECT image_url FROM car_images WHERE car_id = ?",
      [car.id]
    );

    car.images = images.map((img: any) => img.image_url);
  }

  return cars;
};

// fetch single car with id
export const getCarById = async (id: number): Promise<Car> => {
  const [cars]: any = await Pool.query("SELECT * FROM cars WHERE id = ?", [id]);

  if (!cars.length) {
    throw new Error("Car not found");
  }

  const car = cars[0];
  const [images]: any = await Pool.query(
    "SELECT image_url FROM car_images WHERE car_id = ?",
    [id]
  );
  car.images = images.map((img: any) => img.image_url);

  return car;
};

// add new car
export const addCar = async (car: Car): Promise<void> => {
  try {
    const [result]: any = await Pool.query(
      "INSERT INTO cars (name, brand, model, year, type, price_per_day, fuel_type, transmission, seats, availability) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
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
      ]
    );

    // console.log(result);
    const carId = result.insertId; // id of newly inserted car

    // inserting multiple images
    if (car.images && car.images.length > 0) {
      for (const imageUrl of car.images) {
        await Pool.query(
          "INSERT INTO car_images (car_id, image_url) VALUES (?, ?)",
          [carId, imageUrl]
        );
      }
    }
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
