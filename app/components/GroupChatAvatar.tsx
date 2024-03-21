import React from 'react';
import Image from 'next/image';
import cls from 'classnames';
const GroupChatAvatar = ({
  chatUsers,
  onlineUserIds,
}: {
  chatUsers: { image: string; id: string }[];
  onlineUserIds: string[];
}) => {
  const maxDisplay = 2;
  const additionalCount =
    chatUsers.length > maxDisplay ? chatUsers.length - maxDisplay : 0;

  return (
    <div className="flex items-center justify-start">
      {chatUsers.slice(0, maxDisplay).map((user, index) => (
        <div
          key={index}
          className={cls(
            'relative -ml-4 rounded-full border-2 border-white first:ml-0'
          )}
          style={{ zIndex: maxDisplay - index }}
        >
          <Image
            src={user.image}
            alt={`User ${index}`}
            className="rounded-full object-cover"
            height={40}
            width={40}
          />
          {onlineUserIds.includes(user.id) && (
            <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full border-2 border-white bg-green-500" />
          )}
        </div>
      ))}
      {additionalCount > 0 && (
        <div className="-ml-2 flex h-10 w-10 cursor-default items-center justify-center rounded-full border-2 border-white bg-gray-200 align-middle text-gray-900">
          +{additionalCount}
        </div>
      )}
    </div>
  );
};

export default GroupChatAvatar;
