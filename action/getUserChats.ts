import { handleApi } from '@/helpers/handleApi';

export const getUserChats = async () => {
  const chats = await handleApi(`${process.env.NEXT_PUBLIC_API_URL}/chats`, {
    method: 'GET',
    headers: {
      Authorization: localStorage.getItem('token') || '',
    },
  });
  return chats;
};
