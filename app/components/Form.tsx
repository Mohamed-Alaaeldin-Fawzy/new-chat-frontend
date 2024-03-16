import React from 'react';
import Button from './Button';
import Input from './Input';

interface FormProps {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  children: React.ReactNode;
  buttonText?: string;
  disabled?: boolean;
  isLoading?: boolean;
  input?: { label: string; value: string; required: boolean };
  handleInputChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Form = ({
  onSubmit,
  children,
  buttonText,
  disabled,
  isLoading,
  input,
  handleInputChange,
}: FormProps) => {
  return (
    <form className="flex h-[95%] flex-col space-y-6" onSubmit={onSubmit}>
      {input && handleInputChange && (
        <Input
          id={input.label}
          label={input.label}
          type="text"
          required={input.required}
          value={input.value}
          onChange={handleInputChange}
        />
      )}
      {children}
      <Button
        type="submit"
        fullWidth
        disabled={disabled}
        isLoading={isLoading}
        colorClass="bg-blue-500 hover:bg-blue-600"
      >
        {buttonText || 'Submit'}
      </Button>
    </form>
  );
};

export default Form;
