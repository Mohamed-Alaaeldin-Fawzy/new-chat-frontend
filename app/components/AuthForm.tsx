'use client';
import { useState } from 'react';
import Input from './Input';
import Button from './Button';
import { handleApi } from '@/helpers/handleApi';
import { useRouter } from 'next/navigation';
import { handleValidation } from '@/helpers/handleValidation';
const url = process.env.NEXT_PUBLIC_API_URL;
const AuthForm = () => {
  const [variant, setVariant] = useState('REGISTER');
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const { name, email, password } = formData;

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { isValid, errors } = await handleValidation(variant, formData);

    if (!isValid) {
      // TODO : Do something with the errors array
      return;
    }

    setIsLoading(true);

    try {
      await handleApi(`${url}/auth/${variant.toLowerCase()}`, {
        method: 'POST',
        body: { email, password, ...(variant === 'REGISTER' && { name }) },
      });
      // redirect to /chats
      router.push('/chats');
    } catch (error) {
      // Handle error
      console.log(error);
    }

    setIsLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.id === 'email') {
      setFormData({ ...formData, email: e.target.value });
    }
    if (e.target.id === 'name') {
      setFormData({ ...formData, name: e.target.value });
    }
    if (e.target.id === 'password') {
      setFormData({ ...formData, password: e.target.value });
    }
  };
  return (
    <div
      className="
        mx-auto
        mt-8
        w-full
        max-w-md
        self-center
        "
    >
      <h2
        className="
       mb-6
       text-center
       text-3xl
       font-bold
       tracking-tight
       text-zinc-200
       "
      >
        {variant === 'LOGIN' ? 'Sign in' : 'Register'}
      </h2>
      <div
        className="
      bg-zinc-950
        px-4
        py-8
        shadow-2xl
        sm:rounded-lg
        sm:px-10
        "
      >
        <form className="space-y-6" onSubmit={handleSubmit}>
          {variant === 'REGISTER' && (
            <Input
              value={name}
              id="name"
              label="Name"
              disabled={isLoading}
              onChange={handleChange}
            />
          )}
          <Input
            value={email}
            id="email"
            label="Email"
            type="email"
            disabled={isLoading}
            onChange={handleChange}
          />
          <Input
            value={password}
            id="password"
            label="Password"
            type="password"
            disabled={isLoading}
            onChange={handleChange}
          />
          <div
            className="
            flex
            items-center
            justify-between
            "
          ></div>
          <Button fullWidth type="submit" disabled={isLoading}>
            {variant === 'LOGIN' ? 'Sign in' : 'Register'}
          </Button>
        </form>
        <div className="mt-6">
          <div className="relative">
            <div
              className="
              absolute
              inset-0
              flex
              items-center
              "
            >
              <div
                className="
              w-full
              border-t
              border-zinc-300
              pb-4
              "
              />
            </div>
          </div>
        </div>
        <div
          className="
        mt-6
        flex
        justify-center
        gap-2
        px-2
        text-sm
        text-zinc-400
        "
        >
          <div>
            {variant === 'LOGIN'
              ? "Don't have an account?"
              : 'Already have an account?'}
          </div>
          <div
            className="cursor-pointer text-blue-500 underline"
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
