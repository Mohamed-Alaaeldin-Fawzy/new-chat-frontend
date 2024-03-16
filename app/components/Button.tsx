import React from 'react';
import cls from 'classnames';
import { FaSpinner } from 'react-icons/fa6';

interface ButtonProps {
  type?: 'button' | 'submit' | 'reset';
  fullWidth?: boolean;
  children?: React.ReactNode;
  onClick?: () => void;
  colorClass?: string;
  disabled?: boolean;
  isLoading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  type = 'button',
  fullWidth = false,
  children,
  onClick,
  colorClass = '',
  disabled = false,
  isLoading = false,
}) => {
  const buttonClass = cls(
    'flex justify-center rounded-md px-3 py-2 text-sm font-semibold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
    { 'cursor-not-allowed opacity-50': disabled },
    { 'w-full': fullWidth },
    colorClass
  );

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      type={type}
      className={buttonClass}
    >
      {isLoading ? (
        <>
          <FaSpinner className="animate-spin" />
          <span className="sr-only">Loading...</span>
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
