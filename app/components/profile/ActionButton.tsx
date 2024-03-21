import React from 'react';

interface ActionButtonProps {
  onClick: () => void;
  text: string;
}

const ActionButton: React.FC<ActionButtonProps> = ({ onClick, text }) => {
  return (
    <button
      onClick={onClick}
      className="mt-3 w-full rounded-lg bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"
    >
      {text}
    </button>
  );
};

export default ActionButton;
