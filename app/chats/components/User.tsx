import React from 'react';
import Avatar from './Avatar';
const User = ({ name, email }: { name: string; email: string }) => {
  return (
    <div className="relative flex cursor-pointer items-center justify-center p-4 align-middle hover:bg-zinc-800 ">
      <Avatar />
      <div>
        <h3 className="text-xl font-semibold text-zinc-100">{name}</h3>
        <p className="text-sm text-zinc-200">{email}</p>
      </div>
    </div>
  );
};

export default User;
