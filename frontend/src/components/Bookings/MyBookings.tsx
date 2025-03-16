import { CalendarDays, Calendar, CreditCard, MoveRight } from "lucide-react";
import { useUserStore } from "../../store/userStore";
import { useBookingStore } from "../../store/bookingStore";
import { useAuthStore } from "../../store/authStore";
import { useEffect } from "react";

const MyBookings = () => {
  const { bookings, loadBookings } = useUserStore();
  const { changeBookingStatus } = useBookingStore();
  const { token } = useAuthStore();

  const handleBookingCancel = async (bookingId: number, newStatus: string) => {
    if (window.confirm("Are you sure you want to update the booking status?")) {
      try {
        const response = await changeBookingStatus(
          token!,
          bookingId,
          newStatus
        );
        console.log("Change booking response:", response);

        await loadBookings(token!);
      } catch (error) {
        console.error("Error changing booking status:", error);
      }
    }
  };

  useEffect(() => {
    if (token) {
      loadBookings(token);
    }
  }, [token, loadBookings]);

  return (
    <div className='bg-secondary-50 p-6 rounded-xl shadow-md border border-gray-200 mt-6'>
      <h3 className='text-lg md:text-xl font-semibold text-text-900 flex items-center gap-2'>
        <CalendarDays size={22} className='text-primary-600' />
        My Bookings
      </h3>

      {/* Booking List */}
      <div className='mt-4'>
        {bookings.length > 0 ? (
          <ul className='space-y-4'>
            {bookings.map((booking) => (
              <li
                key={booking.id}
                className='p-5 border border-gray-300 rounded-xl bg-background-50 shadow-md flex flex-col md:flex-row items-start gap-4 md:gap-6 transition-all hover:shadow-lg'>
                {/* Car Image */}
                <img
                  src={booking.car_image}
                  alt={booking.car_name}
                  className='w-full h-full md:w-32 md:h-20 object-cover rounded-lg shadow-md'
                />

                {/* Booking Details */}
                <div className='flex-1 text-left'>
                  <h4 className='text-base md:text-lg font-bold text-text-900'>
                    {booking.car_name}
                  </h4>
                  <p className='text-sm text-gray-600 flex items-center gap-2'>
                    <Calendar size={16} className='text-accent-500' />
                    {new Date(booking.start_date).toLocaleDateString("en-GB")}
                    <MoveRight size={20} />
                    {new Date(booking.end_date).toLocaleDateString("en-GB")}
                  </p>
                  <p className='text-sm font-medium text-gray-600 flex items-center gap-2'>
                    <CreditCard size={16} className='text-primary-500' />₹
                    {booking.total_price.toLocaleString()}
                  </p>
                </div>

                {/* Status & Cancel Button */}
                <div className='flex flex-col items-start md:items-end gap-3 w-full md:w-auto'>
                  {/* Status Badge */}
                  <span
                    className={`px-3 py-1 text-xs font-semibold rounded-sm ${
                      booking.status === "Confirmed"
                        ? "bg-green-100 text-green-600 border border-green-300"
                        : booking.status === "Pending"
                        ? "bg-yellow-100 text-yellow-600 border border-yellow-300"
                        : "bg-red-100 text-red-600 border border-red-300"
                    }`}>
                    {booking.status}
                  </span>

                  {booking.status === "Pending" && token && (
                    <button
                      onClick={() =>
                        handleBookingCancel(booking.id, "Cancelled")
                      }
                      className='px-4 py-2 bg-red-500 text-white text-sm font-medium rounded-lg shadow-md transition-all hover:bg-red-600 hover:scale-105 active:scale-95'>
                      Cancel
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className='text-text-500 text-center'>No bookings found.</p>
        )}
      </div>
    </div>
  );
};

export default MyBookings;
