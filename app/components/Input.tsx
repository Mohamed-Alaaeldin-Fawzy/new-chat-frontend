'use client';
import React from 'react';

interface InputProps {
  id: string;
  label: string;
  type?: string;
  required?: boolean;
  disabled?: boolean;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const Input: React.FC<InputProps> = ({
  id,
  label,
  type,
  required,
  disabled,
  onChange,
  value,
}) => {
  return (
    <div>
      <label
        className="
    block
    text-sm
    font-medium
    leading-6
    text-gray-100
    "
        htmlFor={id}
      >
        {label}
      </label>
      <div
        className=" 
      mt-2
      "
      >
        <input
          value={value}
          id={id}
          type={type}
          autoComplete="off"
          disabled={disabled}
          className={`
          form-input
          block
          w-full
          rounded-md
          border-0
          py-1.5
          text-gray-900
          shadow-sm
          ring-1
          ring-inset
          ring-gray-300
          placeholder:text-gray-400
          focus:ring-2
          focus:ring-inset
          focus:ring-blue-500
          sm:text-sm
          sm:leading-6
          ${disabled && 'cursor-default opacity-50'}
          `}
          onChange={onChange}
        ></input>
      </div>
    </div>
  );
};

export default Input;
