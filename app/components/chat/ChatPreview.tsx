import React from 'react';
import { FaRegMessage } from 'react-icons/fa6';
import { useCurrentChat } from '@/context/ChatContext';
import { useIsSidebarOpen } from '@/context/IsSidebarOpen';
import { useAuth } from '@/context/AuthContext';
import { useGetUsers } from '@/context/UsersContext';

interface ChatPreviewProps {
  name: string;
  id: string;
  usersIds: string[];
  subText?: string;
}

const ChatPreview = ({ name, id, usersIds, subText }: ChatPreviewProps) => {
  const { setChat } = useCurrentChat();
  const { setIsOpen } = useIsSidebarOpen();
  const { user } = useAuth();
  const { users } = useGetUsers();
  const handleClick = () => {
    setChat({
      id,
      name,
      usersIds,
    });
    setIsOpen(false);
  };

  const getUserNames = () =>
    users &&
    users
      .filter((user) => usersIds.includes(user.id))
      .map((user) => user.name)
      .join(', ');

  const getOtherUserName = () => {
    if (!users || !usersIds) return '';

    const otherUserIds = usersIds.filter((userId) => userId !== user!.id);
    const otherUserNames = otherUserIds.map((userId) => {
      const otherUser = users.find((user) => user.id === userId);
      return otherUser ? otherUser.name : '';
    });

    return otherUserNames.join(', ');
  };

  return (
    <div
      className="flex w-full items-start justify-start p-4"
      onClick={handleClick}
    >
      <div className="mr-4 rounded-full bg-gray-200 p-4">
        <FaRegMessage size={22} />
      </div>
      <div>
        <h3 className="text-lg font-semibold">{name || getOtherUserName()}</h3>
        {/* in the future we will pass the last message in the chat */}
        <p className="text-sm">{subText || getUserNames()}</p>
      </div>
    </div>
  );
};

export default ChatPreview;
