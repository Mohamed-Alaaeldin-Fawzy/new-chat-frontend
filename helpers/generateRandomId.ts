export const generateRandomNumber = (digits: number) => {
  if (digits < 1) {
    throw new Error('Number of digits must be greater than 0');
  }
  const min = Math.pow(10, digits - 1);
  const max = Math.pow(10, digits) - 1;
  return Math.floor(Math.random() * (max - min + 1) + min).toString();
};
