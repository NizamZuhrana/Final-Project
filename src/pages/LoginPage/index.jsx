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
    <div className="relative flex items-center justify-start w-screen h-screen p-10 px-20 text-white bg-cover bg-background-1">
      <div className="absolute top-0 right-0 p-4">
        <img src="./public/logo-oyok.png" alt="Logo" className="h-24" />
      </div>
      <div className="flex flex-col justify-center max-w-5xl sm:p-10 rounded-xl backdrop-blur-sm bg-[rgba(0,0,0,0.5)] items-stretch">
        <p className="mb-4 text-3xl font-semibold sm:text-4xl">Sign In</p>
        <h3 className="mb-6 text-sm font-light text-gray-300 sm:text-base">
          Login to Your Account
        </h3>
        <form className="flex flex-col w-full gap-10 lg:w-[400px] md:w-[300px]" onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Email"
            name="email"
            onChange={handleChange}
            className="w-full h-12 sm:h-14 rounded-lg border-0 text-white bg-[rgba(255,255,255,0.08)] text-base px-4 placeholder:text-gray-400 focus:outline-none focus:ring focus:ring-black"
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              onChange={handleChange}
              name="password"
              className="w-full h-12 sm:h-14 rounded-lg border-0 text-white bg-[rgba(255,255,255,0.08)] text-base px-4 placeholder:text-gray-400 focus:outline-none focus:ring focus:ring-black"
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
            className="mb-4 text-sm text-left text-blue-400 sm:text-base hover:underline"
          >
            Don't have an account?
          </a>
          {error && (
            <p className="text-sm text-red-500 sm:text-base">{error}!</p>
          )}
          {success && (
            <p className="text-sm text-green-500 sm:text-base">{success}</p>
          )}
          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full py-2 text-lg font-bold text-center text-white transition duration-300 bg-blue-600 rounded-lg sm:py-3 hover:bg-blue-700 disabled:bg-gray-400"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
