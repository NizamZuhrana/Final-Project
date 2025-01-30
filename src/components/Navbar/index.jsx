import useNavbar from "../../context/useNavbar";
import { Link } from "react-router-dom";

const Navbar = () => {
  const {
    isMenuOpen,
    toggleMenu,
    isVisible,
    isLoggedIn,
    handleLogout,
    toggleProfileMenu,
    showProfileMenu,
    dropdownRef,
  } = useNavbar();

  return (
    <div>
      <nav
        className={`fixed top-0 left-0 w-full bg-black/50 backdrop-blur-md shadow-lg transition-transform duration-300 lg:rounded-full md:rounded-full z-50 ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="container flex items-center justify-between p-4 mx-auto">
          {/* Logo dan Brand */}
          <div className="flex items-center space-x-2">
            <Link to={"/"} className="flex items-center space-x-2">
              <img
                src="/logo-oyokkk.png"
                alt="logo"
                className="object-contain h-10" // memastikan gambar tidak terlalu besar dan tetap proporsional
              />
              <span className="text-3xl font-semibold leading-tight tracking-wider text-white uppercase hover:text-gray-200">
                Oyok
              </span>
            </Link>
          </div>

          {/* Menu Desktop */}
          <div className="hidden space-x-8 md:flex">
            <a
              href="#home"
              className="text-white transition duration-300 hover:text-gray-200"
            >
              Home
            </a>
            <a
              href="#experience"
              className="text-white transition duration-300 hover:text-gray-200"
            >
              Experience
            </a>
            <a
              href="#contact"
              className="text-white transition duration-300 hover:text-gray-200"
            >
              Contact Us
            </a>
          </div>

          {/* Login dan Profil */}
          <div className="relative items-center hidden space-x-4 md:flex">
            {isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={toggleProfileMenu}
                  className="flex items-center space-x-2 text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300"
                >
                  <span className="sr-only">Open user menu</span>
                  <img
                    className="w-8 h-8 rounded-full"
                    src="/docs/images/people/profile-picture-3.jpg"
                    alt="user photo"
                  />
                </button>
                {showProfileMenu && (
                  <div
                    ref={dropdownRef}
                    className="absolute right-0 mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow-lg top-full w-44 dark:bg-gray-700 dark:divide-gray-600"
                  >
                    <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                      <div>Bonnie Green</div>
                      <div className="font-medium truncate">
                        name@flowbite.com
                      </div>
                    </div>
                    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                      <li>
                        <a
                          href="#"
                          className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          Dashboard
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          Settings
                        </a>
                      </li>
                    </ul>
                    <div className="py-2">
                      <button
                        onClick={handleLogout}
                        className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                      >
                        Sign out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link to="/register">
                  <button
                    type="button"
                    className="text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                  >
                    Sign Up
                  </button>
                </Link>
                <Link to="/login">
                  <button
                    type="button"
                    className="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                  >
                    Sign In
                  </button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              className="text-black focus:outline-none"
              onClick={toggleMenu}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="p-4 md:hidden backdrop-blur-md">
            <a
              href="#home"
              className="block py-2 text-black transition duration-300 hover:text-gray-200"
            >
              Home
            </a>
            <a
              href="#experience"
              className="block py-2 text-black transition duration-300 hover:text-gray-200"
            >
              Experience
            </a>
            <a
              href="#contact"
              className="block py-2 text-black transition duration-300 hover:text-gray-200"
            >
              Contact Us
            </a>
            <div className="flex flex-col mt-4 space-y-4">
              {isLoggedIn ? (
                <>
                  <button
                    onClick={handleLogout}
                    className="w-full py-2 font-semibold text-black transition duration-300 bg-[#ECEBDE] rounded-lg shadow-md hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <div className="flex space-x-2">
                  <Link to="/register" className="w-1/2">
                    <button
                      type="button"
                      className="w-full text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    >
                      Sign Up
                    </button>
                  </Link>
                  <Link to="/login" className="w-1/2">
                    <button
                      type="button"
                      className="w-full text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    >
                      Sign In
                    </button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
