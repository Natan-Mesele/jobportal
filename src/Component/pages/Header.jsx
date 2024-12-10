import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Logout } from '../../Redux/Auth/Action';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false); 

  const isLoggedIn = useSelector((state) => !!state.auth.jwt); // Check if JWT exists in state
  const dispatch = useDispatch();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const handleLogout = () => {
    dispatch(Logout()); // Dispatch logout action to clear JWT
    setIsProfileDropdownOpen(false); // Close the dropdown after logging out
  };

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between px-4 md:px-16 py-4 bg-white shadow-lg">
      {/* Logo */}
      <div className="w-20 h-20">
        <Link to="/">
          <img
            src="img/logoo.png"
            alt="Logo"
            className="w-full h-full object-contain"
          />
        </Link>
      </div>

      {/* Mobile Menu Icon */}
      <div className="md:hidden">
        <button
          onClick={toggleMobileMenu}
          className="text-gray-700 hover:text-gray-900 focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Slide-in Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <button
          onClick={toggleMobileMenu}
          className="absolute top-4 right-4 text-gray-700 hover:text-gray-900 focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <nav className="flex flex-col space-y-4 px-6 py-16">
          <Link to="/" className="hover:text-gray-500" onClick={toggleMobileMenu}>
            Find Job
          </Link>
          <Link to="/find-company" className="hover:text-gray-500" onClick={toggleMobileMenu}>
            Find Company
          </Link>
          <Link to="/blog" className="hover:text-gray-500" onClick={toggleMobileMenu}>
            Blog
          </Link>
          <Link to="/contact-us" className="hover:text-gray-500" onClick={toggleMobileMenu}>
            Contact Us
          </Link>
          {isLoggedIn ? (
            <>
              <button
                className="hover:text-gray-500"
                onClick={toggleProfileDropdown}
              >
                Profile
              </button>
              {isProfileDropdownOpen && (
                <div className="mt-2 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md absolute right-0 w-40 flex flex-col items-center justify-center">
                  <Link to="/profile" className="block w-full px-4 py-2 text-gray-700 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700 text-center">
                    View Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full px-4 py-2 text-gray-700 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700 text-center"
                  >
                    Logout
                  </button>
                </div>
              )}
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-gray-500" onClick={toggleMobileMenu}>
                Login
              </Link>
              <Link to="/register" className="hover:text-gray-500" onClick={toggleMobileMenu}>
                Sign Up
              </Link>
            </>
          )}
        </nav>
      </div>

      {/* Navigation links (Desktop) */}
      <nav className="hidden md:flex space-x-6">
        <Link to="/" className="hover:text-gray-500">
          Find Job
        </Link>
        <Link to="/find-company" className="hover:text-gray-500">
          Find Company
        </Link>
        <Link to="/blog" className="hover:text-gray-500">
          Blog
        </Link>
        <Link to="/contact-us" className="hover:text-gray-500">
          Contact Us
        </Link>
      </nav>

      {/* Auth/Profile Links (Desktop) */}
      <div className="hidden md:flex items-center space-x-4">
        {isLoggedIn ? (
          <>
            <div className="relative">
              <button
                onClick={toggleProfileDropdown}
                className="hover:text-gray-500 text-center"
              >
                Profile
              </button>
              {isProfileDropdownOpen && (
                <div className="mt-2 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md absolute right-0 w-40 flex flex-col items-center justify-center">
                  <Link to="/profile" className="block w-full px-4 py-2 text-gray-700 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700 text-center">
                    View Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full px-4 py-2 text-gray-700 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700 text-center"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:text-gray-500">
              Login
            </Link>
            <Link to="/register" className="hover:text-gray-500">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
