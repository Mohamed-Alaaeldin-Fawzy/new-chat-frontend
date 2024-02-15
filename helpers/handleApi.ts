import { ApiOptions } from '../types';

// Function to get authentication headers
const getAuthHeaders = (): Record<string, string> => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const handleApi = async (
  url: string,
  { method, body, headers = {} }: ApiOptions
): Promise<any> => {
  try {
    const authHeaders = getAuthHeaders();

    const fetchOptions: RequestInit = {
      method,
      headers: new Headers({
        'Content-Type': 'application/json',
        ...authHeaders,
        ...headers,
      }),
    };

    if (method !== 'GET' && body !== undefined) {
      fetchOptions.body = JSON.stringify(body);
    }

    const response = await fetch(url, fetchOptions);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong');
    }

    return data;
  } catch (error) {
    throw error;
  }
};
