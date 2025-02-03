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
          src="/logo-oyokkk.png"
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
            className="mb-4 text-xs text-blue-400 text-start sm:text-sm lg:text-base hover:underline"
          >
            Don't have an account?
          </a>
          <button
            onClick={handleLogin}
            disabled={loading}
            type="submit"
            className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
      <div>
        {error && (
          <div
            className="fixed flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bottom-4 right-4 bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800"
            role="alert"
          >
            <svg
              className="inline w-4 h-4 shrink-0 me-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 1 1 1 1v4h1a1 1 0 1 1 0 2Z" />
            </svg>
            <span class="sr-only">Info</span>
            <div>
              <span class="font-medium">{error}</span>
            </div>
          </div>
        )}
        {success && (
          <div
            className="fixed flex items-center p-4 mb-4 text-sm text-green-800 border border-green-300 rounded-lg bottom-4 right-4 bg-green-50 dark:bg-gray-800 dark:text-green-400 dark:border-green-800"
            role="alert"
          >
            <svg
              className="inline w-4 h-4 shrink-0 me-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 1 1 1 1v4h1a1 1 0 1 1 0 2Z" />
            </svg>
            <span className="sr-only">Info</span>
            <div>
              <span className="font-medium">{success}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
