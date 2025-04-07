export interface Booking {
  id?: number;
  user_id: number;
  car_id: number;
  start_date: string;
  end_date: string;
  total_price: number;
  status?: "Pending" | "Confirmed" | "Cancelled" | "Completed";
  pickup_location?: string;
  dropoff_location?: string;
  alternate_phone?: string;
  note?: string;
  created_at?: string;
}
