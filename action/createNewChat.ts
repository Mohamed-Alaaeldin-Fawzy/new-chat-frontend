import { handleApi } from '@/helpers/handleApi';

export const createNewChat = async (
  selectedUsers: string[],
  chatName: string
) => {
  const chat = await handleApi(`${process.env.NEXT_PUBLIC_API_URL}/chat`, {
    method: 'POST',
    body: { usersIds: selectedUsers, name: chatName },
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  });
  return chat;
};
