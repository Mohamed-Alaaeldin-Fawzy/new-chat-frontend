'use client';
import React from 'react';
import Sidebar from '../components/sidebar/Sidebar';
import ChatRoom from '../components/chat/ChatRoom';
import { useIsSidebarOpen } from '@/context/IsSidebarOpen';

const ChatsLayout = ({ children }: { children?: React.ReactNode }) => {
  const { isOpen } = useIsSidebarOpen();
  return (
    <div className="max-w-screen flex h-screen items-center justify-center bg-white align-middle">
      <div className="flex h-full w-full shadow-md">
        <div
          className={`fixed flex lg:static lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'} inset-0 flex-shrink-0 transition-transform duration-300`}
        >
          <Sidebar />
        </div>
        <div className="flex h-full w-full flex-col">
          <ChatRoom>{children || ''}</ChatRoom>
        </div>
      </div>
    </div>
  );
};

export default ChatsLayout;
