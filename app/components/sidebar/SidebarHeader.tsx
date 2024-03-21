import React, { useState } from 'react';
import { FaPlus, FaXmark } from 'react-icons/fa6';
import { FaSignOutAlt } from 'react-icons/fa';
import Tooltip from '../ToolTip';
import { Chat as ChatType } from '@/types';
import Searchbar from './Searchbar';
import { useIsSidebarOpen } from '@/context/IsSidebarOpen';

interface SidebarHeaderProps {
  handleLogoutChange: () => void;
  openModal: () => void;
  originalUserChats: ChatType[];
  setUserChats: React.Dispatch<React.SetStateAction<ChatType[]>>;
}

const SidebarHeader = ({
  handleLogoutChange,
  openModal,
  originalUserChats,
  setUserChats,
}: SidebarHeaderProps) => {
  const { setIsOpen } = useIsSidebarOpen();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    setUserChats(
      value
        ? originalUserChats.filter(
            (chat) =>
              chat.name && chat.name.toLowerCase().includes(value.toLowerCase())
          )
        : originalUserChats
    );
  };

  return (
    <div className="flex w-full justify-center border-b-[1px] border-gray-200 p-[1.20rem]">
      <Tooltip text="close sidebar">
        <button
          className="mr-4 rotate-180 rounded-lg border border-gray-300 bg-gray-200 p-2 text-gray-700 lg:hidden"
          onClick={() => setIsOpen(false)}
        >
          <FaXmark size={24} />
        </button>
      </Tooltip>
      <Tooltip text="Logout">
        <button
          className="mr-4 rotate-180 rounded-lg border border-gray-300 bg-gray-200 p-2 text-gray-700"
          onClick={handleLogoutChange}
        >
          <FaSignOutAlt size={24} />
        </button>
      </Tooltip>
      <Tooltip text="Add Chat">
        <button
          className="mr-4 rounded-lg border border-gray-300 bg-gray-200 p-2 text-gray-700"
          onClick={openModal}
        >
          <FaPlus size={24} />
        </button>
      </Tooltip>
      <Searchbar value={searchTerm} onChange={handleSearchChange} />
    </div>
  );
};

export default SidebarHeader;
