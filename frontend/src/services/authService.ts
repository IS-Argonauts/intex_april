// src/services/authService.ts
export interface AuthUser {
    email: string;
    isAdmin: boolean;
  }

export const isAuthenticated = async (): Promise<boolean> => {
    try {
      const BASE_URL = 'https://intex2-a6d7e5dnave8hzd5.canadacentral-01.azurewebsites.net';
      const res = await fetch(`${BASE_URL}/pingauth`, {
        credentials: 'include',
      });
      return res.ok;
    } catch {
      return false;
    }
  };
  
  export const logout = async (): Promise<boolean> => {
    try {
      const BASE_URL = 'https://intex2-a6d7e5dnave8hzd5.canadacentral-01.azurewebsites.net';
      const res = await fetch(`${BASE_URL}/logout`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
      });
      return res.ok;
    } catch {
      return false;
    }
  };
  