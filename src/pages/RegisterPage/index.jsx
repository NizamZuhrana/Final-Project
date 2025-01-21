import useRegister from "../../hooks/useRegister";

const RegisterPage = () => {
  const { loading, handleRegister, handleChange, error, success } =
    useRegister();
  return (
    <div className="relative grid w-screen h-screen px-20 text-white bg-cover bg-background-1 place-items-end">
      <div className="absolute top-0 left-0 p-4">
        <img src="./public/logo-oyok.png" alt="Logo" className="h-24" />
      </div>
      <div className="flex flex-col items-center justify-center w-11/12 max-w-lg h-screen  p-6 sm:p-10 rounded-xl backdrop-blur-sm bg-[rgba(0,0,0,0.5)]">
        <p className="mb-4 text-3xl font-semibold sm:text-4xl">Sign Up</p>
        <h3 className="mb-6 text-sm font-light text-gray-300 sm:text-base">
          Create an account
        </h3>
        <form onSubmit={handleRegister} className="grid w-full gap-4">
          <input
            type="text"
            placeholder="Email"
            name="email"
            onChange={handleChange}
            className="w-full h-12 sm:h-14 rounded-lg border-0 text-white bg-[rgba(255,255,255,0.08)] text-base px-4 placeholder:text-gray-400 focus:outline-none focus:ring focus:ring-black"
          />
          <input
            type="text"
            placeholder="Username"
            name="name"
            onChange={handleChange}
            className="w-full h-12 sm:h-14 rounded-lg border-0 text-white bg-[rgba(255,255,255,0.08)] text-base px-4 placeholder:text-gray-400 focus:outline-none focus:ring focus:ring-black"
          />
          <input
            type="text"
            placeholder="Password"
            name="password"
            onChange={handleChange}
            className="w-full h-12 sm:h-14 rounded-lg border-0 text-white bg-[rgba(255,255,255,0.08)] text-base px-4 placeholder:text-gray-400 focus:outline-none focus:ring focus:ring-black"
          />
          <input
            type="text"
            placeholder="c_password"
            name="c_password"
            onChange={handleChange}
            className="w-full h-12 sm:h-14 rounded-lg border-0 text-white bg-[rgba(255,255,255,0.08)] text-base px-4 placeholder:text-gray-400 focus:outline-none focus:ring focus:ring-black"
          />
          <select
            name="role"
            id="role"
            class="w-full h-12 sm:h-14 rounded-lg border-0 text-white bg-[rgba(255,255,255,0.08)] text-base px-4 placeholder:text-gray-400 focus:outline-none focus:ring focus:ring-black"
          >
            <option class="text-gray-700 bg-white" value="user">
              User
            </option>
            <option class="text-gray-700 bg-white" value="admin">
              Admin
            </option>
          </select>
          <input
            type="text"
            placeholder="Phone Number"
            name="phone_number"
            onChange={handleChange}
            className="w-full h-12 sm:h-14 rounded-lg border-0 text-white bg-[rgba(255,255,255,0.08)] text-base px-4 placeholder:text-gray-400 focus:outline-none focus:ring focus:ring-primary"
          />
          <a href="/login">Have an account?</a>
          {error && <p>{error}</p>}
          {success && <p>{success}</p>}
          <button
            type="submit"
            className="w-full py-2 text-lg font-bold text-center text-white transition duration-300 bg-blue-600 rounded-lg sm:py-3 hover:bg-blue-700 disabled:bg-gray-400"
          >
            {loading ? "Loading..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
