import React, { createContext, useContext, useEffect, useState } from 'react';
import { isAuthenticated as checkAuth, logout as performLogout } from '../services/authService';

interface AuthContextType {
  isAuthenticated: boolean;
  userEmail?: string;
  refreshAuth: () => void;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const refreshAuth = async () => {
    const authStatus = await checkAuth();
    setIsAuthenticated(authStatus);
  };

  const logout = async () => {
    await performLogout();
    setIsAuthenticated(false);
  };

  useEffect(() => {
    refreshAuth(); // Only one call on mount
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, refreshAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
