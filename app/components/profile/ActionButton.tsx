import React from 'react';
import cls from 'classnames';

interface ActionButtonProps {
  onClick: () => void;
  text: string;
}

const ActionButton: React.FC<ActionButtonProps> = ({ onClick, text }) => {
  return (
    <button
      onClick={onClick}
      className={cls(
        'mt-3 w-full rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600'
      )}
    >
      {text}
    </button>
  );
};

export default ActionButton;
