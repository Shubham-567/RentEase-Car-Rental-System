import { Request, Response } from "express";

import {
  getAllBookings,
  getBookingById,
  createBooking,
  updateBookingStatus,
  deleteBooking,
} from "../services/booking.service.js";

// get all bookings
export const getBookings = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const bookings = await getAllBookings();
    res.status(200).json(bookings);
  } catch (error) {
    res
      .status(404)
      .json({ message: "No bookings found", error: (error as Error).message });
  }
};

// get single booking with id
export const getBooking = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const booking = await getBookingById(Number(req.params.id));

    if (!booking) {
      res.status(404).json({ message: "Booking not found" });
      return;
    }

    res.status(200).json(booking);
  } catch (error) {
    res.status(404).json({
      message: "Error retrieving booking",
      error: (error as Error).message,
    });
  }
};

// create new booking
export const createNewBooking = async (
  req: Request,
  res: Response
): Promise<void> => {
  const {
    user_id,
    car_id,
    start_date,
    end_date,
    total_price,
    status,
    pickup_location,
    dropoff_location,
    alternate_phone,
    note,
  } = req.body;

  // validations
  if (
    !user_id ||
    !car_id ||
    !start_date ||
    !end_date ||
    !total_price ||
    !pickup_location ||
    !dropoff_location
  ) {
    res.status(400).json({
      message: "Validation error",
      errors: [
        !user_id ? { field: "user_id", message: "User ID is required" } : null,
        !car_id ? { field: "car_id", message: "Car ID is required" } : null,
        !start_date
          ? { field: "start_date", message: "Start date is required" }
          : null,
        !end_date
          ? { field: "end_date", message: "End date is required" }
          : null,
        !total_price
          ? { field: "total_price", message: "Total price is required" }
          : null,
        !pickup_location
          ? { field: "pickup_location", message: "Pickup location is required" }
          : null,
        !dropoff_location
          ? {
              field: "dropoff_location",
              message: "Dropoff location is required",
            }
          : null,
      ].filter(Boolean),
    });

    return;
  }

  try {
    const bookingId = await createBooking({
      user_id,
      car_id,
      start_date,
      end_date,
      total_price,
      status,
      pickup_location,
      dropoff_location,
      alternate_phone,
      note,
    });

    res
      .status(201)
      .json({ message: "Booking created successfully", bookingId });
  } catch (error) {
    res.status(500).json({
      message: "Error creating booking",
      error: (error as Error).message,
    });
  }
};

// update booking status
export const changeBookingStatus = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { status } = req.body;
  const bookingId = Number(req.params.id);

  try {
    await updateBookingStatus(bookingId, status);
    res.status(200).json({ message: "Booking status updated successfully" });
  } catch (error) {
    res.status(404).json({
      message: "Error updating booking",
      error: (error as Error).message,
    });
  }
};

// delete booking
export const removeBooking = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    await deleteBooking(Number(req.params.id));

    res.status(200).json({ message: "Booking deleted successfully" });
  } catch (error) {
    res.status(404).json({
      message: "Error deleting booking",
      error: (error as Error).message,
    });
  }
};
