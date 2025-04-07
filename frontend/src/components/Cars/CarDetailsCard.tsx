import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CarImageCarousel from "./CarImageCarousel";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Fuel, Settings, Users, CalendarDays } from "lucide-react";
import BookingModal from "../Bookings/BookingModal";
import { Car } from "../../store/carsStore";
import { useUserStore } from "../../store/userStore";
import BookingForm from "../Bookings/BookingForm";
import Toast from "../Toast";

interface CarDetailsCardProps {
  car: Car;
}

const CarDetailsCard: React.FC<CarDetailsCardProps> = ({ car }) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();
  const user = useUserStore((state) => state.user);
  const userId = user?.id ?? 0;
  const userName = user?.name ?? "Guest";
  const userEmail = user?.email ?? "guest@test.in";
  const userPhone = user?.phone ?? "1234567890";

  const [showBookingForm, setShowBookingForm] = useState(false);
  const [bookingDetails, setBookingDetails] = useState<{
    name: string;
    email: string;
    phone: string;
    pickupLocation?: string;
    dropoffLocation?: string;
    alternatePhone?: string;
    note?: string;
  }>({
    name: userName,
    email: userEmail,
    phone: userPhone,
  });

  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error" | "warning";
    id: number;
  } | null>(null);

  const showToast = (
    message: string,
    type: "success" | "error" | "warning"
  ) => {
    setToast({ message, type, id: Date.now() });
  };

  const handleRentNowClick = () => {
    if (!user) {
      showToast("Please login to book a car. ", "error");
      setTimeout(() => {
        navigate("/login");
      }, 4000);
    } else if (!startDate || !endDate) {
      showToast("Please select both start and end dates. ", "error");
    } else if (startDate > endDate) {
      showToast("End date should be after the start date. ", "error");
    } else {
      setShowBookingForm(true);
    }
  };

  const closeToast = () => setToast(null);

  return (
    <div className='p-6 sm:p-8 bg-background-50 rounded-2xl relative overflow-hidden'>
      <div className='absolute inset-0 bg-gradient-to-r from-primary-500/10 to-secondary-600/10 rounded-3xl blur-2xl opacity-50'></div>

      <div className='relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-12'>
        {/* Left Section: Car Images */}
        <CarImageCarousel images={car.images} />

        {/* Right Section: Car Details */}
        <div className='flex flex-col gap-6 text-text-900 sm:text-left'>
          {/* Car Title & Info */}
          <div>
            <h1 className='text-3xl sm:text-4xl font-extrabold flex items-center gap-2'>
              {car.brand} {car.model}
              <span className='text-accent-500 text-2xl'>({car.year})</span>
            </h1>

            {/* Feature Chips */}
            <div className='flex flex-wrap gap-2 mt-4'>
              {[
                { icon: <Fuel size={18} />, text: car.fuel_type },
                { icon: <Settings size={18} />, text: car.transmission },
                { icon: <Users size={18} />, text: `${car.seats} Seats` },
              ].map((item, index) => (
                <span
                  key={index}
                  className='flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 bg-accent-500 rounded-full text-white text-xs sm:text-sm font-medium shadow-md transition-all hover:scale-105'>
                  {item.icon} {item.text}
                </span>
              ))}
            </div>

            <p className='text-text-600 mt-4 leading-relaxed px-2 sm:px-0'>
              Experience the thrill of driving the {car.brand} {car.model}. A
              perfect blend of luxury and performance, now available for rent.
            </p>
          </div>

          {/* Rental Date Selection */}
          <div className='flex flex-col gap-4 p-4 bg-secondary-50 rounded-xl shadow-md'>
            <label className='text-lg font-semibold text-text-800 flex items-center gap-2'>
              <CalendarDays size={20} /> Pick Rental Dates
            </label>

            <div className='flex flex-col sm:flex-row gap-4'>
              {/* Start Date */}
              <div className='flex flex-col w-full sm:w-1/2'>
                <label className='text-sm text-text-600 mb-1'>Start Date</label>
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  selectsStart
                  startDate={startDate}
                  endDate={endDate}
                  placeholderText='Select Start Date'
                  onKeyDown={(e) => e.preventDefault()}
                  minDate={new Date()}
                  dateFormat='dd/MM/yyyy'
                  className='w-full px-4 py-3 border border-gray-300 rounded-lg bg-background-50 focus:ring-2 focus:ring-primary-500 transition-all hover:scale-105 focus:outline-none shadow-sm'
                />
              </div>

              {/* End Date */}
              <div className='flex flex-col w-full sm:w-1/2'>
                <label className='text-sm text-text-600 mb-1'>End Date</label>
                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  selectsEnd
                  startDate={startDate}
                  endDate={endDate}
                  placeholderText='Select End Date'
                  onKeyDown={(e) => e.preventDefault()}
                  minDate={startDate || new Date()}
                  dateFormat='dd/MM/yyyy'
                  className='w-full px-4 py-3 border border-gray-300 rounded-lg bg-background-50 focus:ring-2 focus:ring-primary-500 transition-all hover:scale-105 focus:outline-none shadow-sm'
                />
              </div>
            </div>
          </div>

          {/* Price and Availability */}
          <div className='flex flex-row items-center justify-between gap-4'>
            <p className='text-2xl xs:text-3xl font-extrabold text-text-900'>
              ₹{car.price_per_day.toLocaleString()}/day
            </p>
            <span
              className={`px-5 py-2 text-xs sm:text-sm font-semibold rounded-full shadow-lg transition-all ${
                car.availability > 0
                  ? "bg-accent-500 text-white hover:scale-105"
                  : "bg-red-500 text-white"
              }`}>
              {car.availability > 0 ? "Available" : "Not Available"}
            </span>
          </div>

          {/* Rent Now Button */}
          <button
            className={`w-full py-3 text-lg sm:text-xl font-semibold rounded-xl shadow-lg transform transition-all ${
              car.availability > 0
                ? "bg-primary-500 text-white hover:bg-primary-600 hover:scale-102 active:scale-99"
                : "bg-gray-400 text-gray-200 cursor-not-allowed"
            }`}
            disabled={car.availability === 0}
            onClick={handleRentNowClick}>
            {car.availability > 0 ? "Rent Now" : "Out of Stock"}
          </button>
        </div>
      </div>

      {/* Booking Form Modal */}
      <BookingForm
        isOpen={showBookingForm}
        onClose={() => setShowBookingForm(false)}
        carName={`${car.brand} ${car.model}`}
        startDate={startDate}
        endDate={endDate}
        userName={bookingDetails.name}
        userEmail={bookingDetails.email}
        userPhone={bookingDetails.phone}
        onProceed={(details) => {
          setBookingDetails(details);
          setIsModalOpen(true);
        }}
        showToast={showToast}
      />

      {/* Booking Confirmation Modal */}
      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        carId={car.id}
        userId={userId}
        carName={`${car.brand} ${car.model}`}
        userName={bookingDetails.name}
        userEmail={bookingDetails.email}
        userPhone={bookingDetails.phone}
        startDate={startDate}
        endDate={endDate}
        pricePerDay={car.price_per_day}
        pickupLocation={bookingDetails.pickupLocation}
        dropoffLocation={bookingDetails.dropoffLocation}
        alternatePhone={bookingDetails.alternatePhone}
        note={bookingDetails.note}
        showToast={showToast}
      />

      {toast && (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={closeToast}
        />
      )}
    </div>
  );
};

export default CarDetailsCard;
