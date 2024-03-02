import { handleApi } from '@/helpers/handleApi';
import JSONData from '../mockData.json';

export const getCurrentUser = async (setUser: any, token: string | null) => {
  if (token) {
    const user = await handleApi(`${process.env.NEXT_PUBLIC_API_URL}/user/me`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setUser(user);
  } else {
    setUser(null);
  }
  // uncomment when testing
  // const mockUser = JSONData.users[0];
  // setUser(mockUser);
  // return mockUser;
};
