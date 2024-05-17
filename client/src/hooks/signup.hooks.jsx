import { useState } from "react";

export default function useSignup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState("/images/male.jpg");
  const [passwordStrength, setPasswordStrength] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const checkPasswordStrength = (password) => {
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])\S{8,20}$/;
    if (regex.test(password)) {
      setPasswordStrength("strong");
    } else {
      setPasswordStrength("weak");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return {
    name,
    setName,
    email,
    setEmail,
    password,
    avatar,
    setAvatar,
    setPassword,
    passwordStrength,
    setPasswordStrength,
    showPassword,
    setShowPassword,
    loading,
    setLoading,
    error,
    setError,
    checkPasswordStrength,
    togglePasswordVisibility,
  };
}
