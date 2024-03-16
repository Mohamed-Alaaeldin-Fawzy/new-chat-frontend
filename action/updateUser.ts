import { handleApi } from '@/helpers/handleApi';

export const updateUser = async ({
  name,
  email,
  image,
}: {
  name?: string;
  email?: string;
  image?: string;
}) => {
  return await handleApi(`${process.env.NEXT_PUBLIC_API_URL}/user/me`, {
    method: 'PUT',
    body: { name, email, image },
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  });
};
