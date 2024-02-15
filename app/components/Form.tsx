// components/Form.jsx or Form.tsx if using TypeScript
import React from 'react';
import Button from './Button';

interface FormProps {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  children: React.ReactNode;
  buttonText?: string;
  disabled?: boolean;
  isLoading?: boolean;
}

const Form = ({
  onSubmit,
  children,
  buttonText,
  disabled,
  isLoading,
}: FormProps) => {
  return (
    <form className="space-y-6" onSubmit={onSubmit}>
      {children}
      <Button fullWidth disabled={disabled} isLoading={isLoading}>
        {buttonText || 'Submit'}
      </Button>
    </form>
  );
};

export default Form;
