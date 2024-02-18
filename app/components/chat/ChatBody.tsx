import React from 'react';

interface ChatBodyProps {
  message: any;
  userId: string;
}

const ChatBody = ({ message, userId }: ChatBodyProps) => {
  return (
    <div
      key={message.id}
      className={`flex ${message.senderId === userId ? 'justify-end' : 'justify-start'}`}
    >
      <p
        className={`${message.senderId === userId ? 'rounded-br-none bg-blue-500 text-white' : 'rounded-bl-none bg-gray-300 text-gray-900'} my-2 inline-block rounded-3xl px-6 py-2`}
      >
        {message.body}
      </p>
    </div>
  );
};

export default ChatBody;
