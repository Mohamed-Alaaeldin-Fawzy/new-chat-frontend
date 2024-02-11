interface ApiOptions {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: any;
  headers?: HeadersInit;
}

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `${token}` } : {};
};

export const handleApi = async (url: string, options: ApiOptions) => {
  const { method, body, headers } = options;
  const authHeaders = getAuthHeaders();
  const response = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
      ...(authHeaders.Authorization && {
        Authorization: `${authHeaders.Authorization}`,
      }),
    },
    body: method !== 'GET' ? JSON.stringify(body) : undefined,
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong');
  }
  if (
    url === `${process.env.NEXT_PUBLIC_API_URL}/auth/login` ||
    url === `${process.env.NEXT_PUBLIC_API_URL}/auth/register`
  ) {
    localStorage.setItem('token', data.token);
  }
  return data;
};
