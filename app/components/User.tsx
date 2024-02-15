import React from 'react';
import Avatar from './Avatar';
import avatarImg from '@/public/avatar.png';

const User = ({ name, email }: { name: string; email: string }) => {
  return (
    <div className="relative flex max-w-80 cursor-pointer items-center p-4 align-middle ">
      <Avatar imgUrl={avatarImg} />
      <div>
        <h3 className="text-xl font-semibold">{name}</h3>
        <p className="text-sm">{email}</p>
      </div>
    </div>
  );
};

export default User;
