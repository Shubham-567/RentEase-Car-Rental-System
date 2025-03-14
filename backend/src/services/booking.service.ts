import { Pool } from "../config/db.js";
import { Booking } from "../models/booking.model.js";

// fetch all bookings
export const getAllBookings = async (): Promise<Booking[]> => {
  const [bookings]: any = await Pool.query(`SELECT 
    bookings.id,
    users.name AS user_name,
    cars.name AS car_name,
    bookings.start_date,
    bookings.end_date,
    bookings.total_price,
    bookings.status
    FROM bookings
    JOIN users ON bookings.user_id = users.id
    JOIN cars ON bookings.car_id = cars.id
    ORDER BY bookings.created_at DESC;
  `);

  if (!bookings.length) {
    throw new Error("No bookings found");
  }
  return bookings;
};

// fetch single booking with id
export const getBookingById = async (id: number): Promise<Booking> => {
  const [bookings]: any = await Pool.query(
    "SELECT * FROM bookings WHERE id = ?",
    [id]
  );

  if (!bookings.length) {
    throw new Error("Booking not found");
  }

  return bookings[0];
};

// create new booking
export const createBooking = async (booking: Booking): Promise<number> => {
  const { user_id, car_id, start_date, end_date, total_price, status } =
    booking;

  const [result]: any = await Pool.query(
    "INSERT INTO bookings (user_id, car_id, start_date, end_date, total_price, status)VALUES (?, ?, ?, ?, ?, ?)",
    [user_id, car_id, start_date, end_date, total_price, status ?? "Pending"]
  );

  return result.insertId; // booking id
};

// update booking status
export const updateBookingStatus = async (
  id: number,
  status: string
): Promise<void> => {
  const validStatuses = ["Pending", "Confirmed", "Cancelled", "Completed"];

  if (!validStatuses.includes(status)) {
    throw new Error("Invalid booking status");
  }

  const [result]: any = await Pool.query(
    "UPDATE bookings SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?",
    [status, id]
  );

  if (result.affectedRows === 0) {
    throw new Error(`Booking with ID ${id} not found`);
  }
};

// delete booking
export const deleteBooking = async (id: number): Promise<void> => {
  const [result]: any = await Pool.query("DELETE FROM bookings WHERE id = ?", [
    id,
  ]);

  if (result.affectedRows === 0) {
    throw new Error(`Booking with ID ${id} not found`);
  }
};
