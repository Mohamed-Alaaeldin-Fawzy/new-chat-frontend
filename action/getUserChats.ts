import { handleApi } from '@/helpers/handleApi';

export const getUserChats = async () => {
  const chats = await handleApi(`${process.env.NEXT_PUBLIC_API_URL}/chat`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}` || '',
    },
  });
  return chats;
};
