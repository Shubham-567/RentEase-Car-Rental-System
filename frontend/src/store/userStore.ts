import { create } from "zustand";

import {
  fetchUserProfile,
  updateUserProfile,
  changeUserPassword,
  fetchUserBookings,
  fetchAllUsers,
} from "../api/users";

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: string;
}

interface Booking {
  id: number;
  car_name: string;
  car_image: string;
  start_date: string;
  end_date: string;
  total_price: number;
  status: string;
}

interface UserState {
  users: User[];
  user: User | null;
  bookings: Booking[];
  loading: boolean;
  error: string | null;
  loadAllUsers: (token: string) => Promise<void>;
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
  users: [],
  bookings: [],
  loading: false,
  error: null,

  loadAllUsers: async (token) => {
    set({ loading: true, error: null });

    try {
      const allUsers = await fetchAllUsers(token);

      // console.log("all users: ", allUsers);
      set({ users: allUsers, loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

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
