'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UsersContextType } from '@/types';
import { getUsers } from '@/action/getUsers';
import { useAuth } from '@/context/AuthContext';

const UsersContext = createContext<UsersContextType>({
  users: [],
  setUsers: () => {
    [];
  },
});

export const UsersProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const fetchedUsers = await getUsers();
        setUsers(fetchedUsers);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    };

    if (user?.id) {
      fetchUsers();
    }
  }, [user?.id]);

  return (
    <UsersContext.Provider value={{ users, setUsers }}>
      {children}
    </UsersContext.Provider>
  );
};

export const useGetUsers = () => useContext(UsersContext);
