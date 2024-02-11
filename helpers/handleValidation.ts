import * as yup from 'yup';

const registrationSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup
    .string()
    .email('Invalid email format')
    .required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 8 characters long')
    .required('Password is required'),
});

const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email('Invalid email format')
    .required('Email is required'),
  password: yup.string().required('Password is required'),
});

export const handleValidation = async (
  context: string,
  data: Record<string, any>
) => {
  try {
    let schema;

    switch (context) {
      case 'REGISTER':
        schema = registrationSchema;
        break;
      case 'LOGIN':
        schema = loginSchema;
        break;
      default:
        throw new Error(`Unknown validation context: ${context}`);
    }

    await schema.validate(data, { abortEarly: false }); // Validate the data
    return { isValid: true, errors: {} }; // Return no errors if validation passes
  } catch (err) {
    if (err instanceof yup.ValidationError) {
      const errors = err.inner.reduce((acc: Record<string, string>, error) => {
        const key = error.path || 'unknown';
        acc[key] = error.message;
        return acc;
      }, {});
      return { isValid: false, errors };
    }
    console.error(err);
    return {
      isValid: false,
      errors: { global: 'An unexpected error occurred' },
    };
  }
};
