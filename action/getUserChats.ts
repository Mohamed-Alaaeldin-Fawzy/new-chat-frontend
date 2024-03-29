import { handleApi } from '@/helpers/handleApi';

export const getUserChats = async ({ id }: { id: string }) => {
  const chats = await handleApi(
    `${process.env.NEXT_PUBLIC_API_URL}/chats/${id}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}` || '',
      },
    }
  );
  return chats;
};
