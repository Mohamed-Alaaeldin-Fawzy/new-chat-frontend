'use client';
import { handleApi } from '@/helpers/handleApi';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthContextType } from '@/types';

const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');

    const getCurrentUser = async () => {
      const user = await handleApi(
        `${process.env.NEXT_PUBLIC_API_URL}/user/me`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}` || '',
          },
        }
      );
      setUser(user);
    };

    if (token) {
      getCurrentUser();
    } else {
      setUser(null);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
