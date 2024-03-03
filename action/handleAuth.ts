import { handleApi } from '@/helpers/handleApi';
import JSONData from '../mockData.json';
import { generateRandomNumber } from '../helpers/generateRandomId';

export const handleAuth = async (
  email: string,
  password: string,
  name: string | undefined,
  variant: 'LOGIN' | 'REGISTER'
) => {
  return await handleApi(
    `${process.env.NEXT_PUBLIC_API_URL}/${variant.toLowerCase()}`,
    {
      method: 'POST',
      body: { email, password, ...(variant === 'REGISTER' && { name }) },
    }
  );
  // uncomment when testing
  // const mockToken = 'mockToken123456';
  // if (name !== undefined) {
  //   const id = generateRandomNumber(5);
  //   JSONData.users.push({
  //     id,
  //     // @ts-ignore
  //     name,
  //     email,
  //     password,
  //   });
  //   return {
  //     success: true,
  //     token: mockToken,
  //     user: {
  //       id,
  //       // @ts-ignore
  //       name,
  //       email,
  //       password,
  //     },
  //   };
  // } else {
  //   const user = JSONData.users.find((user) => user.email === email);
  //   return {
  //     success: true,
  //     token: mockToken,
  //     user,
  //   };
  // }
};
