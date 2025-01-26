import useLogin from "../../hooks/useLogin";

const LoginPage = () => {
  const {
    loading,
    handleLogin,
    handleChange,
    error,
    success,
    showPassword,
    togglePasswordVisibility,
  } = useLogin();
  return (
    <div className="relative flex items-center w-screen h-screen p-5 text-white bg-cover md:justify-center sm:p-10 bg-background-1 lg:justify-start">
      <div className="absolute top-0 right-0 p-4">
        <img
          src="/logo-oyok.png"
          alt="Logo"
          className="object-contain h-16 sm:h-24"
        />
      </div>
      <div className="flex flex-col justify-start w-full max-w-md p-6 sm:p-10 md:max-w-lg lg:max-w-xl rounded-xl backdrop-blur-sm bg-[rgba(0,0,0,0.5)] items-stretch">
        <p className="mb-4 text-2xl font-semibold text-center sm:text-3xl lg:text-4xl">
          Sign In
        </p>
        <h3 className="mb-6 text-sm font-light text-center text-gray-300 sm:text-base lg:text-lg">
          Login to Your Account
        </h3>
        <form className="flex flex-col w-full gap-6" onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Email"
            name="email"
            onChange={handleChange}
            className="w-full h-10 sm:h-12 md:h-14 rounded-lg border-0 text-white bg-[rgba(255,255,255,0.08)] text-sm sm:text-base lg:text-lg px-4 placeholder:text-gray-400 focus:outline-none focus:ring focus:ring-black"
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              onChange={handleChange}
              name="password"
              className="w-full h-10 sm:h-12 md:h-14 rounded-lg border-0 text-white bg-[rgba(255,255,255,0.08)] text-sm sm:text-base lg:text-lg px-4 placeholder:text-gray-400 focus:outline-none focus:ring focus:ring-black"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 flex items-center text-gray-500 right-3 hover:text-gray-700"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          <a
            href="/register"
            className="mb-4 text-xs text-center text-blue-400 sm:text-sm lg:text-base hover:underline"
          >
            Don't have an account?
          </a>
          {error && (
            <div className="flex items-center justify-center p-4 mb-4 text-red-700 bg-red-100 border border-red-400 rounded-lg sm:text-sm lg:text-base">
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M18.364 5.636l-12.728 12.728M5.636 5.636l12.728 12.728"
                ></path>
              </svg>
              <span>{error}</span>
            </div>
          )}
          {success && (
            <div className="flex items-center justify-center p-4 mb-4 text-green-700 bg-green-100 border border-green-400 rounded-lg sm:text-sm lg:text-base">
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
              <span>{success}</span>
            </div>
          )}
          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full py-2 text-sm font-bold text-center text-white transition duration-300 bg-blue-600 rounded-lg sm:text-lg lg:text-xl sm:py-3 hover:bg-blue-700 disabled:bg-gray-400"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
