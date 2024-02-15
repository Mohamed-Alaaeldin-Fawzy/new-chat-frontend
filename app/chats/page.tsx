import React from 'react';
import Sidebar from '../components/Sidebar';
import ChatRoom from '../components/ChatRoom';
import emptyImg from '@/public/no-chat.png';
import Image from 'next/image';

const Chat = () => {
  return (
    <div className="max-w-screen flex h-screen items-center justify-center bg-tertiary align-middle ">
      <div className="container mx-auto flex h-max rounded-2xl shadow-md">
        <div className="w-full md:w-4/12 2xl:w-3/12">
          <Sidebar />
        </div>
        <div className="hidden md:block md:w-8/12 2xl:w-9/12">
          <ChatRoom>
            <Image
              src={emptyImg}
              alt="no chat selected image"
              className="mx-auto mb-4"
              width={150}
            />
            <h1 className="text-center text-2xl">
              Please select a chat to start conversation{' '}
            </h1>
          </ChatRoom>
        </div>
      </div>
    </div>
  );
};

export default Chat;
