const loginInputFields = [
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
];

const registrationInputFields = [
  {
    id: 'name',
    label: 'Name',
    type: 'text',
  },
  ...loginInputFields,
];

export const getAuthFormInputFields = (variant: string) => {
  return variant === 'LOGIN' ? loginInputFields : registrationInputFields;
};
