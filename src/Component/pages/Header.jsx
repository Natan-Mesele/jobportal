import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Logout } from '../../Redux/Auth/Action';

function Header() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => !!state.auth.jwt); // Check if JWT exists
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    dispatch(Logout());
    localStorage.removeItem("jwt"); // Optional: Remove JWT from localStorage on logout
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

      {/* Navigation links */}
      <nav className="hidden md:flex space-x-6">
        <Link to="/" className="hover:text-gray-500">Find Job</Link>
        <Link to="/find-company" className="hover:text-gray-500">Find Company</Link>
        <Link to="/blog" className="hover:text-gray-500">Blog</Link>
        <Link to="/contact-us" className="hover:text-gray-500">Contact Us</Link>
      </nav>

      {/* Auth/Profile Links */}
      <div className="hidden md:flex items-center space-x-4">
        {!isLoggedIn ? (
          <>
            <Link to="/login" className="hover:text-gray-500">Login</Link>
            <Link to="/register" className="hover:text-gray-500">Sign Up</Link>
          </>
        ) : (
          <div className="relative">
            <button
              onClick={toggleMenu}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-800"
            >
              <img
                src="https://via.placeholder.com/40"
                alt="Profile"
                className="w-10 h-10 rounded-full object-cover"
              />
              <span>Profile</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 ml-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            {isMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg">
                <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100">My Profile</Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}

export default Header; 
