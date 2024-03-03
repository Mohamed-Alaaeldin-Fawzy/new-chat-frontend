import React from 'react';
import Avatar from './Avatar';
import avatarImg from '@/public/avatar.png';

interface UserProps {
  name: string;
  email: string;
}

const User = ({ name, email }: UserProps) => {
  return (
    <div className="flex w-full cursor-pointer items-center justify-center p-4 align-middle">
      <Avatar imgUrl={avatarImg} />
      <div>
        <h3 className="text-xl font-semibold">{name}</h3>
        <p className="text-sm">{email}</p>
      </div>
    </div>
  );
};

export default User;
