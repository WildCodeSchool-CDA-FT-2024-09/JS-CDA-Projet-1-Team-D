export const calculateAge = (birthday: string | Date): number => {
  const today = new Date();
  const birthdate = new Date(birthday);
  return today.getFullYear() - birthdate.getFullYear();
};
