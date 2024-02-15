import React from 'react';
import Image from 'next/image';

const Avatar = ({ imgUrl }: { imgUrl: any }) => {
  return (
    <Image
      src={imgUrl}
      alt="Avatar"
      className="mr-4 h-14 w-14 rounded-full"
      width={100}
    />
  );
};

export default Avatar;
