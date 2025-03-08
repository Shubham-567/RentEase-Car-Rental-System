import { create } from "zustand";
import { fetchCars, fetchCarById } from "../api/cars";

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
}

export const useCarStore = create<CarState>((set) => ({
  cars: [],
  selectedCar: null,
  loading: false,
  error: null,

  loadCars: async () => {
    set({ loading: true, error: null });
    try {
      const cars = await fetchCars();
      set({ cars, loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  loadCarById: async (carId: number) => {
    set({ loading: true, error: null, selectedCar: null });

    try {
      const car = await fetchCarById(carId);
      set({ selectedCar: car, loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },
}));
