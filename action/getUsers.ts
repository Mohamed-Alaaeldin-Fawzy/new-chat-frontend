import { handleApi } from '@/helpers/handleApi';
import data from '../mockData.json';

export const getUsers = async () => {
  return await handleApi(`${process.env.NEXT_PUBLIC_API_URL}/user`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  //   uncomment when testing
  // return data.users;
};
