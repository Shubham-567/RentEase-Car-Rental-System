import axios from "axios";
import { Car } from "../store/carsStore";

const API_URL = import.meta.env.VITE_API_URL + "/cars";

// fetch all cars
export const fetchCars = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch cars.");
  }
};

// fetch a single car by id
export const fetchCarById = async (carId: number) => {
  try {
    const response = await axios.get(`${API_URL}/${carId}`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch car details.");
  }
};

// add a new car (admin only)
export const addCar = async (carData: Omit<Car, "id">, token: string) => {
  try {
    const response = await axios.post(API_URL, carData, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    throw new Error("Failed to add car.");
  }
};

// update an existing car (admin only)
export const updateCar = async (
  carId: number,
  carData: Partial<Car>,
  token: string
) => {
  try {
    console.log("Updating Car ID:", carId);
    console.log("Car Data:", carData);
    console.log("Token:", token);

    const response = await axios.put(`${API_URL}/${carId}`, carData, {
      headers: { Authorization: `Bearer ${token}` },
    });

    console.log("Update Response: ", response.data);
    return response.data;
  } catch (error) {
    throw new Error("Failed to update car.");
  }
};

// delete a car (admin only)
export const deleteCar = async (carId: number, token: string) => {
  try {
    await axios.delete(`${API_URL}/${carId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    throw new Error("Failed to delete car");
  }
};
