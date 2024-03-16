import React from 'react';
import ChatHeader from './ChatHeader';

const ChatPlaceholder = () => {
  return (
    <div className="flex h-full w-full flex-col justify-center">
      <div className="lg:hidden">
        <ChatHeader />
      </div>
      <div className="grow self-center bg-white py-20">
        <p className="text-darkgray text-center">
          Select a chat to start a conversation
        </p>
      </div>
    </div>
  );
};

export default ChatPlaceholder;
