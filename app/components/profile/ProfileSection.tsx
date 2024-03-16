'use client';
import React, { useEffect, useState } from 'react';
import { Chat } from '@/types'; // Adjust the import according to your file structure
import EditableField from './EditableField';
import ImageUpload from './ImageUpload';
import ActionButton from './ActionButton';
import cls from 'classnames';
import { getUserChats } from '@/action/getUserChats';
import { updateUser } from '@/action/updateUser';
import { useAuth } from '@/context/AuthContext';
import imageUrl from '@/public/avatar.png';
import { FaArrowLeft } from 'react-icons/fa6';
import { useRouter } from 'next/navigation';

const ProfileSection: React.FC = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [userChats, setUserChats] = useState<Chat[]>([]);
  const [image, setImage] = useState<string>(user?.image || imageUrl.src);
  const [userData, setUserData] = useState({
    name: user?.name,
    email: user?.email,
    image: user?.image,
  });
  const router = useRouter();

  useEffect(() => {
    const fetchUserChats = async () => {
      try {
        setUserChats(await getUserChats());
      } catch (error) {
        console.error('Failed to fetch user chats:', error);
      }
    };
    if (user) {
      fetchUserChats();
    }
  }, [user]);

  const onSave = async () => {
    await updateUser(userData);
    router.push('/chats');
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <div
        className={cls(
          'flex max-w-md flex-col items-center rounded px-10 py-4 shadow-lg'
        )}
      >
        <button
          className="cursor-pointer self-start"
          onClick={() => router.back()}
        >
          <FaArrowLeft size={25} />
        </button>
        <ImageUpload
          isEditing={isEditing}
          setImage={setImage}
          image={image}
          setUserData={setUserData}
        />
        <div className={cls('mb-2 text-base')}>
          <EditableField
            label="Name"
            id="name"
            value={userData?.name}
            handleUserDataChange={setUserData}
            isEditing={isEditing}
          />
        </div>
        <div className={cls('mb-4 text-base text-gray-800')}>
          <EditableField
            label="Email"
            id="email"
            value={userData?.email}
            isEditing={isEditing}
            handleUserDataChange={setUserData}
          />
        </div>
        <h3>is a part of following groups:</h3>
        <div className={cls('w-full px-6 pb-2 pt-4')}>
          {userChats?.map(
            (tag, index) =>
              tag.name && (
                <span
                  key={index}
                  className={cls(
                    'mb-2 mr-2 inline-block rounded-full bg-blue-500 px-3 py-1 text-sm font-semibold text-white'
                  )}
                >
                  # {tag.name}
                </span>
              )
          )}
        </div>
        {!isEditing ? (
          <ActionButton onClick={() => setIsEditing(!isEditing)} text="Edit" />
        ) : (
          <>
            {/* on save will make a put request in the future */}
            <ActionButton onClick={onSave} text="Save" />
            <ActionButton onClick={() => setIsEditing(false)} text="Cancel" />
          </>
        )}
      </div>
    </div>
  );
};

export default ProfileSection;
