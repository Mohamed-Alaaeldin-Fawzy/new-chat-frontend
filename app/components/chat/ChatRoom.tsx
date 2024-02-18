'use client';
import React from 'react';

const ChatRoom = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-full w-full flex-col justify-center rounded-2xl bg-white align-middle md:rounded-l-none">
      {children}
    </div>
  );
};

export default ChatRoom;
