import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  const isLogin = useSelector((state) => state.isLogin);
  if (isLogin !== 'Login') {
    return <Navigate to="/" replace />; // Redirect to login page
  }

  return children; // Render the protected page if the user is logged in
}
