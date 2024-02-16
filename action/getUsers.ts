import { handleApi } from '@/helpers/handleApi';

export const getUsers = async () => {
  const users = await handleApi(`${process.env.NEXT_PUBLIC_API_URL}/user`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}` || '',
    },
  });
  return users;
};
