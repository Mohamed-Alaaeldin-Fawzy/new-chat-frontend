'use client';
import React from 'react';

const ChatRoom = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-full flex-col justify-center rounded-r-2xl bg-white align-middle">
      {children}
    </div>
  );
};

export default ChatRoom;
