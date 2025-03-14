import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import { useUserStore } from "../../store/userStore";
import { Sun, Moon, Menu, X } from "lucide-react";

const AdminNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, logout } = useAuthStore();
  const { user } = useUserStore();
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  // Check if user is an admin before rendering the navbar
  if (!isAuthenticated || user?.role !== "admin") return null;

  return (
    <nav className='bg-background-50 shadow-md p-4'>
      <div className='container mx-auto flex justify-between items-center'>
        {/* Logo */}
        <NavLink
          to='/admin/dashboard'
          className='flex items-center text-2xl font-bold text-primary-500 dark:text-primary-400'>
          Admin Panel
        </NavLink>

        {/* Desktop Menu */}
        <ul className='hidden md:flex space-x-6 text-md'>
          {[
            {
              name: "Dashboard",
              path: "/admin",
            },
            {
              name: "Manage Cars",
              path: "/admin/manage-cars",
            },
            {
              name: "Manage Users",
              path: "/admin/manage-users",
            },
            {
              name: "Manage Bookings",
              path: "/admin/manage-bookings",
            },
          ].map(({ name, path }) => (
            <li key={name}>
              <NavLink
                to={path}
                className={({ isActive }) =>
                  isActive
                    ? "text-primary-500 font-bold dark:text-primary-400 flex items-center gap-2"
                    : "text-text-900 hover:text-primary-500 dark:text-text-900 dark:hover:text-primary-400 flex items-center gap-2"
                }>
                {name}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Right Side */}
        <div className='hidden md:flex items-center space-x-4'>
          <button
            onClick={handleLogout}
            className='bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600 flex items-center gap-2'>
            Logout
          </button>

          {/* Dark Mode Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className='p-2 rounded-full hover:bg-accent-100'>
            {darkMode ? (
              <Sun size={20} className='text-accent-500' />
            ) : (
              <Moon size={20} className='text-accent-500' />
            )}
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className='flex items-center gap-2 md:hidden'>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className='md:hidden focus:outline-none text-text-900 dark:text-text-900'>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

          {/* Dark Mode Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className='p-2 rounded-full hover:bg-accent-100'>
            {darkMode ? (
              <Sun size={20} className='text-accent-500' />
            ) : (
              <Moon size={20} className='text-accent-500' />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className='md:hidden bg-background-50 mt-2'>
          <ul className='flex flex-col space-y-4 p-4 text-lg'>
            {[
              {
                name: "Dashboard",
                path: "/admin/dashboard",
              },
              {
                name: "Manage Cars",
                path: "/admin/manage-cars",
              },
              {
                name: "Manage Users",
                path: "/admin/manage-users",
              },
              {
                name: "Manage Bookings",
                path: "/admin/manage-bookings",
              },
            ].map(({ name, path }) => (
              <li key={name}>
                <NavLink
                  to={path}
                  className='text-text-900 hover:text-primary-500 dark:text-text-900 dark:hover:text-primary-400 flex items-center gap-2'
                  onClick={() => setIsOpen(false)}>
                  {name}
                </NavLink>
              </li>
            ))}
            <li>
              <button
                onClick={handleLogout}
                className='bg-red-500 text-white px-3 py-2 rounded-lg shadow-md hover:bg-red-600 w-full flex items-center gap-2 justify-center'>
                Logout
              </button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default AdminNavbar;
