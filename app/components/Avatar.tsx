import React from 'react';
import Image from 'next/image';
import cls from 'classnames';

const Avatar = ({ imgUrl }: { imgUrl: any }) => {
  return (
    <div className="relative">
      <Image
        src={imgUrl}
        alt="Avatar"
        className="mr-4 rounded-full"
        width={60}
        height={60}
      />
    </div>
  );
};

export default Avatar;
