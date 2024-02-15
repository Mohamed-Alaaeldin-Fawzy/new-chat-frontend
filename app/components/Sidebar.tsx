'use client';
import React, { useState, useEffect } from 'react';
import User from './User';
import { useAuth } from '@/context/AuthContext';
import { getUsers } from '@/action/getUsers';
import { getUserChats } from '@/action/getUserChats';
import { User as UserType, Chat as ChatType } from '@/types';
import SideBarHeader from './SideBarHeader';
import Chat from './Chat';

const Sidebar = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState<UserType[]>([]);
  const [userChats, setUserChats] = useState<ChatType[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const users = await getUsers();
        setUsers(users);
      } catch (error) {
        console.error('Failed to fetch users:', error);
        // Handle error
      }
    };
    if (user?.id) {
      fetchUsers();
    }
  }, [user?.id]);

  useEffect(() => {
    const fetchUserChats = async () => {
      try {
        const userChats = await getUserChats({ id: user!.id! });
        setUserChats(userChats);
      } catch (error) {
        console.error('Failed to fetch user chats:', error);
        // Handle error (e.g., set an error state, show a message, etc.)
      }
    };
    if (user?.id) {
      fetchUserChats();
    }
  }, [user]);

  return (
    <div className="relative h-full rounded-l-2xl border-r-[1px] border-gray-200 bg-white">
      {user && user && <SideBarHeader users={users} currentUser={user!} />}
      <div className="h-[77%] overflow-y-auto scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-900">
        {userChats &&
          userChats.length > 0 &&
          userChats.map((chat) => (
            <div
              key={chat.id}
              className="m-4 flex flex-col items-center rounded-xl hover:bg-gray-200"
            >
              <Chat name={chat.name} id={chat.id} usersIds={chat.usersIds} />
            </div>
          ))}
      </div>
      <div className="absolute bottom-0 left-0 right-0  border-t-[1px] border-gray-200 p-4">
        {user && <User name={user.name} email={user?.email} />}
      </div>
    </div>
  );
};

export default Sidebar;
