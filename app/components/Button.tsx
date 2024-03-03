'use client';
import React from 'react';
import { FaSpinner } from 'react-icons/fa6';

interface ButtonProps {
  type?: 'button' | 'submit' | 'reset' | undefined;
  fullWidth?: boolean;
  children?: React.ReactNode;
  onClick?: () => void;
  colorClass?: string;
  disabled?: boolean;
  isLoading?: boolean;
}
const Button: React.FC<ButtonProps> = ({
  type,
  fullWidth,
  children,
  onClick,
  colorClass,
  disabled,
  isLoading,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      type={type}
      className={`flex justify-center rounded-md px-3 py-2 text-sm font-semibold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${disabled && 'cursor-not-allowed opacity-50'} ${fullWidth && 'w-full'} ${colorClass || ''}`}
    >
      {children}
      {isLoading && <FaSpinner className="ml-2 mt-1 animate-spin" />}
    </button>
  );
};

export default Button;
