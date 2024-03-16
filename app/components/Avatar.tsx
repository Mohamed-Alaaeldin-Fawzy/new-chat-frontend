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
      <div
        className={cls(
          'absolute bottom-1 right-4 h-3 w-3 rounded-full',
          'bg-green-500'
        )}
      ></div>
    </div>
  );
};

export default Avatar;
