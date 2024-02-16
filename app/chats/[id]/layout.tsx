import React from 'react';
import Sidebar from '../../components/Sidebar';
import ChatRoom from '../../components/ChatRoom';

const ChatsLayout = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div className="max-w-screen flex h-screen items-center justify-center bg-tertiary align-middle ">
      <div className="container mx-auto flex h-max rounded-2xl shadow-md">
        <div className="hidden w-4/12 md:block 2xl:w-3/12">
          <Sidebar />
        </div>
        <div className="w-full md:w-8/12 2xl:w-9/12">
          <ChatRoom>{children || ''}</ChatRoom>
        </div>
      </div>
    </div>
  );
};

export default ChatsLayout;
