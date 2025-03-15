import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { Menu, X, Car, User, Sun, Moon } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, logout } = useAuthStore();
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
    navigate("/login");
  };

  return (
    <nav className='bg-background-50 shadow-md p-4'>
      <div className='container mx-auto flex justify-between items-center'>
        {/* Logo */}
        <NavLink
          to='/'
          className='flex items-center text-2xl font-bold text-primary-500 dark:text-primary-400'>
          <Car
            size={28}
            className='mr-2 text-primary-500 dark:text-primary-400'
          />
          RentEase
        </NavLink>

        {/* Desktop Menu */}
        <ul className='hidden lg:flex lg:ml-10 space-x-6 text-lg'>
          {["Home", "Browse Cars", "About", "Contact"].map((item) => (
            <li key={item}>
              <NavLink
                to={
                  item === "Home"
                    ? "/"
                    : `/${item.toLowerCase().replace(/\s+/g, "-")}`
                }
                className={({ isActive }) =>
                  isActive
                    ? "text-primary-500 font-bold dark:text-primary-400"
                    : "text-text-900 hover:text-primary-500 dark:text-text-900 dark:hover:text-primary-400"
                }>
                {item}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Right Side */}
        <div className='hidden lg:flex items-center space-x-4'>
          {isAuthenticated ? (
            <>
              <NavLink
                to='/profile'
                className='text-text-900 hover:text-primary-500 dark:text-text-900 dark:hover:text-primary-400 flex items-center'>
                <User size={20} className='mr-2' />
                Profile
              </NavLink>
              <button
                onClick={handleLogout}
                className='bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600'>
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
            </>
          ) : (
            <div className='flex items-center gap-2'>
              <NavLink
                to='/register'
                className='bg-primary-500 text-white font-semibold px-6 py-2 rounded-lg shadow-md hover:bg-primary-600'>
                Register
              </NavLink>

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
          )}
        </div>

        <div className='lg:hidden flex items-center gap-2'>
          {/* Mobile Menu Toggle */}
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
        <div className='lg:hidden bg-background-50 mt-2'>
          <ul className='flex flex-col space-y-4 p-4 text-lg'>
            {["Home", "Browse Cars", "About", "Contact"].map((item) => (
              <li key={item}>
                <NavLink
                  to={
                    item === "Home"
                      ? "/"
                      : `/${item.toLowerCase().replace(/\s+/g, "-")}`
                  }
                  className='block text-text-900 hover:text-primary-500 dark:text-text-900 dark:hover:text-primary-400'
                  onClick={() => setIsOpen(false)}>
                  {item}
                </NavLink>
              </li>
            ))}
            {isAuthenticated ? (
              <>
                <li>
                  <NavLink
                    to='/profile'
                    className='block text-text-900 hover:text-primary-500 dark:text-text-900 dark:hover:text-primary-400'
                    onClick={() => setIsOpen(false)}>
                    Profile
                  </NavLink>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className='bg-red-500 text-white px-3 py-2 rounded-lg shadow-md hover:bg-red-600 w-full'>
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li>
                <NavLink
                  to='/login'
                  className='bg-primary-500 text-text-900 px-4 py-2 rounded-lg shadow-md hover:bg-primary-600 block text-center'>
                  Login / Register
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
