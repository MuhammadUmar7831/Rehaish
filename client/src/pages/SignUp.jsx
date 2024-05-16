import { Link, useNavigate } from "react-router-dom";
import { RiEyeCloseLine, RiEyeLine } from "react-icons/ri";
import { FcGoogle } from "react-icons/fc";
import { FiUserPlus } from "react-icons/fi";
import { checkPasswordStrength } from "../utils/signup.utils";
import signupHooks from "../hooks/signup.hooks";
import { signUpApi } from "../api/auth.api";
import LoadingOverlay from "../interface/LoadingOverlay";

export default function SignUp() {
  const {
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    passwordStrength,
    setPasswordStrength,
    showPassword,
    loading,
    setLoading,
    error,
    setError,
    navigate,
    togglePasswordVisibility,
  } = signupHooks();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      name,
      email,
      password,
    };
    setLoading(true);
    const res = await signUpApi(formData);
    if (res.success === false) {
      setError(res.message);
    } else {
      setError(false);
      // navigate("/");
    }
    setLoading(false);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (event) => {
    const newPassword = event.target.value;
    setPassword(newPassword);
    setPasswordStrength(checkPasswordStrength(newPassword));
  };

  return (
    <>
      {loading && <LoadingOverlay />}

      <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
        <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1 overflow-hidden">
          <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
            <div className="mt-12 flex flex-col items-center">
              <div className="w-full flex-1 mt-8">
                <div className="flex flex-col items-center">
                  <button className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-green-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline">
                    <div className="bg-white p-2 rounded-full">
                      <FcGoogle />
                    </div>
                    <span className="ml-4">Sign Up with Google</span>
                  </button>
                </div>

                <div className="my-12 border-b text-center">
                  <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                    Or sign Up with E-mail
                  </div>
                </div>
                <form onSubmit={handleSubmit} className="mx-auto max-w-xs">
                  {error && <p className="text-red-600 flex p-2">{error}</p>}
                  <input
                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    type="text"
                    placeholder="name"
                    onChange={handleNameChange}
                    autoComplete="name"
                    required
                  />
                  <input
                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                    type="email"
                    placeholder="Email"
                    onChange={handleEmailChange}
                    autoComplete="email"
                    required
                  />
                  <div
                    className={`w-full flex rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5 ${
                      passwordStrength === "weak"
                        ? "border-red-500"
                        : "border-gray-400"
                    }`}
                  >
                    <input
                      className="w-full px-8 py-4 rounded-s-lg font-medium bg-gray-100 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      onChange={handlePasswordChange}
                      maxLength="20"
                      minLength={8}
                      pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                      title="Password must contain at least one number, one uppercase letter, one lowercase letter, and at least 8 characters in length and maximum 20."
                      autoComplete="new-password"
                      required
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="m-2"
                    >
                      {showPassword ? (
                        <RiEyeLine className="w-6 h-6 text-black" />
                      ) : (
                        <RiEyeCloseLine className="w-6 h-6 text-black" />
                      )}
                    </button>
                  </div>

                  <div className="text-sm text-gray-600 mt-2">
                    Password strength:{" "}
                    <span
                      className={`${
                        passwordStrength === "weak"
                          ? "text-red-500"
                          : "text-green-500"
                      }`}
                    >
                      {passwordStrength === "weak"
                        ? "Weak"
                        : "Strong (8-20 characters with at least one lowercase, one uppercase and one number)"}
                    </span>
                  </div>
                  <button
                    type="submit"
                    className="mt-5 tracking-wide font-semibold bg-green-400 text-white-500 w-full py-4 rounded-lg hover:bg-green-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                  >
                    <FiUserPlus className="w-7 h-7" />
                    <span className="ml-2">Sign Up</span>
                  </button>
                </form>
                <p className="mt-6 text-s text-gray-600 text-center">
                  Already have an account?{" "}
                  <Link to="/sign-in" className="text-blue-600 hover:underline">
                    Sign In
                  </Link>
                </p>
              </div>
            </div>
          </div>
          <div className="flex-1 text-center hidden lg:flex">
            <div
              className="w-full bg-cover bg-no-repeat"
              style={{ backgroundImage: "url('/images/image.jpg')" }}
            ></div>
          </div>
        </div>
      </div>
    </>
  );
}
