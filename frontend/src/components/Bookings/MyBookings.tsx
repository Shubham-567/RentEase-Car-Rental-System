import { CalendarDays, Calendar, CreditCard } from "lucide-react";
import { useUserStore } from "../../store/userStore";
import { useBookingStore } from "../../store/bookingStore";
import { useAuthStore } from "../../store/authStore";
import { useEffect } from "react";

const MyBookings = () => {
  const { bookings, loadBookings } = useUserStore(); // user booking history
  //   console.log("Bookings: ", bookings);
  const { removeBooking } = useBookingStore();
  const { token } = useAuthStore();

  useEffect(() => {
    if (token) {
      loadBookings(token);
    }
  }, [token, loadBookings]);

  return (
    <div className='bg-secondary-50 p-6 rounded-xl shadow-md border border-gray-200 mt-6'>
      <h3 className='text-xl font-semibold text-text-900 flex items-center gap-2'>
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
                className='p-5 border border-gray-300 rounded-xl bg-background-50 shadow-md flex flex-col md:flex-row items-center md:items-start gap-6 transition-all hover:shadow-lg'>
                {/* Car Image */}
                <img
                  src={booking.car_image}
                  alt={booking.car_name}
                  className='w-24 h-16 md:w-32 md:h-20 object-cover rounded-lg shadow-md'
                />

                {/* Booking Details */}
                <div className='flex-1'>
                  <h4 className='text-lg font-bold text-text-900'>
                    {booking.car_name}
                  </h4>
                  <p className='text-sm text-text-600 flex items-center gap-2'>
                    <Calendar size={16} className='text-accent-500' />
                    {new Date(booking.start_date).toLocaleDateString(
                      "en-GB"
                    )} →{" "}
                    {new Date(booking.end_date).toLocaleDateString("en-GB")}
                  </p>
                  <p className='text-sm font-medium text-primary-600 flex items-center gap-2'>
                    <CreditCard size={16} className='text-primary-500' />₹
                    {booking.total_price.toLocaleString()}
                  </p>
                </div>

                {/* Cancel Booking Button (if applicable) */}

                <div className='flex justify-between flex-col gap-3'>
                  {/* Status Badge */}
                  <span
                    className={`mt-2 px-3 py-1 text-xs font-semibold rounded-sm ${
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
                        removeBooking(token, booking.id).then(() => {
                          loadBookings(token);
                        })
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
