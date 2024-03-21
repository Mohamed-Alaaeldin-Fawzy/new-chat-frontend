import React, { useState, useEffect } from 'react';
import cls from 'classnames';
import User from '../User';
import { useAuth } from '@/context/AuthContext';
import { getUserChats } from '@/action/getUserChats';
import { Chat as ChatType } from '@/types';
import SideBarHeader from './SidebarHeader';
import ChatPreview from '../chat/ChatPreview';
import SidebarSkeleton from './SidebarSkeleton';
import ProfileSection from '../profile/ProfileSection';

const Sidebar = ({
  setIsModalOpen,
  selectedUsers,
}: {
  setIsModalOpen: any;
  selectedUsers: string[];
}) => {
  const { user } = useAuth();
  const [originalUserChats, setOriginalUserChats] = useState<ChatType[]>([]);
  const [userChats, setUserChats] = useState<ChatType[]>([]);
  const openModal = () => setIsModalOpen(true);
  const { setToken } = useAuth();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false); // State to track drawer visibility
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };
  useEffect(() => {
    const fetchUserChats = async () => {
      try {
        const chats = await getUserChats();
        setUserChats(chats);
        setOriginalUserChats(chats);
      } catch (error) {
        console.error('Failed to fetch user chats:', error);
      }
    };

    if (user) {
      fetchUserChats();
    }
  }, [user, selectedUsers]);

  const handleLogoutChange = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  return user ? (
    <>
      <div className="flex h-full w-full flex-col border-r-[1px] border-gray-200 bg-white">
        <SideBarHeader
          setUserChats={setUserChats}
          originalUserChats={originalUserChats}
          handleLogoutChange={handleLogoutChange}
          openModal={openModal}
        />
        <div className="grow overflow-y-auto scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-900">
          {userChats.length > 0 &&
            userChats.map((chat) => (
              <div
                key={chat.id}
                className={cls(
                  'm-4 flex cursor-pointer flex-col items-start rounded-xl',
                  {
                    'hover:bg-gray-200': chat.id,
                  }
                )}
              >
                <ChatPreview
                  name={chat.name}
                  id={chat.id}
                  usersIds={chat.usersIds}
                  subText="tap to chat"
                />
              </div>
            ))}
        </div>
        <div
          className="border-t-[1px] border-gray-200 p-4"
          onClick={toggleDrawer}
        >
          <User name={user.name} email={user?.email} image={user.image} />
        </div>
      </div>
      <ProfileSection
        isDrawerOpen={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
      />
    </>
  ) : (
    <div className="flex h-full min-w-96 flex-col border-r-[1px] border-gray-200 bg-white">
      <SidebarSkeleton />
    </div>
  );
};

export default Sidebar;
