import { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import { useUserStore } from "../../store/userStore";
import { Sun, Moon, Menu, X, ShieldUser } from "lucide-react";

const AdminNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, logout } = useAuthStore();
  const { user } = useUserStore();
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  // Reference for the navbar container
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  // Close navbar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  // Check if user is an admin before rendering the navbar
  if (!isAuthenticated || user?.role !== "admin") return null;

  return (
    <nav className='bg-background-50 shadow-md p-4 relative' ref={menuRef}>
      <div className='container mx-auto flex justify-between items-center'>
        {/* Logo */}
        <NavLink
          to='/admin'
          className='flex items-center gap-2 text-xl font-bold text-primary-500 dark:text-primary-400'>
          <ShieldUser size={25} /> RentEase Admin
        </NavLink>

        {/* Desktop Menu */}
        <ul className='hidden lg:flex space-x-6 text-md'>
          {[
            { name: "Dashboard", path: "/admin", end: true },
            { name: "Manage Cars", path: "/admin/manage-cars" },
            { name: "Manage Users", path: "/admin/manage-users" },
            { name: "Manage Bookings", path: "/admin/manage-bookings" },
          ].map(({ name, path, end }) => (
            <li key={name}>
              <NavLink
                to={path}
                end={end}
                className={({ isActive }) =>
                  isActive
                    ? "text-primary-500 dark:text-primary-400 flex items-center gap-2 font-bold"
                    : "text-text-900 hover:text-primary-500 dark:text-text-900 dark:hover:text-primary-400 flex items-center gap-2"
                }>
                {name}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Right Side */}
        <div className='hidden lg:flex items-center space-x-4'>
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
        <div className='lg:hidden flex items-center gap-2'>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className='lg:hidden focus:outline-none text-text-900 dark:text-text-900'>
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
        <div className='lg:hidden bg-background-50 mt-2 absolute left-0 right-0 shadow-md z-50'>
          <ul className='flex flex-col space-y-4 p-4 text-lg'>
            {[
              { name: "Dashboard", path: "/admin", end: true },
              { name: "Manage Cars", path: "/admin/manage-cars" },
              { name: "Manage Users", path: "/admin/manage-users" },
              { name: "Manage Bookings", path: "/admin/manage-bookings" },
            ].map(({ name, path, end }) => (
              <li key={name}>
                <NavLink
                  to={path}
                  end={end}
                  className={({ isActive }) =>
                    isActive
                      ? "text-primary-500 dark:text-primary-400 flex items-center gap-2 font-bold"
                      : "text-text-900 hover:text-primary-500 dark:text-text-900 dark:hover:text-primary-400 flex items-center gap-2"
                  }
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
