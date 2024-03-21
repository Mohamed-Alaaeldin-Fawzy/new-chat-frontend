'use client';
import React, { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import cls from 'classnames';
import Sidebar from '../components/sidebar/Sidebar';
import ChatRoom from '../components/chat/ChatRoom';
import { useIsSidebarOpen } from '@/context/IsSidebarOpen';
import { useAuth } from '@/context/AuthContext';
import { useGetUsers } from '@/context/UsersContext';
import ModalForm from '@/app/components/ModalForm';
import Form from '@/app/components/Form';
import UserCheckbox from '@/app/components/UserCheckbox';
import { User as UserType } from '@/types';
import { createNewChat } from '@/action/createNewChat';
import { FaXmark } from 'react-icons/fa6';

interface ChatName {
  label: string;
  value: string;
  required: boolean;
}

const ChatsLayout: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const { users } = useGetUsers();
  const { user } = useAuth();
  const { isOpen } = useIsSidebarOpen();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [usersList, setUsersList] = useState<UserType[]>([]);
  const [chatName, setChatName] = useState<ChatName>({
    required: false,
    label: 'Chat Name',
    value: '',
  });

  useEffect(() => {
    setUsersList(
      users.filter((userItem: UserType) => userItem.id !== user?.id)
    );
  }, [user, users]);

  const handleAddChatSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const selectedUsersNames = users!
      .filter((userItem) => selectedUsers.includes(userItem.id!))
      .map((userItem) => userItem.name);

    if (selectedUsersNames.length === 1) {
      setChatName({
        ...chatName,
        required: false,
      });
      await createNewChat([...selectedUsers]);
    } else {
      setChatName({ ...chatName, required: true });
      await createNewChat([...selectedUsers], chatName.value);
    }
    setSelectedUsers([]);
    setIsModalOpen(false);
    setChatName({ ...chatName, value: '' });
  };

  const handleUserSelectChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;

    setSelectedUsers((prevSelectedUsers) =>
      checked
        ? [...prevSelectedUsers, value]
        : prevSelectedUsers.filter((id) => id !== value)
    );
  };

  const sidebarClasses = cls(
    'fixed lg:static flex lg:translate-x-0 inset-0 flex-shrink-0 transition-transform duration-300',
    {
      'translate-x-0': isOpen,
      '-translate-x-full': !isOpen,
    }
  );

  return (
    <div className="max-w-screen flex h-screen items-center justify-center bg-white align-middle">
      <ModalForm
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedUsers([]);
        }}
      >
        <h1 className="text-xl font-semibold">Please Select chat users </h1>

        <Form
          onSubmit={handleAddChatSubmit}
          buttonText="Create Chat"
          disabled={!selectedUsers.length}
          input={chatName}
          handleInputChange={(e: ChangeEvent<HTMLInputElement>) =>
            setChatName({ ...chatName, value: e.target.value })
          }
        >
          <div className="mt-2 flex flex-wrap gap-2">
            {selectedUsers.map((userId, index) => (
              <span
                key={index}
                className="inline-flex gap-2 rounded bg-blue-400 px-2 py-1 text-sm text-white"
              >
                {users!.find((user) => user.id === userId)?.name}
                <FaXmark
                  className="cursor-pointer text-white"
                  size={15}
                  onClick={() =>
                    setSelectedUsers((previousSelected) =>
                      previousSelected.filter((id) => id !== userId)
                    )
                  }
                />
              </span>
            ))}
          </div>
          <div className="w-full flex-1 overflow-auto">
            {usersList.map((user, index) => (
              <UserCheckbox
                key={index}
                selectedUsers={selectedUsers}
                onUserSelectChange={handleUserSelectChange}
                user={user}
              />
            ))}
          </div>
        </Form>
      </ModalForm>
      <div className="flex h-full w-full">
        <div className={sidebarClasses}>
          <Sidebar
            setIsModalOpen={setIsModalOpen}
            selectedUsers={selectedUsers}
          />
        </div>
        <div className="flex h-full w-full flex-col">
          <ChatRoom>{children}</ChatRoom>
        </div>
      </div>
    </div>
  );
};

export default ChatsLayout;
