'use client';
import React, { useEffect, useState } from 'react';
import { Chat } from '@/types'; // Adjust the import according to your file structure
import EditableField from './EditableField';
import ImageUpload from './ImageUpload';
import cls from 'classnames';
import { getUserChats } from '@/action/getUserChats';
import { updateUser } from '@/action/updateUser';
import { useAuth } from '@/context/AuthContext';
import imageUrl from '@/public/avatar.png';
import { FaArrowLeft } from 'react-icons/fa6';

const ProfileSection: React.FC<{
  isDrawerOpen: boolean;
  setIsDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ isDrawerOpen, setIsDrawerOpen }) => {
  const { user, setUser } = useAuth();

  const [userChats, setUserChats] = useState<Chat[]>([]);
  const [userData, setUserData] = useState({
    name: user?.name,
    email: user?.email,
    image: user?.image || imageUrl.src,
  });

  useEffect(() => {
    const fetchUserChats = async () => {
      if (!user) return;
      try {
        const chats = await getUserChats();
        setUserChats(chats);
      } catch (error: any) {
        console.error('Failed to fetch user chats:', error);
      }
    };
    fetchUserChats();
  }, [user]);

  const onSave = async () => {
    const updatedUser = await updateUser(userData);
    setUser(updatedUser);
  };

  const setImage = (image: string) =>
    setUserData((prev) => ({ ...prev, image }));

  return (
    <div
      className={cls(
        'fixed -left-full bottom-0 top-0 z-50 h-full w-full bg-white transition-all duration-300',
        {
          'left-0': isDrawerOpen,
          '-left-full': !isDrawerOpen,
        }
      )}
    >
      <div className="flex h-full w-screen flex-col items-center rounded border-r-[1px] border-gray-200 lg:w-full">
        <div className="flex w-full flex-row-reverse justify-end gap-6 space-x-8 bg-gray-500 py-10 text-white">
          <h2 className="cursor-default text-2xl">Profile</h2>
          <button
            className="cursor-pointer"
            onClick={() => setIsDrawerOpen(!isDrawerOpen)}
          >
            <FaArrowLeft size={25} />
          </button>
        </div>
        <ImageUpload
          setImage={setImage}
          image={userData.image}
          setUserData={setUserData}
        />
        <div
          className={cls(
            'm-6 flex w-full items-center justify-start bg-gray-200 p-4 text-base'
          )}
        >
          <EditableField
            label="Name"
            id="name"
            value={userData?.name}
            handleUserDataChange={setUserData}
            onSave={onSave}
          />
        </div>
        <div
          className={cls(
            'm-6 flex w-full items-center justify-start bg-gray-200 p-4 text-base'
          )}
        >
          <EditableField
            label="Email"
            id="email"
            value={userData?.email}
            handleUserDataChange={setUserData}
            onSave={onSave}
          />
        </div>
        <div className="mt-4 text-center">
          <h3>is a part of following groups:</h3>
          <div className={cls('w-full px-6 pb-2 pt-4')}>
            {userChats?.map(
              (tag, index) =>
                tag.name && (
                  <span
                    key={index}
                    className={cls(
                      'mb-2 mr-2 inline-block rounded-full bg-gray-500 px-3 py-1 text-sm font-semibold text-white'
                    )}
                  >
                    # {tag.name}
                  </span>
                )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;
