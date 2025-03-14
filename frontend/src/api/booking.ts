import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL + "/bookings";

// fetch all bookings
export const fetchAllBookings = async (token: string) => {
  try {
    const response = await axios.get(API_URL, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch all bookings");
  }
};

// fetch booking by id
export const fetchBookingById = async (token: string, bookingId: number) => {
  try {
    const response = await axios.get(`${API_URL}/${bookingId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch booking.");
  }
};

// create a new car booking
export const createBooking = async (
  token: string,
  bookingData: {
    user_id: number;
    car_id: number;
    start_date: string;
    end_date: string;
    total_price: number;
  }
) => {
  try {
    const response = await axios.post(`${API_URL}`, bookingData, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    throw new Error("Failed to create booking.");
  }
};

// update booking status (admin only)
export const updateBookingStatus = async (
  token: string,
  bookingId: number,
  status: string
) => {
  try {
    await axios.put(
      `${API_URL}/${bookingId}/status`,
      { status },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  } catch (error) {
    throw new Error("Failed to update booking status.");
  }
};

// delete booking (admin only)
export const deleteBooking = async (token: string, bookingId: number) => {
  try {
    await axios.delete(`${API_URL}/${bookingId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    throw new Error("Failed to delete booking.");
  }
};
