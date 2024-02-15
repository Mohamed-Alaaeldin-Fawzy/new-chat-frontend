import { handleApi } from '@/helpers/handleApi';

export const sendMessage = async (message: object) => {
  const chats = await handleApi(
    `${process.env.NEXT_PUBLIC_API_URL}/messages/`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}` || '',
      },
      body: message,
    }
  );
  return chats;
};
