import React from 'react';
import { Navigate } from 'react-router-dom';

const AuthGuard = ({ children }) => {
  // In a real app, you would check for an authentication token or user session
  const isAuthenticated = localStorage.getItem('authToken');
  
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default AuthGuard;