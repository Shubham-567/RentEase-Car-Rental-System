import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { Menu, X, Car, User } from "lucide-react"; // ✅ Lucide Icons

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className='bg-background shadow-md p-4'>
      <div className='container mx-auto flex justify-between items-center'>
        {/* Left side logo */}
        <NavLink
          to='/'
          className='flex items-center text-2xl font-bold text-primary-600'>
          <Car size={28} className='mr-2 text-primary-600' />
          RentEase
        </NavLink>

        {/* Desktop menu */}
        <ul className='hidden md:flex space-x-6 text-lg'>
          <li>
            <NavLink
              to='/'
              className={({ isActive }) =>
                isActive
                  ? "text-primary-600 font-bold"
                  : "text-text-900 hover:text-primary-600"
              }>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/cars'
              className={({ isActive }) =>
                isActive
                  ? "text-primary-600 font-bold"
                  : "text-text-900 hover:text-primary-600"
              }>
              Cars
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/about'
              className={({ isActive }) =>
                isActive
                  ? "text-primary-600 font-bold"
                  : "text-text-900 hover:text-primary-600"
              }>
              About
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/contact'
              className={({ isActive }) =>
                isActive
                  ? "text-primary-600 font-bold"
                  : "text-text-900 hover:text-primary-600"
              }>
              Contact
            </NavLink>
          </li>
        </ul>

        {/* Right side auth links */}
        <div className='hidden md:flex items-center space-x-4'>
          {isAuthenticated ? (
            <>
              <NavLink
                to='/profile'
                className='text-text-900 hover:text-primary-600 flex items-center'>
                <User size={20} className='mr-2' />
                Profile
              </NavLink>
              <button
                onClick={handleLogout}
                className='bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600'>
                Logout
              </button>
            </>
          ) : (
            <NavLink
              to='/login'
              className='bg-primary-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-primary-600'>
              Login / Register
            </NavLink>
          )}
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className='md:hidden focus:outline-none'>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className='md:hidden bg-background mt-2'>
          <ul className='flex flex-col space-y-4 p-4 text-lg'>
            <li>
              <NavLink
                to='/'
                className='block text-text-900 hover:text-primary-600'
                onClick={() => setIsOpen(false)}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to='/cars'
                className='block text-text-900 hover:text-primary-600'
                onClick={() => setIsOpen(false)}>
                Cars
              </NavLink>
            </li>
            <li>
              <NavLink
                to='/about'
                className='block text-text-900 hover:text-primary-600'
                onClick={() => setIsOpen(false)}>
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                to='/contact'
                className='block text-text-900 hover:text-primary-600'
                onClick={() => setIsOpen(false)}>
                Contact
              </NavLink>
            </li>
            {isAuthenticated ? (
              <>
                <li>
                  <NavLink
                    to='/profile'
                    className='block text-text-900 hover:text-primary-600'
                    onClick={() => setIsOpen(false)}>
                    Profile
                  </NavLink>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className='bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600 w-full'>
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li>
                <NavLink
                  to='/login'
                  className='bg-primary-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-primary-600 block text-center'>
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
