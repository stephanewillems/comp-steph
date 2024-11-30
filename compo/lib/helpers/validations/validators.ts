export const validatePvNumberInput = (input: string): boolean => {
  const regex = /^[A-Z]{2}\.\d{2}\.[A-Z]{2}\.\d{6}\/\d{4}$/;
  return regex.test(input);
};
