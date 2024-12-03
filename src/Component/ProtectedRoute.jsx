import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = useSelector((state) => !!state.auth.jwt); // Check login status

  return isLoggedIn ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;