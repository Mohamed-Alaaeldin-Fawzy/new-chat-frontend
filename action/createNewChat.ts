import { handleApi } from '@/helpers/handleApi';
import data from '../mockData.json';
import { generateRandomNumber } from '../helpers/generateRandomId';

export const createNewChat = async (
  selectedUsers: string[],
  chatName?: string
) => {
  return await handleApi(`${process.env.NEXT_PUBLIC_API_URL}/chat`, {
    method: 'POST',
    body: { usersIds: selectedUsers, name: chatName },
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  });

  // uncomment when testing
  // const id = generateRandomNumber(5);
  // data.chats.push({ name: chatName, id, usersIds: selectedUsers });

  // return data.chats;
};
