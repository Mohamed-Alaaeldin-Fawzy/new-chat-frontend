import React from 'react';
import { useCurrentChat } from '@/context/ChatContext';
import { useIsSidebarOpen } from '@/context/IsSidebarOpen';
import { useAuth } from '@/context/AuthContext';
import { useGetUsers } from '@/context/UsersContext';
import GroupChatAvatar from '../GroupChatAvatar';
import { useSocket } from '@/context/SocketContext';

interface ChatPreviewProps {
  name: string;
  id: string;
  usersIds: string[];
  subText?: string;
}

const ChatPreview: React.FC<ChatPreviewProps> = ({
  name,
  id,
  usersIds,
  subText,
}) => {
  const { onlineUsers } = useSocket();
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

  const renderUserNames = () => {
    const chatUsers = getChatUsers();
    return chatUsers.map((chatUser, index) => (
      <React.Fragment key={chatUser.id}>
        {onlineUsers.includes(chatUser.id) && (
          <span className="mr-1 inline-block h-2 w-2 rounded-full bg-green-500"></span>
        )}
        {chatUser.name}
        {index < chatUsers.length - 1 && ', '}
      </React.Fragment>
    ));
  };

  const getOtherUserName = () => {
    if (!users || !usersIds) return '';

    const otherUserIds = usersIds.filter((userId) => userId !== user!.id);
    const otherUserNames = otherUserIds.map((userId) => {
      const otherUser = users.find((user) => user.id === userId);
      return otherUser ? otherUser.name : '';
    });

    return otherUserNames.join(', ');
  };

  const getChatUsers = () => {
    if (!users) return [];
    if (usersIds.length === 2) {
      return users
        .filter(
          (newUser) =>
            usersIds.includes(newUser?.id) && user!.id !== newUser?.id
        )
        .map((user) => ({ image: user.image, id: user.id, name: user.name }));
    }
    return users
      .filter((user) => usersIds.includes(user.id))
      .map((user) => ({ image: user.image, id: user.id, name: user.name }));
  };

  return (
    <div
      className="flex w-full items-center justify-start space-x-4 p-4"
      onClick={handleClick}
    >
      {/* @ts-ignore */}
      <GroupChatAvatar chatUsers={getChatUsers()} onlineUserIds={onlineUsers} />

      <div>
        <h3 className="text-lg font-semibold">{name || getOtherUserName()}</h3>
        {/* in the future we will pass the last message in the chat */}
        <p className="text-sm">{subText || renderUserNames()}</p>
      </div>
    </div>
  );
};

export default ChatPreview;
