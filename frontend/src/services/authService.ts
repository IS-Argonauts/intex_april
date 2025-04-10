// src/services/authService.ts
export interface AuthUser {
    email: string;
    isAdmin: boolean;
  }

export const isAuthenticated = async (): Promise<boolean> => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/pingauth`, {
        credentials: 'include',
      });
      return res.ok;
    } catch {
      return false;
    }
  };
  
  export const logout = async (): Promise<boolean> => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/logout`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
      });
      return res.ok;
    } catch {
      return false;
    }
  };
  