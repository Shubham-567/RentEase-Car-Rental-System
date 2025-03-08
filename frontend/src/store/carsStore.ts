import { create } from "zustand";
import { fetchCars } from "../api/cars";

interface Car {
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
  loading: boolean;
  error: string | null;
  loadCars: () => Promise<void>;
}

export const useCarStore = create<CarState>((set) => ({
  cars: [],
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
}));
