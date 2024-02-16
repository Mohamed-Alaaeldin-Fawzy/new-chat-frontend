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
  data: any
) => {
  try {
    const schema = schemas[context];
    if (!schema) throw new Error(`Unknown validation context: ${context}`);

    await schema.validate(data, { abortEarly: false }); // Validate the data
    return { isValid: true, errors: {} }; // Return no errors if validation passes
  } catch (err) {
    if (err instanceof yup.ValidationError) {
      // Simplify error reduction using arrow function and implicit return
      const errors = err.inner.reduce(
        (acc, { path = 'unknown', message }) => ({
          ...acc,
          [path]: message,
        }),
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
