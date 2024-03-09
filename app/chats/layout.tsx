'use client';
import React, { useState, useEffect } from 'react';
import Sidebar from '../components/sidebar/Sidebar';
import ChatRoom from '../components/chat/ChatRoom';
import { useIsSidebarOpen } from '@/context/IsSidebarOpen';
import { useAuth } from '@/context/AuthContext';
import ModalForm from '@/app/components/ModalForm';
import Form from '@/app/components/Form';
import UserCheckbox from '@/app/components/UserCheckbox';
import { getUsers } from '@/action/getUsers';
import { User as UserType } from '@/types';
import { createNewChat } from '@/action/createNewChat';

const ChatsLayout = ({ children }: { children?: React.ReactNode }) => {
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [users, setUsers] = useState<UserType[]>([]);
  const { user } = useAuth();
  const { isOpen } = useIsSidebarOpen();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeModal = () => setIsModalOpen(false);
  const [usersList, setUsersList] = useState<UserType[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const users = await getUsers();
        setUsers(users);
        setUsersList(
          users.filter((userItem: UserType) => userItem.id !== user!.id)
        );
      } catch (error) {
        console.error('Failed to fetch users:', error);
        // Handle error
      }
    };
    if (user?.id) {
      fetchUsers();
    }
  }, [user]);

  const handelAddChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // create chat name
    let chatName;
    const selectedUsersNames = users
      .filter((user) => selectedUsers.includes(user.id!))
      .map((user) => user.name);
    if (selectedUsersNames.length === 0) {
      return;
    } else if (selectedUsersNames.length === 1) {
      chatName = `private chat between ${selectedUsersNames.join(', ')} and ${user!.name}`;
    } else {
      chatName = `chat room with ${selectedUsersNames.join(',')} and ${user!.name}`;
    }
    //  @ts-ignore
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

  return (
    <div className="max-w-screen flex h-screen items-center justify-center bg-white align-middle">
      <ModalForm isOpen={isModalOpen} onClose={closeModal}>
        <h1 className="text-xl font-semibold">Please Select chat users </h1>
        <Form
          onSubmit={handelAddChatSubmit}
          buttonText="Create Chat"
          disabled={!(selectedUsers.length > 0)}
        >
          {usersList &&
            usersList.length > 0 &&
            usersList.map((user, index) => (
              <UserCheckbox
                onUserSelectChange={handleUserSelectChange}
                user={user}
                key={index}
              />
            ))}
        </Form>
      </ModalForm>
      <div className="flex h-full w-full">
        <div
          className={`fixed flex lg:static lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'} inset-0 flex-shrink-0 transition-transform duration-300`}
        >
          <Sidebar
            setIsModalOpen={setIsModalOpen}
            selectedUsers={selectedUsers}
          />
        </div>
        <div className="flex h-full w-full flex-col">
          <ChatRoom>{children || ''}</ChatRoom>
        </div>
      </div>
    </div>
  );
};

export default ChatsLayout;
