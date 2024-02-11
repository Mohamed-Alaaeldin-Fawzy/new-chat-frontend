'use client';

import React from 'react';

import { FaSpinner } from 'react-icons/fa6';

interface ButtonProps {
  type?: 'button' | 'submit' | 'reset' | undefined;
  fullWidth?: boolean;
  children?: React.ReactNode;
  onClick?: () => void;
  secondary?: boolean;
  danger?: boolean;
  disabled?: boolean;
}
const Button: React.FC<ButtonProps> = ({
  type,
  fullWidth,
  children,
  onClick,
  secondary,
  danger,
  disabled,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      type={type}
      className={`
            flex
            justify-center
            rounded-md
            px-3
            py-2
            text-sm
            font-semibold
            focus-visible:outline
            focus-visible:outline-2
            focus-visible:outline-offset-2
            ${disabled && 'cursor-not-allowed opacity-50'},
            ${fullWidth && 'w-full'}
            ${secondary ? 'text-gray-900' : 'text-white'},
            ${
              danger &&
              'bg-rose-500 hover:bg-rose-600 focus-visible:outline-rose-600'
            }
              ${
                !secondary &&
                !danger &&
                'bg-blue-600 hover:bg-blue-500 focus-visible:outline-blue-600'
              }
            `}
    >
      {children}
      {disabled && <FaSpinner className="ml-2 mt-1 animate-spin" />}
    </button>
  );
};

export default Button;
