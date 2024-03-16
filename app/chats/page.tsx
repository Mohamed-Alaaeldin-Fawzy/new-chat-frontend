'use client';
import React, { useState, useEffect, useRef } from 'react';
import { useCurrentChat } from '@/context/ChatContext';
import { sendMessage } from '@/action/sendMessage';
import { useAuth } from '@/context/AuthContext';
import { getMessagesByChatId } from '@/action/getMessagesByChatId';
import ChatHeader from '@/app/components/chat/ChatHeader';
import ChatBody from '@/app/components/chat/ChatBody';
import ChatForm from '@/app/components/chat/ChatForm';
import ChatPlaceholder from '../components/chat/ChatPlaceholder';
import { io, Socket } from 'socket.io-client';
import { v4 as uuidv4 } from 'uuid';
import { useGetUsers } from '@/context/UsersContext';

const UserChat = () => {
  const { chat } = useCurrentChat();
  const [messageBody, setMessageBody] = useState('');
  const [chatMessages, setChatMessages] = useState<any[]>([]);
  const { user } = useAuth();
  const { users } = useGetUsers();
  const socketRef = useRef<Socket<any> | null>(null);

  if (!socketRef.current) {
    socketRef.current = io(process.env.NEXT_PUBLIC_API_URL!);
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!messageBody.trim()) return;

    const messageObject = {
      chatId: chat?.id,
      senderId: user?.id,
      body: messageBody,
    };

    socketRef.current?.emit('sendMessage', { messageObject });

    // @ts-ignore
    sendMessage(messageObject);
    setMessageBody('');
  };

  useEffect(() => {
    const fetchMessages = async () => {
      const messages = await getMessagesByChatId(chat?.id!);
      setChatMessages(messages);
    };

    if (chat?.id) {
      fetchMessages();
    }
  }, [chat?.id]);

  useEffect(() => {
    const socket = io(process.env.NEXT_PUBLIC_API_URL!);

    socket.emit('joinChat', chat?.id);

    socket.on('messageReceived', (data) => {
      setChatMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      socket.off('messageReceived');
    };
  }, [chat]);

  return chat ? (
    <div className="flex h-full w-full flex-col">
      <ChatHeader chat={chat} users={users} />
      <div className="flex grow flex-col justify-end overflow-y-auto bg-white p-6">
        {chatMessages.map((message: any) => (
          <ChatBody
            message={message}
            key={message.id || uuidv4()}
            userId={user?.id!}
          />
        ))}
      </div>
      <ChatForm
        onSubmit={handleSubmit}
        messageBody={messageBody}
        onChange={(e) => setMessageBody(e.target.value)}
      />
    </div>
  ) : (
    <div className="flex h-full w-full items-center justify-center">
      <ChatPlaceholder />
    </div>
  );
};

export default UserChat;
