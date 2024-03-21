import { handleApi } from '@/helpers/handleApi';
import data from '../mockData.json';
import { generateRandomNumber } from '../helpers/generateRandomId';

interface Message {
  body: string;
  senderId?: string;
  chatId?: string;
}
export const sendMessage = async (message: Message) => {
  return await handleApi(
    `${process.env.NEXT_PUBLIC_API_URL}/message/${message.chatId}`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}` || '',
      },
      body: message,
    }
  );
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
