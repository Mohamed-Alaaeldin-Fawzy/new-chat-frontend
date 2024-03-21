import * as yup from 'yup';

const schemas = {
  REGISTER: yup.object().shape({
    name: yup.string().required('Name is required'),
    email: yup
      .string()
      .email('Invalid email format')
      .required('Email is required'),
    password: yup
      .string()
      .min(6, 'Password must be at least 8 characters long')
      .required('Password is required'),
  }),
  LOGIN: yup.object().shape({
    email: yup
      .string()
      .email('Invalid email format')
      .required('Email is required'),
    password: yup.string().required('Password is required'),
  }),
};

export const handleValidation = async (
  context: keyof typeof schemas,
  data: Record<string, any>
): Promise<{ isValid: boolean; errors: Record<string, string> }> => {
  try {
    const schema = schemas[context];
    if (!schema) throw new Error(`Unknown validation context: ${context}`);

    await schema.validate(data, { abortEarly: false });
    return { isValid: true, errors: {} };
  } catch (err) {
    if (err instanceof yup.ValidationError) {
      const errors = err.inner.reduce<Record<string, string>>(
        (acc, { path, message }) => {
          if (path) acc[path] = message;
          return acc;
        },
        {}
      );
      return { isValid: false, errors };
    }
    return {
      isValid: false,
      errors: { global: 'An unexpected error occurred' },
    };
  }
};
