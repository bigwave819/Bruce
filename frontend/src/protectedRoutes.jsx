import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token'); // or from context / redux

  if (!token) {
    // Not logged in — redirect to home or login page
    return <Navigate to="/login" />;
  }

  // Logged in — render the protected page
  return children;
};

export default ProtectedRoute;
