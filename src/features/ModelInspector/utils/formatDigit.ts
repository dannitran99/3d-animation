export const formatDigit = (num: number, format: number) => {
  return String(num).padStart(format, '0');
};
