export interface Car {
  id?: number;
  name: string;
  brand: string;
  model: string;
  year: string;
  type: "Sedan" | "SUV" | "Hatchback" | "Luxury" | "Electric";
  price_per_day: number;
  fuel_type: "Petrol" | "Diesel" | "Electric" | "Hybrid";
  transmission: "Manual" | "Automatic";
  seats: number;
  availability?: boolean;
  image_url?: string;
  created_at?: Date;
}
