import { useBookingStore } from "../../store/bookingStore";
import { CalendarCheck, Car, User, Clock, CreditCard } from "lucide-react";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  carId: number;
  userId: number;
  carName: string;
  userName: string;
  startDate: Date | null;
  endDate: Date | null;
  pricePerDay: number;
}

const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  carId,
  userId,
  carName,
  userName,
  startDate,
  endDate,
  pricePerDay,
}) => {
  const { createNewBooking } = useBookingStore();
  const token = localStorage.getItem("token");

  if (!isOpen) return null;

  // total days
  const totalDays =
    startDate && endDate
      ? Math.max(
          1,
          Math.ceil(
            (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
          )
        )
      : 1;

  const totalPrice = totalDays * pricePerDay;

  const formatDate = (date: Date | null) => {
    return date ? date.toLocaleDateString("en-GB") : "N/A";
    // format: dd / mm / yyyy
  };

  const handleBooking = async () => {
    if (!token || !startDate || !endDate) {
      alert("Please select rental dates.");
      return;
    }

    try {
      await createNewBooking(token, {
        user_id: userId,
        car_id: carId,
        start_date: startDate.toISOString().split("T")[0],
        end_date: endDate.toISOString().split("T")[0],
        total_price: totalPrice,
      });

      alert("Booking confirmed!");
      onClose();
    } catch (error) {
      alert("Failed to create booking.");
    }
  };

  return (
    <div className='fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 animate-fadeIn'>
      <div className='bg-background-50 p-6 md:p-8 rounded-2xl shadow-2xl w-[90%] max-w-lg border border-gray-200'>
        {/* Modal Header */}
        <h2 className='text-2xl font-bold text-text-900 flex items-center gap-2'>
          <CalendarCheck size={24} className='text-primary-600' />
          Confirm Your Booking
        </h2>

        {/* Booking Details */}
        <div className='mt-4 space-y-3 text-text-800 text-lg'>
          <p className='flex items-center gap-2'>
            <Car size={20} className='text-accent-600' />
            <span>
              Car: <span className='font-medium'>{carName}</span>{" "}
            </span>
          </p>
          <p className='flex items-center gap-2'>
            <User size={20} className='text-accent-600' />
            <span>
              User Name: <span className='font-medium'>{userName}</span>
            </span>
          </p>
          <p className='flex items-center gap-2'>
            <Clock size={20} className='text-accent-600' />
            <span>Rental Period:</span>
            <span className='font-medium'>
              {formatDate(startDate)} - {formatDate(endDate)}
            </span>
          </p>
          <p className='text-xl font-semibold text-primary-900 flex items-center gap-2'>
            <CreditCard size={22} className='text-primary-600' />
            Total Price: ₹{totalPrice.toLocaleString()}
          </p>
        </div>

        {/* Action Buttons */}
        <div className='mt-6 flex justify-end gap-4'>
          <button
            onClick={onClose}
            className='px-5 py-3 text-text-800 bg-gray-200 rounded-lg font-medium shadow-sm transition-all hover:bg-gray-300 hover:scale-105 active:scale-95'>
            Cancel
          </button>
          <button
            onClick={handleBooking}
            className='px-6 py-3 bg-primary-500 text-white rounded-lg font-medium shadow-lg transition-all hover:scale-105 hover:bg-primary-500 active:scale-95'>
            Confirm Booking
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
