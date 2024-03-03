import { handleApi } from '@/helpers/handleApi';
import data from '../mockData.json';
import { generateRandomNumber } from '../helpers/generateRandomId';

export const sendMessage = async (message: object) => {
  return await handleApi(`${process.env.NEXT_PUBLIC_API_URL}/message/`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}` || '',
    },
    body: message,
  });
  //  uncomment when testing
  // const id = generateRandomNumber(5);
  // return data.messages.push({
  //   // @ts-ignore
  //   body: message.body,
  //   // @ts-ignore
  //   senderId: message.senderId,
  //   // @ts-ignore
  //   chatId: message.chatId,
  //   id,
  // });
};
