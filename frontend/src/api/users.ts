import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL; // your backend base URL

export interface User {
  name?: string;
  role?: string;
}

export const fetchUserByEmail = async (email: string): Promise<User | null> => {
  try {
    const response = await axios.get<User>(`${BASE_URL}/Movie/SingleUser`, {
      params: { email },
      withCredentials: true, // in case you need session auth
    });

    return response.data;
  } catch (error) {
    console.error("Failed to fetch user by email:", error);
    return null;
  }
};
