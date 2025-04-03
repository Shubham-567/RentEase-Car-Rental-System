import { useEffect } from "react";
import { useUserStore } from "../../store/userStore";
import { useBookingStore } from "../../store/bookingStore";
import { useCarStore } from "../../store/carsStore";
import {
  Car,
  User,
  CalendarDays,
  DollarSign,
  CheckCircle,
  Clock,
  XCircle,
  LayoutDashboard,
} from "lucide-react";

const AdminDashboard = () => {
  const { cars, loadCars } = useCarStore();
  const { user, loadUserProfile } = useUserStore();
  const { users, loadAllUsers } = useUserStore();
  const { bookings, loadBookings } = useBookingStore();

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      if (cars.length === 0) loadCars();
      if (!user) loadUserProfile(token);
      if (users.length === 0) loadAllUsers(token);
      if (bookings.length === 0) loadBookings(token);
    }
  }, []);

  if (!cars || !bookings || !users) {
    return <p className='text-center text-lg text-gray-600'>Loading...</p>;
  }

  // Calculate statistics
  const totalRevenue = bookings
    .filter((b) => b.status === "Confirmed")
    .reduce((sum, b) => sum + Number(b.total_price), 0);
  const confirmedBookings = bookings.filter(
    (b) => b.status === "Confirmed"
  ).length;
  const pendingBookings = bookings.filter((b) => b.status === "Pending").length;
  const canceledBookings = bookings.filter(
    (b) => b.status === "Cancelled"
  ).length;

  return (
    <div className='p-4 md:p-6 lg:p-8 bg-background-50 min-h-screen'>
      {/* Admin Title */}
      <h2 className='text-2xl md:text-3xl lg:text-4xl font-bold text-text-950 mb-6 flex items-center gap-3'>
        <LayoutDashboard className='text-accent-500 w-8 h-8 md:w-9 md:h-9 lg:w-10 lg:h-10' />
        Admin Dashboard
      </h2>

      {/* Summary Cards */}
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6'>
        {[
          { title: "Total Cars", value: cars.length, icon: Car },
          { title: "Total Users", value: users.length, icon: User },
          {
            title: "Total Bookings",
            value: bookings.length,
            icon: CalendarDays,
          },
          {
            title: "Total Revenue",
            value: `₹${totalRevenue.toLocaleString()}`,
            icon: DollarSign,
          },
        ].map((item, index) => (
          <div
            key={index}
            className='p-4 md:p-6 bg-secondary-50 shadow-lg rounded-xl flex flex-col items-center text-center transform transition-all hover:scale-105'>
            <item.icon className='text-accent-500 w-7 h-7 md:w-8 md:h-8 lg:w-9 lg:h-9 mb-2' />
            <h3 className='text-base md:text-lg font-semibold text-text-900'>
              {item.title}
            </h3>
            <p className='text-2xl md:text-3xl font-bold text-gray-700'>
              {item.value}
            </p>
          </div>
        ))}
      </div>

      {/* Booking Status Overview */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mt-6'>
        {/* Revenue Card */}
        <div className='bg-secondary-50 p-4 md:p-6 rounded-xl shadow-md border border-gray-200'>
          <h3 className='text-base md:text-lg font-semibold text-gray-700 flex items-center gap-2'>
            <DollarSign className='text-green-600 w-5 h-5' /> Revenue Overview
          </h3>
          <p className='text-2xl md:text-3xl font-bold text-green-600 mt-2'>
            ₹{totalRevenue.toLocaleString()}
          </p>
        </div>

        {/* Booking Status Card */}
        <div className='bg-secondary-50 p-4 md:p-6 rounded-xl shadow-md border border-gray-200'>
          <h3 className='text-base md:text-lg font-semibold text-gray-700 flex items-center gap-2'>
            <CalendarDays className='text-accent-500 w-5 h-5' /> Booking Status
            Breakdown
          </h3>
          <ul className='mt-3 space-y-3'>
            <li className='flex items-center gap-2 text-green-600 text-base md:text-lg'>
              <CheckCircle className='w-5 h-5' />
              <span className='font-medium'>Confirmed:</span>{" "}
              {confirmedBookings}
            </li>
            <li className='flex items-center gap-2 text-yellow-600 text-base md:text-lg'>
              <Clock className='w-5 h-5' />
              <span className='font-medium'>Pending:</span> {pendingBookings}
            </li>
            <li className='flex items-center gap-2 text-red-600 text-base md:text-lg'>
              <XCircle className='w-5 h-5' />
              <span className='font-medium'>Cancelled:</span> {canceledBookings}
            </li>
          </ul>
        </div>
      </div>

      {/* Recent Bookings Table */}
      <div className='mt-6 bg-secondary-50 p-4 md:p-6 rounded-xl shadow-md border border-gray-200'>
        <h3 className='text-base md:text-lg font-semibold text-gray-700 flex items-center gap-2'>
          <CalendarDays className='text-accent-500 w-5 h-5' /> Recent Bookings
        </h3>
        <div className='overflow-x-auto mt-3 rounded-xl shadow-md'>
          <table className='w-full border-collapse text-gray-700 rounded-lg overflow-hidden shadow-md'>
            <thead>
              <tr className='bg-primary-500 text-white text-sm md:text-base'>
                <th className='p-3 text-left'>User Name</th>
                <th className='p-3 text-left'>Car Name</th>
                <th className='p-3 text-left'>Start Date</th>
                <th className='p-3 text-left'>End Date</th>
                <th className='p-3 text-left'>Total Price</th>
                <th className='p-3 text-left'>Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.slice(0, 5).map((booking, index) => (
                <tr
                  key={booking.id}
                  className={`border-t border-primary-500 text-sm md:text-base ${
                    index % 2 === 0 ? "bg-background-50" : "bg-secondary-50"
                  } hover:bg-background-100 transition-all`}>
                  <td className='p-3'>{booking.user_name}</td>
                  <td className='p-3'>{booking.car_name}</td>
                  <td className='p-3'>
                    {new Date(booking.start_date).toLocaleDateString("en-GB")}
                  </td>
                  <td className='p-3'>
                    {new Date(booking.end_date).toLocaleDateString("en-GB")}
                  </td>
                  <td className='p-3 font-semibold text-gray-800'>
                    ₹{Number(booking.total_price).toLocaleString()}
                  </td>
                  <td className='p-3'>
                    <span
                      className={`px-3 py-1 text-xs md:text-sm font-semibold rounded-full ${
                        booking.status === "Confirmed"
                          ? "bg-green-100 text-green-600 border border-green-300"
                          : booking.status === "Pending"
                          ? "bg-yellow-100 text-yellow-600 border border-yellow-300"
                          : "bg-red-100 text-red-600 border border-red-300"
                      }`}>
                      {booking.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
