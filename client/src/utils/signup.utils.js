export const checkPasswordStrength = (password) => {
  const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])\S{8,20}$/;
  return regex.test(password) ? "strong" : "weak";
};
