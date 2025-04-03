import { useEffect, useState } from "react";
import { useUserStore } from "../../store/userStore";
import type { User } from "../../store/userStore";
import { Users as UsersIcon, Filter } from "lucide-react";

const ManageUsers = () => {
  const { users, loadAllUsers } = useUserStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      if (users.length === 0) {
        loadAllUsers(token);
      }
    }
  }, []);

  useEffect(() => {
    setFilteredUsers([...users].reverse());
  }, [users]);

  // Filter Users
  const handleFilter = () => {
    const updatedUsers = users.filter((user) => {
      const matchesSearch =
        searchTerm === "" ||
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesRole = selectedRole === "" || user.role === selectedRole;

      return matchesSearch && matchesRole;
    });

    setFilteredUsers(updatedUsers.reverse());
  };

  // Pagination
  const usersPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const startIndex = (currentPage - 1) * usersPerPage;
  const endIndex = startIndex + usersPerPage;
  const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

  return (
    <div className='p-6 sm:p-8 bg-background-50 min-h-screen'>
      {/* Header */}
      <div className='flex flex-wrap justify-between items-center gap-4'>
        <h2 className='text-2xl sm:text-4xl font-bold text-text-950 flex items-center gap-3'>
          <UsersIcon size={32} className='text-accent-500' /> Manage Users
        </h2>
      </div>

      {/* Filters Section */}
      <div className='bg-accent-50 p-4 sm:p-5 mb-6 rounded-xl shadow-lg flex flex-wrap gap-3 sm:gap-4 items-center'>
        {/* Search Input */}
        <input
          type='text'
          placeholder='Search by Name or Email'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className='p-2 sm:p-3 sm:flex-1 border text-text-950 border-gray-300 rounded-lg w-full sm:w-64 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-400 bg-white dark:bg-background-50'
        />

        {/* Role Dropdown */}
        <select
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value)}
          className='p-2 sm:p-3 border text-text-950 border-gray-300 rounded-lg w-full sm:w-44 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-400 bg-white dark:bg-background-50'>
          <option value=''>All Roles</option>
          <option value='admin'>Admin</option>
          <option value='customer'>Customer</option>
        </select>

        {/* Apply Filters Button */}
        <button
          onClick={handleFilter}
          className='px-4 sm:px-5 flex-1 sm:flex-none py-2 sm:py-3 bg-secondary-500 text-white font-bold flex gap-2 items-center rounded-lg hover:bg-secondary-600 transition-all shadow-md focus:ring-2 focus:ring-secondary-400 active:scale-95'>
          <Filter size={18} /> Filter Users
        </button>
      </div>

      {/* Users Table */}
      <div className='overflow-x-auto bg-secondary-50 p-4 sm:p-6 rounded-xl shadow-lg border border-gray-200'>
        {filteredUsers.length === 0 ? (
          <p className='text-center text-gray-500 col-span-full'>
            No users match your filters.
          </p>
        ) : (
          <table className='w-full text-gray-700 border-collapse rounded-lg overflow-hidden shadow-md'>
            <thead>
              <tr className='bg-primary-500 text-white text-left text-sm sm:text-base'>
                <th className='p-3 sm:p-4'>Name</th>
                <th className='p-3 sm:p-4'>Email</th>
                <th className='p-3 sm:p-4'>Phone</th>
                <th className='p-3 sm:p-4'>Role</th>
              </tr>
            </thead>
            <tbody>
              {paginatedUsers.map((user, index) => (
                <tr
                  key={user.id}
                  className={`border-t border-primary-500 ${
                    index % 2 === 0 ? "bg-background-50" : "bg-secondary-50"
                  } hover:bg-background-100 transition-all text-sm sm:text-base`}>
                  <td className='p-3 sm:p-4 font-medium text-gray-900'>
                    {user.name}
                  </td>
                  <td className='p-3 sm:p-4'>{user.email}</td>
                  <td className='p-3 sm:p-4'>{user.phone || "N/A"}</td>
                  <td className='p-3 sm:p-4'>{user.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination Controls */}
      {filteredUsers.length > usersPerPage && (
        <div className='flex flex-wrap justify-center items-center gap-2 sm:gap-4 mt-6 text-center'>
          {/* Previous Button */}
          <button
            onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
            disabled={currentPage === 1}
            className={`px-3 sm:px-4 py-2 rounded-lg min-w-[80px] shadow-md transition-all text-sm sm:text-base ${
              currentPage === 1
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-secondary-500 text-white font-bold hover:bg-secondary-600 active:scale-95 focus:ring-2 focus:ring-secondary-400"
            }`}>
            ← Prev
          </button>

          {/* Page Indicator */}
          <span className='text-sm sm:text-lg font-medium text-gray-700 dark:text-white'>
            Page {currentPage} of {totalPages}
          </span>

          {/* Next Button */}
          <button
            onClick={() =>
              setCurrentPage(Math.min(currentPage + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className={`px-3 sm:px-4 py-2 rounded-lg min-w-[80px] shadow-md transition-all text-sm sm:text-base ${
              currentPage === totalPages
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-secondary-500 text-white font-bold hover:bg-secondary-600 active:scale-95 focus:ring-2 focus:ring-secondary-400"
            }`}>
            Next →
          </button>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;
