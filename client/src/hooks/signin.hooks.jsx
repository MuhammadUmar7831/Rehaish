import { useState } from "react";

export default function useSignin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [avatar, setAvatar] = useState('/images/male.jpg')
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    avatar,
    setAvatar,
    showPassword,
    setShowPassword,
    loading,
    setLoading,
    error,
    setError,
    togglePasswordVisibility
  };
}
