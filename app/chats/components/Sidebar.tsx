'use client';
import React, { useState, useEffect } from 'react';
import User from './User';
import { useAuth } from '@/context/AuthContext';
import { getUsers } from '@/action/getUsers';

const Sidebar = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState<any>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await getUsers();
      setUsers(users);
    };
    fetchUsers();
  }, []);
  return (
    <div className="relative h-screen border-r-[1px] border-zinc-700 bg-zinc-950">
      {/* Sidebar Header */}
      <div className="mb-6 w-full border-b-[1px] border-zinc-700 bg-zinc-900 p-6 text-center">
        <h2 className="text-2xl font-semibold text-zinc-200">Friends</h2>
      </div>
      <div className="">
        {users.length > 0 &&
          users.map((user) => (
            <User key={user.name} name={user.name} email={user.email} />
          ))}
      </div>
      <div className="absolute bottom-0 left-0 right-0 border-t-[1px] border-zinc-700">
        {user && <User name={user.name} email={user?.email} />}
      </div>
    </div>
  );
};

export default Sidebar;
