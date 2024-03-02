'use client';
import React, { useState, useEffect } from 'react';
import User from '../User';
import { useAuth } from '@/context/AuthContext';
import { getUsers } from '@/action/getUsers';
import { getUserChats } from '@/action/getUserChats';
import { User as UserType, Chat as ChatType } from '@/types';
import SideBarHeader from './SidebarHeader';
import ChatPreview from '../chat/ChatPreview';
import SidebarSkeleton from './SidebarSkeleton';
import { createNewChat } from '@/action/createNewChat';

const Sidebar = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState<UserType[]>([]);
  const [userChats, setUserChats] = useState<ChatType[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const { setToken } = useAuth();

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
  }, [user]);

  useEffect(() => {
    const fetchUserChats = async () => {
      try {
        const userChats = await getUserChats();
        setUserChats(userChats);
      } catch (error) {
        console.error('Failed to fetch user chats:', error);
        // Handle error (e.g., set an error state, show a message, etc.)
      }
    };
    if (user?.id) {
      fetchUserChats();
    }
  }, [user, selectedUsers]);

  const handelAddChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // create chat name
    const selectedUsersNames = users
      .filter((user) => selectedUsers.includes(user.id!))
      .map((user) => user.name);
    const chatName = selectedUsersNames.join(', ');
    // @ts-ignore
    await createNewChat([...selectedUsers, user.id], chatName);
    setSelectedUsers([]);
    closeModal();
  };

  const handleUserSelectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedUserId = e.target.value;
    const isSelected = e.target.checked;

    setSelectedUsers((prevSelectedUsers) => {
      if (isSelected) {
        return [...prevSelectedUsers, selectedUserId];
      } else {
        return prevSelectedUsers.filter((id) => id !== selectedUserId);
      }
    });
  };

  const handleLogoutChange = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  return user ? (
    <div className="flex h-full flex-col rounded-2xl border-r-[1px] border-gray-200 bg-white lg:rounded-r-none">
      <SideBarHeader
        users={users}
        currentUser={user!}
        onSubmit={handelAddChatSubmit}
        onUserSelectChange={handleUserSelectChange}
        selectedUsers={selectedUsers}
        handleLogoutChange={handleLogoutChange}
        openModal={openModal}
        closeModal={closeModal}
        isModalOpen={isModalOpen}
      />
      <div className="grow overflow-y-auto scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-900">
        {userChats &&
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
    <div className="flex h-full min-w-[21.8rem] flex-col rounded-2xl border-r-[1px] border-gray-200 bg-white lg:rounded-r-none">
      <SidebarSkeleton />
    </div>
  );
};

export default Sidebar;
