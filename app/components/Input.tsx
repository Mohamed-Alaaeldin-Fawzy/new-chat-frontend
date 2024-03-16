import React from 'react';
import cls from 'classnames';

interface InputProps {
  id: string;
  label: string;
  type?: string;
  required?: boolean;
  disabled?: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  type = 'text',
  disabled = false,
  onChange,
  value,
  required = false,
}) => {
  const inputClass = cls(
    'form-input block w-full rounded-md px-4 py-1.5 text-gray-900 shadow-sm sm:text-sm sm:leading-6',
    'focus:ring-[1px] focus:ring-blue-500',
    'ring-1 ring-inset ring-gray-300 placeholder:text-gray-400',
    {
      'cursor-default opacity-50': disabled,
    }
  );

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium leading-6">
        {label}
      </label>
      <div className="mt-2">
        <input
          type={type}
          id={id}
          required={required}
          disabled={disabled}
          value={value}
          onChange={onChange}
          className={inputClass}
          autoComplete="off"
        />
      </div>
    </div>
  );
};

export default Input;
