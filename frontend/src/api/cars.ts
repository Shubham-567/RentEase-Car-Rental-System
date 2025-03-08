import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL + "/cars";

export const fetchCars = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch cars.");
  }
};

export const fetchCarById = async (carId: number) => {
  try {
    const response = await axios.get(`${API_URL}/${carId}`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch car details.");
  }
};
