import useRegister from "../../hooks/useRegister";

const RegisterPage = () => {
  const { loading, handleRegister, handleChange, error, success } =
    useRegister();
  return (
    <div className="relative flex items-center w-screen h-screen p-5 text-white bg-cover md:justify-center sm:p-10 bg-background-1 lg:justify-end">
      {/* Logo */}
      <div className="absolute top-0 left-0 p-4">
        <img
          src="/logo-oyok.png"
          alt="Logo"
          className="object-contain h-16 sm:h-24"
        />
      </div>
      {/* Form Container */}
      <div className="flex flex-col justify-end w-full max-w-md p-6 sm:p-10 md:max-w-lg lg:max-w-xl rounded-xl backdrop-blur-sm bg-[rgba(0,0,0,0.5)] items-stretch">
        <p className="mb-4 text-2xl font-semibold text-center sm:text-3xl lg:text-4xl">
          Sign Up
        </p>
        <h3 className="mb-6 text-sm font-light text-center text-gray-300 sm:text-base lg:text-lg">
          Create an account
        </h3>
        <form onSubmit={handleRegister} className="grid w-full gap-4">
          <input
            type="text"
            placeholder="Email"
            name="email"
            onChange={handleChange}
            className="w-full h-10 sm:h-12 md:h-14 rounded-lg border-0 text-white bg-[rgba(255,255,255,0.08)] text-sm sm:text-base md:text-lg px-4 placeholder:text-gray-400 focus:outline-none focus:ring focus:ring-black"
          />
          <input
            type="text"
            placeholder="Username"
            name="name"
            onChange={handleChange}
            className="w-full h-10 sm:h-12 md:h-14 rounded-lg border-0 text-white bg-[rgba(255,255,255,0.08)] text-sm sm:text-base md:text-lg px-4 placeholder:text-gray-400 focus:outline-none focus:ring focus:ring-black"
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleChange}
            className="w-full h-10 sm:h-12 md:h-14 rounded-lg border-0 text-white bg-[rgba(255,255,255,0.08)] text-sm sm:text-base md:text-lg px-4 placeholder:text-gray-400 focus:outline-none focus:ring focus:ring-black"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            name="c_password"
            onChange={handleChange}
            className="w-full h-10 sm:h-12 md:h-14 rounded-lg border-0 text-white bg-[rgba(255,255,255,0.08)] text-sm sm:text-base md:text-lg px-4 placeholder:text-gray-400 focus:outline-none focus:ring focus:ring-black"
          />
          <select
            name="role"
            id="role"
            className="w-full h-10 sm:h-12 md:h-14 rounded-lg border-0 text-white bg-[rgba(255,255,255,0.08)] text-sm sm:text-base md:text-lg px-4 placeholder:text-gray-400 focus:outline-none focus:ring focus:ring-black"
          >
            <option className="text-gray-700 bg-white" value="user">
              User
            </option>
            <option className="text-gray-700 bg-white" value="admin">
              Admin
            </option>
          </select>
          <input
            type="text"
            placeholder="Phone Number"
            name="phone_number"
            onChange={handleChange}
            className="w-full h-10 sm:h-12 md:h-14 rounded-lg border-0 text-white bg-[rgba(255,255,255,0.08)] text-sm sm:text-base md:text-lg px-4 placeholder:text-gray-400 focus:outline-none focus:ring focus:ring-black"
          />
          <a
            href="/login"
            className="text-sm text-center text-blue-400 sm:text-base hover:underline"
          >
            Have an account?
          </a>
          {error && (
            <p className="text-xs text-center text-red-500 sm:text-sm md:text-base">
              {error}
            </p>
          )}
          {success && (
            <p className="text-xs text-center text-green-500 sm:text-sm md:text-base">
              {success}
            </p>
          )}
          <button
            type="submit"
            className="w-full py-2 text-sm font-bold text-center text-white transition duration-300 bg-blue-600 rounded-lg sm:py-3 sm:text-lg md:text-xl hover:bg-blue-700 disabled:bg-gray-400"
          >
            {loading ? "Loading..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
