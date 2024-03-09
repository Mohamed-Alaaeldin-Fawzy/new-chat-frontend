'use client';
import React, { useState, useEffect } from 'react';
import { FaPlus, FaXmark } from 'react-icons/fa6';
import Tooltip from '../ToolTip';
import ModalForm from '../ModalForm';
import Form from '../Form';
import { User as UserType } from '@/types';
import UserCheckbox from '../UserCheckbox';
import Searchbar from './Searchbar';
import { FaSignOutAlt } from 'react-icons/fa';
import { useIsSidebarOpen } from '@/context/IsSidebarOpen';

interface SidebarHeaderProps {
  handleLogoutChange: () => void;
  openModal: () => void;
}

const SidebarHeader = ({
  handleLogoutChange,
  openModal,
}: SidebarHeaderProps) => {
  const { setIsOpen } = useIsSidebarOpen();

  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="flex w-full justify-center border-b-[1px] border-gray-200 p-4">
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
          onClick={openModal}
          className="mr-4 rounded-lg border border-gray-300 bg-gray-200 p-2 text-gray-700"
        >
          <FaPlus size={24} />
        </button>
      </Tooltip>
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
