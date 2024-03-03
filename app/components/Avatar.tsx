import React from 'react';
import Image from 'next/image';

const Avatar = ({ imgUrl }: { imgUrl: any }) => {
  return (
    <Image src={imgUrl} alt="Avatar" className="mr-4 rounded-full" width={60} />
  );
};

export default Avatar;
