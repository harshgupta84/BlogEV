import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import useUserStore from '@/store/userStore';

const ProtectedRoute = ({ children }) => {
  const { token, isSignedIn,loading } = useUserStore();
  if (loading) return <div>Loading...</div>;

  if (isSignedIn==false) {
    return <Navigate to="/auth/login"/>;
  }

  return children;
};

export default ProtectedRoute;
