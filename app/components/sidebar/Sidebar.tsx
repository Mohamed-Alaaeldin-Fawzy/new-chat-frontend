'use client';
import React, { useState, useEffect } from 'react';
import User from '../User';
import { useAuth } from '@/context/AuthContext';
import { getUserChats } from '@/action/getUserChats';
import { Chat as ChatType } from '@/types';
import SideBarHeader from './SidebarHeader';
import ChatPreview from '../chat/ChatPreview';
import SidebarSkeleton from './SidebarSkeleton';

const Sidebar = ({
  setIsModalOpen,
  selectedUsers,
}: {
  setIsModalOpen: any;
  selectedUsers: string[];
}) => {
  const { user } = useAuth();

  const [userChats, setUserChats] = useState<ChatType[]>([]);
  const openModal = () => setIsModalOpen(true);
  const { setToken } = useAuth();

  useEffect(() => {
    const fetchUserChats = async () => {
      try {
        const userChats = await getUserChats();
        setUserChats(userChats);
      } catch (error) {
        console.error('Failed to fetch user chats:', error);
      }
    };
    fetchUserChats();
  }, [selectedUsers]);

  const handleLogoutChange = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  return user ? (
    <div className="flex h-full w-full flex-col border-r-[1px] border-gray-200 bg-white">
      <SideBarHeader
        handleLogoutChange={handleLogoutChange}
        openModal={openModal}
      />
      <div className="grow overflow-y-auto scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-900">
        {userChats.length > 0 &&
          userChats.map((chat) => (
            <div
              key={chat.id}
              className="m-4 flex flex-col items-start rounded-xl hover:bg-gray-200"
            >
              <ChatPreview
                name={chat.name}
                id={chat.id}
                usersIds={chat.usersIds}
              />
            </div>
          ))}
      </div>
      <div className="border-t-[1px] border-gray-200 p-4">
        {user && <User name={user.name} email={user?.email} />}
      </div>
    </div>
  ) : (
    <div className="flex h-full min-w-96 flex-col border-r-[1px] border-gray-200 bg-white">
      <SidebarSkeleton />
    </div>
  );
};

export default Sidebar;
