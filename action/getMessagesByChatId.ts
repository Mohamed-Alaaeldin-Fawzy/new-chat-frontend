import { handleApi } from '@/helpers/handleApi';
import data from '../mockData.json';

export const getMessagesByChatId = async (chatId: string) => {
  return await handleApi(
    `${process.env.NEXT_PUBLIC_API_URL}/message/${chatId}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}` || '',
      },
    }
  );
  //   uncomment when testing
  // return data.messages;
};
