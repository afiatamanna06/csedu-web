import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import React from 'react';

const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  // Check if route requires admin and user is not an admin
  if (requireAdmin && !currentUser.email.endsWith('@admin.csedu.edu')) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute; 