import { handleApi } from '@/helpers/handleApi';

export const getChatById = async (chatId: string) => {
  const chat = await handleApi(
    `${process.env.NEXT_PUBLIC_API_URL}/chats/${chatId}`,
    {
      method: 'GET',
      headers: {
        Authorization: localStorage.getItem('token') || '',
      },
    }
  );
  return chat;
};
