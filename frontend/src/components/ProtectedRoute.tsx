// src/components/ProtectedRoute.tsx
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../services/authService';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authStatus, setAuthStatus] = useState<'loading' | 'authenticated' | 'unauthorized'>('loading');

  useEffect(() => {
    const check = async () => {
      const ok = await isAuthenticated();
      setAuthStatus(ok ? 'authenticated' : 'unauthorized');
    };
    check();
  }, []);

  if (authStatus === 'loading') {
    return <div>Loading...</div>; // Or a spinner
  }

  if (authStatus === 'unauthorized') {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
