import React from 'react';
import { MdSend } from 'react-icons/md';

interface ChatFormProps {
  onSubmit: (e: React.FormEvent) => void;
  messageBody: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ChatForm = ({ onSubmit, messageBody, onChange }: ChatFormProps) => {
  return (
    <form
      onSubmit={onSubmit}
      className="flex max-w-full items-center justify-between bg-white p-6"
    >
      <input
        type="text"
        placeholder="Type a message..."
        className="grow rounded-l-lg border border-r-0 border-gray-300 p-2 outline-none"
        value={messageBody}
        onChange={onChange}
      />
      <button
        type="submit"
        className="rounded-r-lg border border-gray-300 bg-gray-300 p-2 text-gray-700"
      >
        <MdSend size={24} />
      </button>
    </form>
  );
};

export default ChatForm;
