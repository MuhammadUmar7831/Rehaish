import { signUpApi } from "../api/auth.api";

export const checkPasswordStrength = (password) => {
  const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])\S{8,20}$/;
  return regex.test(password) ? "strong" : "weak";
};

export const generateStrongPassword = () => {
  const charset =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-_=+";
  let password = "";
  for (let i = 0; i < 8; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }
  return password;
};

export const singUp = async (formData) => {
  const res = await signUpApi(formData);
  return res;
};
