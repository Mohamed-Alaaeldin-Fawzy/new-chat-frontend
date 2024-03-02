import React from 'react';
import { FaRegMessage } from 'react-icons/fa6';
import { useCurrentChat } from '@/context/ChatContext';
import { useIsSidebarOpen } from '@/context/IsSidebarOpen';

interface ChatPreviewProps {
  name: string;
  id: string;
  usersIds: string[];
}

const ChatPreview = ({ name, id, usersIds }: ChatPreviewProps) => {
  const { setChat } = useCurrentChat();
  const { setIsOpen } = useIsSidebarOpen();

  const handleClick = () => {
    setChat({
      id,
      name,
      usersIds,
    });
    setIsOpen(false);
  };

  return (
    <div
      className={`flex w-full cursor-pointer items-start justify-start p-4`}
      onClick={handleClick}
    >
      <div className="mr-4 rounded-full bg-gray-200 p-4">
        <FaRegMessage size={25} />
      </div>
      <div>
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="text-sm">tap to chat</p>
      </div>
    </div>
  );
};

export default ChatPreview;
