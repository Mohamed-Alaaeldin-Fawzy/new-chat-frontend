import Image from 'next/image';
import AuthImage from '@/public/auth.svg';
import AuthForm from './components/AuthForm';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col justify-center bg-white px-8 py-12 align-middle sm:px-6 lg:flex-row-reverse">
      <Image
        src={AuthImage}
        alt="Login image"
        className="hidden w-full max-w-md sm:mx-auto lg:block"
      />
      <AuthForm />
    </main>
  );
}
