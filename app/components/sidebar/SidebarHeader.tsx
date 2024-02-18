'use client';
import React, { useState, useEffect } from 'react';
import { FaPlus, FaXmark } from 'react-icons/fa6';
import Tooltip from '../ToolTip';
import ModalForm from '../ModalForm';
import Form from '../Form';
import { User as UserType } from '@/types';
import { createNewChat } from '@/action/createNewChat';
import UserCheckbox from '../UserCheckbox';
import Searchbar from './Searchbar';
import { FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '@/context/AuthContext';
import { useIsSidebarOpen } from '@/context/IsSidebarOpen';

interface SidebarHeaderProps {
  users: UserType[];
  currentUser: UserType;
}

const SidebarHeader = ({ users, currentUser }: SidebarHeaderProps) => {
  const { setIsOpen } = useIsSidebarOpen();
  const { setToken, token } = useAuth();

  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [usersList, setUsersList] = useState<UserType[]>([]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    setUsersList(users.filter((user) => user.id !== currentUser.id));
  }, [users, currentUser]);

  const handleUserSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
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
  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // create chat name
    const selectedUsersNames = users
      .filter((user) => selectedUsers.includes(user.id!))
      .map((user) => user.name);
    const chatName = selectedUsersNames.join(', ');
    // @ts-ignore
    await createNewChat([...selectedUsers, currentUser.id], chatName);
    console.log(selectedUsers);
    setSelectedUsers([]);
    closeModal();
  };
  return (
    <div className="flex w-full justify-center border-b-[1px] border-gray-200 p-4">
      <Tooltip text="close sidebar">
        <button
          className="mr-4 rotate-180 rounded-lg border border-gray-300 bg-gray-200 p-2 text-gray-700 md:hidden"
          onClick={() => setIsOpen(false)}
        >
          <FaXmark size={24} />
        </button>
      </Tooltip>
      <Tooltip text="Logout">
        <button
          className="mr-4 rotate-180 rounded-lg border border-gray-300 bg-gray-200 p-2 text-gray-700"
          onClick={handleLogout}
        >
          <FaSignOutAlt size={24} />
        </button>
      </Tooltip>
      <Tooltip text="Add Chat">
        <button
          onClick={openModal}
          className="mr-4 rounded-lg border border-gray-300 bg-gray-200 p-2 text-gray-700"
        >
          <FaPlus size={24} />
        </button>
      </Tooltip>
      <ModalForm isOpen={isModalOpen} onClose={closeModal}>
        <h1 className="text-xl font-semibold">Please Select chat users </h1>
        <Form
          onSubmit={handleSubmit}
          buttonText="Create Chat"
          disabled={!(selectedUsers.length > 0)}
        >
          {usersList &&
            usersList.length > 0 &&
            usersList.map((user, index) => (
              <UserCheckbox
                onUserSelectChange={handleUserSelection}
                user={user}
                key={index}
              />
            ))}
        </Form>
      </ModalForm>
      <Searchbar
        value={searchTerm}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setSearchTerm(e.target.value)
        }
      />
    </div>
  );
};

export default SidebarHeader;
