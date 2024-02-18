import { handleApi } from '@/helpers/handleApi';

export const getMessagesByChatId = async (chatId: string) => {
  const messages = await handleApi(
    `${process.env.NEXT_PUBLIC_API_URL}/message/${chatId}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}` || '',
      },
    }
  );
  return messages;
};
