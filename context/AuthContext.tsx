'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthContextType } from '@/types';
import { handleApi } from '@/helpers/handleApi';

const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
  setToken: () => {},
  token: null,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  // to use it inside the authForm to trigger a re-render
  const [token, setToken] = useState<string | null>(
    localStorage.getItem('token')
  );

  useEffect(() => {
    const getCurrentUser = async () => {
      if (token) {
        const user = await handleApi(
          `${process.env.NEXT_PUBLIC_API_URL}/user/me`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUser(user);
      } else {
        setUser(null);
      }
    };

    getCurrentUser();
  }, [token]);

  return (
    <AuthContext.Provider value={{ user, setUser, setToken, token }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
