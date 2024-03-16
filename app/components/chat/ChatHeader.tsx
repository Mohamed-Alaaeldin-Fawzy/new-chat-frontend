import React from 'react';
import { FaAlignJustify } from 'react-icons/fa6';
import ChatPreview from './ChatPreview';
import { Chat, User } from '@/types';
import { useIsSidebarOpen } from '@/context/IsSidebarOpen';
import cls from 'classnames';

interface ChatHeaderProps {
  chat?: Chat;
  users?: User[];
}

const ChatHeader = ({ chat, users }: ChatHeaderProps) => {
  const { setIsOpen } = useIsSidebarOpen();

  const commonClasses = cls(
    'flex',
    'h-auto',
    'w-full',
    'items-center',
    'justify-start',
    'rounded-t-2xl',
    'border-b-[1px]',
    'border-secondary',
    'bg-white',
    'px-4',
    'lg:rounded-tl-none'
  );

  return (
    <div className={commonClasses}>
      <button
        className="mr-4 block cursor-pointer py-4 text-xl lg:hidden"
        onClick={() => setIsOpen(true)}
      >
        <FaAlignJustify size={30} />
      </button>
      {chat && (
        <ChatPreview name={chat.name} id={chat.id} usersIds={chat.usersIds} />
      )}
    </div>
  );
};

export default ChatHeader;
