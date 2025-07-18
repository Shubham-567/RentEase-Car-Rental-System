import { create } from "zustand";

import {
  createBooking,
  fetchBookingById,
  updateBookingStatus,
  deleteBooking,
  fetchAllBookings,
} from "../api/booking";

export interface Booking {
  id: number;
  user_id: number;
  car_id: number;
  user_name?: string;
  car_name?: string;
  start_date: Date;
  end_date: Date;
  total_price: number;
  status: string;
  created_at: string;
  pickup_location: string;
  dropoff_location: string;
  alternate_phone?: string;
  note?: string;
}

interface BookingState {
  bookings: Booking[];
  selectedBooking: Booking | null;
  loading: boolean;
  error: string | null;
  createNewBooking: (
    token: string,
    bookingData: Omit<Booking, "id" | "created_at">
  ) => Promise<void>;
  loadBookings: (token: string) => Promise<void>;
  loadBookingById: (token: string, bookingId: number) => Promise<void>;
  changeBookingStatus: (
    token: string,
    bookingId: number,
    status: string
  ) => Promise<void>;
  removeBooking: (token: string, bookingId: number) => Promise<void>;
}

export const useBookingStore = create<BookingState>((set) => ({
  bookings: [],
  selectedBooking: null,
  loading: false,
  error: null,

  createNewBooking: async (token, bookingData) => {
    set({ loading: true, error: null });
    try {
      await createBooking(token, bookingData);
      set({ loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  loadBookings: async (token) => {
    set({ loading: true, error: null });
    try {
      const allBookings = await fetchAllBookings(token);
      set({ bookings: allBookings, loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  loadBookingById: async (token, bookingId) => {
    set({ loading: true, error: null });
    try {
      const booking = await fetchBookingById(token, bookingId);
      set({ selectedBooking: booking, loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  changeBookingStatus: async (token, bookingId, status) => {
    set({ loading: true, error: null });
    try {
      await updateBookingStatus(token, bookingId, status);
      set({ loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  removeBooking: async (token, bookingId) => {
    set({ loading: true, error: null });
    try {
      await deleteBooking(token, bookingId);
      set({ loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },
}));
