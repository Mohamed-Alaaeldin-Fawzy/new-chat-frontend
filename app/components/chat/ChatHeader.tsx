'use client';
import React, { useState } from 'react';
import { FaAlignJustify } from 'react-icons/fa6';
import ChatPreview from './ChatPreview';
import { Chat } from '@/types';
import { useIsSidebarOpen } from '@/context/IsSidebarOpen';

interface ChatHeaderProps {
  chat?: Chat;
}

const ChatHeader = ({ chat }: ChatHeaderProps) => {
  const { setIsOpen } = useIsSidebarOpen();
  return chat ? (
    <div className="flex h-auto w-full items-center justify-start rounded-t-2xl border-b-[1px] border-secondary bg-white p-4 md:rounded-tl-none">
      <button
        className="mr-4 block cursor-pointer text-xl md:hidden"
        onClick={() => setIsOpen(true)}
      >
        <FaAlignJustify size={30} />
      </button>
      <ChatPreview name={chat.name} id={chat.id} usersIds={chat.usersIds} />
    </div>
  ) : (
    <div className="flex h-auto w-full items-center justify-start rounded-t-2xl border-b-[1px] border-secondary bg-white p-4 md:rounded-tl-none">
      <button
        className="mr-4 block cursor-pointer text-xl md:hidden"
        onClick={() => setIsOpen(true)}
      >
        <FaAlignJustify size={30} />
      </button>
    </div>
  );
};

export default ChatHeader;
