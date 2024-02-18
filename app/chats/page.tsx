'use client';
import React, { useState, useEffect } from 'react';
import { useCurrentChat } from '@/context/ChatContext';
import { sendMessage } from '@/action/sendMessage';
import { useAuth } from '@/context/AuthContext';
import { getMessagesByChatId } from '@/action/getMessagesByChatId';
import ChatHeader from '@/app/components/chat/ChatHeader';
import ChatBody from '@/app/components/chat/ChatBody';
import ChatForm from '@/app/components/chat/ChatForm';
import ChatPlaceholder from '../components/chat/ChatPlaceholder';

const UserChat = () => {
  const { chat } = useCurrentChat();
  const [messageBody, setMessageBody] = useState('');
  const [chatMessages, setChatMessages] = useState<any[]>([]);
  const { user } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!messageBody.trim()) return;

    const messageObject = {
      chatId: chat?.id,
      senderId: user?.id,
      body: messageBody,
    };

    setChatMessages([...chatMessages, messageObject]);
    sendMessage(messageObject);
    setMessageBody(''); // Clear input after sending
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

  return chat ? (
    <div className="flex h-full w-full flex-col">
      {/* @ts-ignore */}
      <ChatHeader chat={chat} />
      <div className="flex grow flex-col justify-end overflow-y-auto bg-white p-6">
        {chatMessages.map((message: any) => (
          <ChatBody message={message} key={message.id} userId={user?.id!} />
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
