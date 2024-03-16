import React from 'react';
import cls from 'classnames';

interface ChatBodyProps {
  message: {
    id: string;
    senderId: string;
    body: string;
  };
  userId: string;
}

const ChatBody = ({ message, userId }: ChatBodyProps) => {
  const isUserMessage = message.senderId === userId;

  const containerClasses = cls({
    'flex justify-end': isUserMessage,
    'flex justify-start': !isUserMessage,
  });

  const messageClasses = cls({
    'my-2 inline-block rounded-3xl px-6 py-2': true,
    'rounded-br-none bg-blue-500 text-white': isUserMessage,
    'rounded-bl-none bg-gray-300 text-gray-900': !isUserMessage,
  });

  return (
    <div key={message.id} className={containerClasses}>
      <p className={messageClasses}>{message.body}</p>
    </div>
  );
};

export default ChatBody;
