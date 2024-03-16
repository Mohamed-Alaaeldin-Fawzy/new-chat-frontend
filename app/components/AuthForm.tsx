'use client';
import { useState, useEffect } from 'react';
import Input from './Input';
import { handleAuth } from '@/action/handleAuth';
import { handleValidation } from '@/helpers/handleValidation';
import Form from './Form';
import { AuthFormDataTypes, InputErrors } from '@/types';
import { getAuthFormInputFields } from '../authFormData';
import cls from 'classnames';
import { useAuth } from '@/context/AuthContext';

const AuthForm = () => {
  const { setToken } = useAuth();

  const [variant, setVariant] = useState<'LOGIN' | 'REGISTER'>('LOGIN');
  const [inputErrors, setInputErrors] = useState<InputErrors>({
    name: '',
    email: '',
    password: '',
    global: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [formData, setFormData] = useState<AuthFormDataTypes>({
    name: '',
    email: '',
    password: '',
  });

  useEffect(() => {
    const isLoginValid =
      variant === 'LOGIN' && formData.email && formData.password;
    const isRegisterValid =
      variant === 'REGISTER' &&
      formData.email &&
      formData.password &&
      formData.name;
    setDisabled(!(isLoginValid || isRegisterValid));
  }, [formData, variant]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { isValid, errors } = await handleValidation(variant, formData);
    console.log('Validation result:', isValid, errors);

    if (!isValid) {
      setInputErrors(errors as typeof inputErrors);
      return;
    }

    setIsLoading(true);

    try {
      const data = await handleAuth(
        formData.email,
        formData.password,
        formData.name,
        variant
      );
      localStorage.setItem('token', data.token);
      setToken(data.token);
    } catch (error: any) {
      console.error('Auth error:', error.message);
      setInputErrors((prev) => ({ ...prev, global: error.message }));
    }

    setIsLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <div className={cls('mx-auto mt-8 w-full max-w-md self-center')}>
      <h2 className={cls('text-center text-3xl font-bold')}>
        {variant === 'LOGIN' ? 'Sign in' : 'Register'}
      </h2>
      <div className={cls('mt-4 rounded-lg bg-white p-8 shadow-lg')}>
        <Form
          onSubmit={handleSubmit}
          buttonText={variant === 'LOGIN' ? 'Sign in' : 'Register'}
          isLoading={isLoading}
          disabled={disabled}
        >
          {getAuthFormInputFields(variant).map(({ id, label, type }) => (
            <div key={id}>
              <Input
                id={id}
                label={label}
                type={type}
                value={formData[id]}
                disabled={isLoading}
                onChange={handleChange}
              />
              <p className="mt-2 text-sm font-semibold text-red-500">
                {inputErrors[id]}
              </p>
            </div>
          ))}
        </Form>
        {inputErrors.global && (
          <p className="my-4 text-sm font-semibold text-red-500">
            {inputErrors.global}
          </p>
        )}
        <div className="mt-4 flex justify-center border-t-[1px] border-gray-200 py-4 text-center text-sm text-gray-500">
          <div>
            {variant === 'LOGIN'
              ? "Don't have an account?"
              : 'Already have an account?'}
          </div>
          <div
            className="ml-2 cursor-pointer text-blue-500 underline"
            onClick={() =>
              setVariant(variant === 'LOGIN' ? 'REGISTER' : 'LOGIN')
            }
          >
            {variant === 'LOGIN' ? 'Create an account' : 'Login'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
