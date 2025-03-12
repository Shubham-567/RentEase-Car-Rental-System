import { create } from "zustand";
import {
  fetchCars,
  fetchCarById,
  addCar,
  updateCar,
  deleteCar,
} from "../api/cars";

export interface Car {
  id: number;
  name: string;
  brand: string;
  model: string;
  year: number;
  type: string;
  price_per_day: number;
  fuel_type: string;
  transmission: string;
  seats: number;
  availability: number;
  images: string[];
}

interface CarState {
  cars: Car[];
  selectedCar: Car | null;
  loading: boolean;
  error: string | null;
  loadCars: () => Promise<void>;
  loadCarById: (carId: number) => Promise<void>;
  addNewCar: (carData: Omit<Car, "id">, token: string) => Promise<void>;
  updateExistingCar: (
    carId: number,
    carData: Partial<Car>,
    token: string
  ) => Promise<void>;
  deleteCarById: (carId: number, token: string) => Promise<void>;
}

export const useCarStore = create<CarState>((set) => ({
  cars: [],
  selectedCar: null,
  loading: false,
  error: null,

  // load all cars
  loadCars: async () => {
    set({ loading: true, error: null });
    try {
      const cars = await fetchCars();
      set({ cars, loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  // load car by id
  loadCarById: async (carId: number) => {
    set({ loading: true, error: null, selectedCar: null });

    try {
      const car = await fetchCarById(carId);
      set({ selectedCar: car, loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  // add new car (admin only)
  addNewCar: async (carData: Omit<Car, "id">, token) => {
    set({ loading: true, error: null });

    try {
      await addCar(carData, token);
      set({ loading: false });
      await useCarStore.getState().loadCars(); // refresh car list
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  updateExistingCar: async (
    carId: number,
    carData: Partial<Car>,
    token: string
  ) => {
    set({ loading: true, error: null });

    try {
      await updateCar(carId, carData, token);
      set({ loading: false });
      await useCarStore.getState().loadCars(); // refresh car list
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  deleteCarById: async (carId: number, token: string) => {
    set({ loading: true, error: null });

    try {
      await deleteCar(carId, token);

      set({ loading: false });
      await useCarStore.getState().loadCars(); // refresh car list
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },
}));
