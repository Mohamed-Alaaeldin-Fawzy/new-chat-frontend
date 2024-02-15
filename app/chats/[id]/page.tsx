'use client';
import React, { useState, useEffect } from 'react';
import Chat from '../../components/Chat';
import { useCurrentChat } from '@/context/ChatContext';
import { MdSend } from 'react-icons/md';
import { sendMessage } from '@/action/sendMessage';
import { useAuth } from '@/context/AuthContext';
import { getMessagesByChatId } from '@/action/getMessagesByChatId';

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

  return (
    <>
      <div className=" flex w-full justify-start rounded-tr-2xl border-b-[1px] border-secondary bg-white p-6">
        {chat && (
          <Chat name={chat.name} id={chat.id} usersIds={chat.usersIds} />
        )}
      </div>
      {/* Chat Body */}
      <div className="h-full flex-1 overflow-y-auto bg-white p-6">
        {chatMessages.map((message: any) => (
          <div
            key={message.id}
            className={`flex ${message.senderId === user?.id ? 'justify-end' : 'justify-start'}`}
          >
            <p
              className={`${message.senderId === user?.id ? 'rounded-br-none bg-blue-500 text-white' : 'rounded-bl-none bg-gray-300 text-gray-900'} my-2 inline-block rounded-3xl px-6 py-2`}
            >
              {message.body}
            </p>
          </div>
        ))}
      </div>
      {/* Messaging Form */}
      <form
        className="flex items-center justify-between rounded-br-2xl bg-white p-6"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          placeholder="Type a message..."
          className="flex-1 rounded-l-lg border border-r-0 border-gray-300 p-2"
          value={messageBody}
          onChange={(e) => setMessageBody(e.target.value)}
        />
        <button
          type="submit"
          className="rounded-r-lg border border-gray-300 bg-gray-300 p-2 text-gray-700"
        >
          <MdSend size={24} />
        </button>
      </form>
    </>
  );
};

export default UserChat;
