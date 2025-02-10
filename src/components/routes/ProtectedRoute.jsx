import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import useUserStore from '@/store/userStore';

const ProtectedRoute = ({ children }) => {
  const { token, isSignedIn, initializeState } = useUserStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    initializeState();
    setIsLoading(false);
  }, [initializeState]);

  if (isLoading) return <div>Loading...</div>;

  if (!token) {
    return <Navigate to="/auth/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
