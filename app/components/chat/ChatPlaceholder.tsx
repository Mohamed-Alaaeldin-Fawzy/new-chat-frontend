import React from 'react';
import ChatHeader from './ChatHeader';

const ChatPlaceholder = () => {
  return (
    <div className="flex h-full w-full flex-col justify-center">
      <div className="lg:hidden">
        <ChatHeader />
      </div>
      <div className="grow self-center bg-white py-20">
        <svg width="300px" height="200px" xmlns="http://www.w3.org/2000/svg">
          <rect
            x="20"
            y="50"
            width="260"
            height="100"
            rx="15"
            ry="15"
            fill="none"
            stroke="gray"
            strokeWidth="2"
          />

          <circle
            cx="150"
            cy="30"
            r="20"
            fill="white"
            stroke="gray"
            strokeWidth="2"
          />

          <path
            d="M 125,75 Q 150,28 175,75"
            fill="none"
            stroke="gray"
            strokeWidth="2"
          />

          <text
            x="150"
            y="120"
            fontFamily="Arial, sans-serif"
            fontSize="12"
            textAnchor="middle"
            fill="darkgray"
          >
            Select a chat to start a conversation
          </text>

          {/* Modified rectangle to look like an envelope */}
          <rect
            x="110"
            y="140"
            width="80"
            height="40"
            rx="5"
            ry="5"
            fill="white"
            stroke="gray"
            strokeWidth="2"
          />

          {/* Lines inside the envelope to signify text, adjusted for the new envelope shape */}
          <line
            x1="120"
            y1="155"
            x2="180"
            y2="155"
            stroke="gray"
            strokeWidth="1"
          />
          <line
            x1="120"
            y1="165"
            x2="180"
            y2="165"
            stroke="gray"
            strokeWidth="1"
          />
        </svg>
      </div>
    </div>
  );
};

export default ChatPlaceholder;
