import useSignin from "../hooks/signin.hooks";
import LoadingOverlay from "../interface/LoadingOverlay";
import { RiEyeCloseLine, RiEyeLine } from "react-icons/ri";
import { FiUserPlus } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { signInApi, signWithGoogleOAuth } from "../api/auth.api";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/slices/user.slice";
import { googleOAuthApi } from "../api/googleOAuth.api";
import GoogleAuth from "../components/Google.Auth";

export default function SignIn() {
  const {
    email,
    setEmail,
    password,
    setPassword,
    showPassword,
    setAvatar,
    loading,
    setLoading,
    error,
    setError,
    togglePasswordVisibility,
  } = useSignin();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleGoogleClick = async () => {
    setLoading(true);
    var res = await googleOAuthApi();
    if (res.success === false) {
      setError(res.message);
      setLoading(false);
      return;
    }
    await setEmail(res.data.user.email);
    await setAvatar(res.data.user.photoURL);

    const formData = {
      name: res.data.user.displayName,
      email: res.data.user.email,
      avatar: res.data.user.photoURL,
    };

    var res = await signWithGoogleOAuth(formData);
    if (res.success === false) {
      setError(res.message);
    } else {
      setError(false);
      navigate("/");
    }
    dispatch(setUser(res));
    setLoading(false);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      email,
      password,
    };
    setLoading(true);
    const res = await signInApi(formData);
    if (res.success === false) {
      setError(res.message);
    } else {
      setError(false);
      navigate("/");
    }
    setLoading(false);
    dispatch(setUser(res));
  };

  return (
    <>
      {loading && <LoadingOverlay />}

      <div className="min-h-screen text-gray-900 flex justify-center">
        <div className="max-w-screen-xl m-0 sm:m-10 bg-white border shadow-md sm:rounded-lg flex justify-center flex-1 overflow-hidden">
          <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
            <div className="mt-12 flex flex-col items-center">
              <div className="w-full flex-1 mt-8">
                <div className="flex flex-col items-center">
                  <GoogleAuth handleGoogleClick={handleGoogleClick} />
                </div>

                <div className="my-12 border-b text-center">
                  <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                    Or sign in with E-mail
                  </div>
                </div>
                <form onSubmit={handleSubmit} className="mx-auto max-w-xs">
                  {error && <p className="text-red-600 p-2 flex">{error}</p>}
                  <input
                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={handleEmailChange}
                    autoComplete="email"
                    required
                  />
                  <div className="w-full flex rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5">
                    <input
                      className="w-full px-8 py-4 rounded-s-lg font-medium bg-gray-100 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      value={password}
                      onChange={handlePasswordChange}
                      maxLength="20"
                      minLength={8}
                      autoComplete="password"
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

                  <button
                    type="submit"
                    className="mt-5 tracking-wide font-semibold bg-green-400 text-white-500 w-full py-4 rounded-lg hover:bg-green-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                  >
                    <FiUserPlus className="w-7 h-7" />
                    <span className="ml-2">Sign In</span>
                  </button>
                </form>
                <p className="mt-6 text-s text-gray-600 text-center">
                  Not have an account?{" "}
                  <Link to="/sign-up" className="text-blue-600 hover:underline">
                    Sign Up
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
