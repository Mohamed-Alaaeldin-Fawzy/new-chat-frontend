import React from 'react';
import Sidebar from './components/Sidebar';
import ChatRoom from './components/ChatRoom';
const Chat = () => {
  return (
    <div className="max-w-screen flex max-h-screen">
      <div className="w-3/12 2xl:w-2/12">
        <Sidebar />
      </div>
      <div className="w-9/12 2xl:w-10/12">
        <ChatRoom />
      </div>
    </div>
  );
};

export default Chat;
