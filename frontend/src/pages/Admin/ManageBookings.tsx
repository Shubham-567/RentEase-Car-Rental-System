import { useEffect, useState } from "react";
import { useBookingStore } from "../../store/bookingStore";
import type { Booking } from "../../store/bookingStore";
import {
  RefreshCw,
  Trash,
  ChevronLeft,
  ChevronRight,
  NotebookText,
} from "lucide-react";
import Toast from "../../components/Toast";

const ManageBookings = () => {
  const { bookings, loadBookings, changeBookingStatus, removeBooking } =
    useBookingStore();
  const [filterStatus, setFilterStatus] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  const [toast, setToast] = useState<{
    id: number;
    message: string;
    type: "success" | "error" | "warning";
  } | null>(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      loadBookings(token);
    }
  }, []);

  useEffect(() => {
    setFilteredBookings([...bookings].reverse());
  }, [bookings]);

  const handleFilter = () => {
    const updatedBookings = bookings.filter((booking) => {
      const matchesSearch =
        searchTerm === "" ||
        booking.user_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.car_name?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        filterStatus === "" || booking.status === filterStatus;

      return matchesSearch && matchesStatus;
    });

    setFilteredBookings(updatedBookings.reverse());
  };

  const totalPages = Math.ceil(filteredBookings.length / rowsPerPage);
  const paginatedBookings = filteredBookings.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handleStatusChange = async (bookingId: number, newStatus: string) => {
    if (window.confirm("Are you sure you want to update the booking status?")) {
      await changeBookingStatus(token!, bookingId, newStatus);
      loadBookings(token!);

      if (newStatus === "Confirmed") {
        setToast({
          id: Date.now(),
          message: `Booking status is now ${newStatus}!`,
          type: "success",
        });
      } else if (newStatus === "Pending") {
        setToast({
          id: Date.now(),
          message: `Booking status is now ${newStatus}!`,
          type: "success",
        });
      } else {
        setToast({
          id: Date.now(),
          message: `Booking status is now ${newStatus}!`,
          type: "success",
        });
      }
    }
  };

  const handleDelete = async (bookingId: number) => {
    if (window.confirm("Are you sure you want to delete this booking?")) {
      await removeBooking(token!, bookingId);
      loadBookings(token!);

      setToast({
        id: Date.now(),
        message: "Booking deleted successfully!",
        type: "success",
      });
    }
  };

  return (
    <div className='p-4 md:p-6 lg:p-8 bg-background-50 min-h-screen'>
      {toast && (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {/* Page Heading */}
      <h2 className='text-2xl md:text-3xl lg:text-4xl font-bold text-text-950 mb-6 flex items-center gap-3'>
        <NotebookText className='text-accent-500 w-8 h-8 md:w-10 md:h-10' />
        Manage Bookings
      </h2>

      {/* Filters Section */}
      <div className='bg-accent-50 p-4 md:p-5 mb-6 rounded-xl shadow-lg flex flex-col sm:flex-row sm:flex-wrap gap-4 items-center'>
        <input
          type='text'
          placeholder='Search by User or Car'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className='p-3 flex-1 border text-text-950 border-gray-300 rounded-lg w-full sm:w-64 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-400 bg-white dark:bg-background-50'
        />

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className='p-3 border text-text-950 border-gray-300 rounded-lg w-full sm:w-44 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-400 bg-white dark:bg-background-50 hover:cursor-pointer'>
          <option value=''>All Statuses</option>
          <option value='Confirmed'>Confirmed</option>
          <option value='Pending'>Pending</option>
          <option value='Canceled'>Canceled</option>
        </select>

        <button
          onClick={handleFilter}
          className='w-full sm:w-auto px-5 py-3 bg-secondary-500 text-white font-bold flex gap-2 items-center justify-center rounded-lg hover:bg-secondary-600 transition-all shadow-md focus:ring-2 focus:ring-secondary-400'>
          <RefreshCw className='w-5 h-5' /> Apply Filters
        </button>
      </div>

      {/* Booking Table */}
      <div className='overflow-x-auto bg-secondary-50 p-4 md:p-6 rounded-xl shadow-lg border border-gray-200'>
        {paginatedBookings.length === 0 ? (
          <p className='text-center text-gray-500'>
            No bookings match your filters.
          </p>
        ) : (
          <table className='w-full text-gray-700 border-collapse rounded-lg overflow-hidden shadow-md'>
            <thead>
              <tr className='bg-primary-500 text-white text-sm md:text-base'>
                <th className='p-3 text-left'>User</th>
                <th className='p-3 text-left'>Car</th>
                <th className='p-3 text-left'>Created At</th>
                <th className='p-3 text-left'>Start Date</th>
                <th className='p-3 text-left'>End Date</th>
                <th className='p-3 text-left'>Total Price</th>
                <th className='p-3 text-left'>Status</th>
                <th className='p-3 text-left'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedBookings.map((booking) => (
                <tr
                  key={booking.id}
                  className='border-t border-primary-500 hover:bg-background-100 transition-all text-sm md:text-base'>
                  <td className='p-3'>{booking.user_name}</td>
                  <td className='p-3'>{booking.car_name}</td>
                  <td className='p-3'>
                    {new Date(booking.created_at).toLocaleDateString()}
                  </td>
                  <td className='p-3'>
                    {new Date(booking.start_date).toLocaleDateString()}
                  </td>
                  <td className='p-3'>
                    {new Date(booking.end_date).toLocaleDateString()}
                  </td>
                  <td className='p-3 font-semibold text-gray-800'>
                    ₹{Number(booking.total_price).toLocaleString()}
                  </td>
                  <td className='p-3'>
                    <span
                      className={`px-3 py-1 text-xs font-semibold rounded-full 
                  ${
                    booking.status === "Confirmed"
                      ? "bg-green-100 text-green-600 border border-green-300"
                      : booking.status === "Pending"
                      ? "bg-yellow-100 text-yellow-600 border border-yellow-300"
                      : "bg-red-100 text-red-600 border border-red-300"
                  }`}>
                      {booking.status}
                    </span>
                  </td>
                  <td className='p-3 flex flex-col sm:flex-row gap-2 items-center'>
                    <select
                      value={booking.status}
                      onChange={(e) =>
                        handleStatusChange(booking.id, e.target.value)
                      }
                      className='p-2 border border-gray-300 rounded-lg bg-white dark:bg-background-50 text-text-950 shadow-sm hover:cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary-400'>
                      <option value='Confirmed'>Confirmed</option>
                      <option value='Pending'>Pending</option>
                      <option value='Cancelled'>Cancel</option>
                    </select>

                    <button
                      onClick={() => handleDelete(booking.id)}
                      className='w-full sm:w-auto px-3 py-2 bg-red-500 text-white rounded-lg flex items-center gap-2 justify-center hover:bg-red-700 hover:cursor-pointer transition-all shadow-md'>
                      <Trash className='w-4 h-4' /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination Controls */}
      {filteredBookings.length > rowsPerPage && (
        <div className='flex flex-col sm:flex-row justify-center mt-6 gap-4 items-center'>
          <button
            onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-lg shadow-md transition-all w-full sm:w-auto ${
              currentPage === 1
                ? "bg-gray-300 text-gray-500"
                : "bg-secondary-500 text-white hover:bg-secondary-600"
            }`}>
            <ChevronLeft className='w-4 h-4 inline' /> Previous
          </button>

          <span className='text-lg font-medium text-gray-700'>
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={() =>
              setCurrentPage(Math.min(currentPage + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-lg shadow-md transition-all w-full sm:w-auto ${
              currentPage === totalPages
                ? "bg-gray-300 text-gray-500"
                : "bg-secondary-500 text-white hover:bg-secondary-600"
            }`}>
            Next <ChevronRight className='w-4 h-4 inline' />
          </button>
        </div>
      )}
    </div>
  );
};

export default ManageBookings;
