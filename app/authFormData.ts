const inputFieldMappings = {
  LOGIN: [
    {
      id: 'email',
      label: 'Email',
      type: 'email',
    },
    {
      id: 'password',
      label: 'Password',
      type: 'password',
    },
  ],
  REGISTER: [
    {
      id: 'name',
      label: 'Name',
      type: 'text',
    },
    {
      id: 'email',
      label: 'Email',
      type: 'email',
    },
    {
      id: 'password',
      label: 'Password',
      type: 'password',
    },
  ],
};

export const getAuthFormInputFields = (variant: 'LOGIN' | 'REGISTER') => {
  return inputFieldMappings[variant] || [];
};
