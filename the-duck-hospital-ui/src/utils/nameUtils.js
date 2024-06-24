export const getInitialName = (fullName) => {
  const words = fullName.split(" ");
  const initials = words[words.length - 1][0] + words[0][0];
  return initials.toUpperCase();
};
