'use client';
import React, { useState } from 'react';
import { MdSend } from 'react-icons/md';

const ChatRoom = () => {
  const [message, setMessage] = useState('');

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    // Code to send message goes here

    setMessage(''); // Clear input after sending
  };

  return (
    <div className="flex h-screen flex-col">
      {/* Chat Header */}
      <div className="w-full border-b-[1px] border-zinc-400 bg-zinc-950 p-6 text-center">
        <h2 className="text-2xl font-semibold text-zinc-200">
          [Username] Chat
        </h2>
      </div>
      {/* Chat Body */}
      <div className="flex-1 overflow-y-auto p-6">
        {/* Map through messages and render them */}
        {/* <MessageComponent /> */}
      </div>
      {/* Messaging Form */}
      <form
        className="flex items-center justify-between p-6"
        onSubmit={sendMessage}
      >
        <input
          type="text"
          placeholder="Type a message..."
          className="mr-4 flex-1 rounded-lg p-2 text-zinc-900"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit" className="rounded-full bg-blue-400 p-2">
          <MdSend size={22} />
        </button>
      </form>
    </div>
  );
};

export default ChatRoom;
