import { handleApi } from '@/helpers/handleApi';
import data from '../mockData.json';

export const getUserChats = async () => {
  return await handleApi(`${process.env.NEXT_PUBLIC_API_URL}/chat`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}` || '',
    },
  });
  //   uncomment when testing
  // return data.chats;
};
