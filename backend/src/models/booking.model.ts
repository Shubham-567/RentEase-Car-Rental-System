export interface Booking {
  id?: number;
  user_id: number;
  car_id: number;
  start_date: string;
  end_date: string;
  total_price: number;
  status?: "Pending" | "Confirmed" | "Cancelled" | "Completed";
  created_at?: Date;
  updated_at?: Date;
}
