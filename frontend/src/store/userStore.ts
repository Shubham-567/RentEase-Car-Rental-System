import { create } from "zustand";

import {
  fetchUserProfile,
  updateUserProfile,
  changeUserPassword,
  fetchUserBookings,
} from "../api/users";

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: string;
}

interface Bookings {
  id: number;
  car_name: string;
  start_date: string;
  end_date: string;
}

interface UserState {
  user: User | null;
  bookings: Bookings[];
  loading: boolean;
  error: string | null;
  loadUserProfile: (token: string) => Promise<void>;
  updateUser: (
    token: string,
    userData: { name: string; phone: string }
  ) => Promise<void>;
  changePassword: (
    token: string,
    passwords: { oldPassword: string; newPassword: string }
  ) => Promise<void>;
  loadBookings: (token: string) => Promise<void>;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  bookings: [],
  loading: false,
  error: null,

  loadUserProfile: async (token) => {
    set({ loading: true, error: null });

    try {
      const userData = await fetchUserProfile(token);
      set({ user: userData, loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  updateUser: async (token, userData) => {
    set({ loading: true, error: null });

    try {
      await updateUserProfile(token, userData);
      set((state) => ({
        user: state.user ? { ...state.user, ...userData } : null,
        loading: false,
      }));
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  changePassword: async (token, passwords) => {
    set({ loading: true, error: null });

    try {
      await changeUserPassword(token, passwords);
      set({ loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  loadBookings: async (token) => {
    set({ loading: true, error: null });

    try {
      const bookingData = await fetchUserBookings(token);
      set({ bookings: bookingData, loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },
}));
