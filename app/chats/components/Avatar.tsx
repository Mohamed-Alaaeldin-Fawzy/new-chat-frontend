import React from 'react';
import Image from 'next/image';
import AvatarImage from '@/public/avatar.jpg';
const Avatar = () => {
  return (
    <Image
      src={AvatarImage}
      alt="Avatar"
      className="mr-4 h-14 w-14 rounded-full"
      width={100}
    />
  );
};

export default Avatar;
