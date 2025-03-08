import { useState } from "react";
import CarImageCarousel from "./CarImageCarousel";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Fuel, Settings, Users, CalendarDays } from "lucide-react";

// Import the Car type
import { Car } from "../../store/carsStore";

// Define props with the correct Car type
interface CarDetailsCardProps {
  car: Car;
}

const CarDetailsCard: React.FC<CarDetailsCardProps> = ({ car }) => {
  // Fix TypeScript state issue by explicitly defining type
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  return (
    <div className='p-8 bg-background-50 rounded-2xl relative overflow-hidden'>
      <div className='absolute inset-0 bg-gradient-to-r from-primary-500/10 to-secondary-600/10 rounded-3xl blur-2xl opacity-50'></div>

      <div className='relative z-10 grid md:grid-cols-2 gap-12'>
        {/* Left */}
        <CarImageCarousel images={car.images} />

        {/* Right */}
        <div className='flex flex-col gap-8 text-text-900'>
          {/* Car Title & Info */}
          <div>
            <h1 className='text-4xl font-extrabold flex items-center gap-2'>
              {car.brand} {car.model}
              <span className='text-accent-500 text-2xl'>({car.year})</span>
            </h1>

            {/* Feature Chips */}
            <div className='flex gap-3 text-text-700 mt-4'>
              {[
                { icon: <Fuel size={18} />, text: car.fuel_type },
                { icon: <Settings size={18} />, text: car.transmission },
                { icon: <Users size={18} />, text: `${car.seats} Seats` },
              ].map((item, index) => (
                <span
                  key={index}
                  className='flex items-center gap-2 px-4 py-2 bg-accent-500 rounded-full text-white text-sm font-medium shadow-md transition-all hover:scale-105'>
                  {item.icon} {item.text}
                </span>
              ))}
            </div>

            <p className='text-text-600 mt-4 leading-relaxed'>
              Experience the thrill of driving the {car.brand} {car.model}. A
              perfect blend of luxury and performance, now available for rent.
            </p>
          </div>

          {/* Rental Date Selection */}
          <div className='flex flex-col gap-4 p-4 bg-secondary-50 rounded-xl shadow-md'>
            <label className='text-xl font-semibold text-text-800 flex items-center gap-2'>
              <CalendarDays size={20} /> Pick Rental Dates
            </label>

            <div className='flex gap-6'>
              {/* Start Date */}
              <div className='flex flex-col w-1/2'>
                <label className='text-sm text-text-600 mb-1'>Start Date</label>
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  selectsStart
                  startDate={startDate}
                  endDate={endDate}
                  placeholderText='Select Start Date'
                  className='w-full px-4 py-3 border border-gray-300 rounded-lg bg-background-50 focus:ring-2 focus:ring-primary-500 transition-all hover:scale-105 focus:outline-none shadow-sm'
                />
              </div>

              {/* End Date */}
              <div className='flex flex-col w-1/2'>
                <label className='text-sm text-text-600 mb-1'>End Date</label>
                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  selectsEnd
                  startDate={startDate}
                  endDate={endDate}
                  placeholderText='Select End Date'
                  className='w-full px-4 py-3 border border-gray-300 rounded-lg bg-background-50 focus:ring-2 focus:ring-primary-500 transition-all hover:scale-105 focus:outline-none shadow-sm'
                />
              </div>
            </div>
          </div>

          {/* Price and Availability */}
          <div className='flex items-center justify-between'>
            <p className='text-3xl font-extrabold text-text-900'>
              ₹{car.price_per_day.toLocaleString()}/day
            </p>
            <span
              className={`px-5 py-2 text-sm font-semibold rounded-full shadow-lg transition-all ${
                car.availability > 0
                  ? "bg-accent-500 text-white hover:scale-105"
                  : "bg-red-500 text-white"
              }`}>
              {car.availability > 0 ? "Available" : "Not Available"}
            </span>
          </div>

          {/* Rent Now Button */}
          <button
            className={`w-full py-3 text-xl font-semibold rounded-xl shadow-lg transform transition-all ${
              car.availability > 0
                ? "bg-primary-500 text-white hover:bg-primary-600 hover:scale-102 active:scale-99"
                : "bg-gray-400 text-gray-200 cursor-not-allowed"
            }`}
            disabled={car.availability === 0}>
            {car.availability > 0 ? "Rent Now" : "Out of Stock"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarDetailsCard;
