import useNavbar from "../../hooks/useNavbar";
import { Link } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";
import ProfileModal from "../ProfileModal";
import { useState } from "react";

const Navbar = () => {
  const {
    isMenuOpen,
    toggleMenu,
    isVisible,
    isLoggedIn,
    handleLogout,
    userData,
    toggleProfileMenu,
    showProfileMenu,
    dropdownRef,
  } = useNavbar();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleProfileClick = () => {
    if (!showProfileMenu) {
      toggleProfileMenu(); // Buka dropdown jika belum terbuka
    } else {
      setIsProfileOpen(true); // Jika dropdown sudah terbuka, langsung buka modal
    }
  };

  return (
    <div
      className={`fixed top-2 left-1/2 -translate-x-1/2 w-[100%] md:w-[70%] bg-black/50 backdrop-blur-md shadow-lg transition-transform duration-300 lg:rounded-full md:rounded-full z-50 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <nav className="flex items-center justify-between p-2">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <img
            src="/logo-oyokkk.png"
            alt="logo"
            className="object-contain h-8"
          />
          <span className="text-xl font-semibold text-white uppercase hover:text-gray-200">
            Oyok
          </span>
        </Link>

        {/* Menu Desktop */}
        <div className="hidden space-x-6 md:flex">
          <a
            href="#home"
            className="text-sm text-white transition hover:text-gray-200"
          >
            Home
          </a>
          <a
            href="#experience"
            className="text-sm text-white transition hover:text-gray-200"
          >
            Experience
          </a>
          <a
            href="#contact"
            className="text-sm text-white transition hover:text-gray-200"
          >
            Contact
          </a>
        </div>

        {/* Tombol Login / Profil */}
        <div className="relative hidden space-x-2 md:flex">
          {isLoggedIn ? (
            <div className="relative">
              <button
                onClick={handleProfileClick}
                className="w-8 h-8 overflow-hidden rounded-full"
              >
                <FaRegUserCircle className="object-cover w-full h-full text-white" />
              </button>
              {showProfileMenu && !isProfileOpen && (
                <div
                  ref={dropdownRef}
                  className="absolute right-0 mt-2 bg-white rounded-lg shadow-lg w-44"
                >
                  <div className="px-4 py-2 text-sm text-gray-900">
                    <div className="text-xl font-medium truncate">
                      {userData?.role || "Role"}
                    </div>
                    {/* <div>{userData?.name || "Nama Pengguna"}</div> Nama dari API */}
                    {/* <div className="font-medium truncate">{userData?.email || "Email"}</div> */}
                  </div>
                  <ul className="py-2 text-sm text-gray-700">
                    <li>
                      <a
                        href={
                          userData?.role === "user"
                            ? "/my-transaction"
                            : "/dashboard"
                        }
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        {userData?.role === "user"
                          ? "My Transaction"
                          : "Dashboard"}
                      </a>
                    </li>
                    <li>
                      <a
                        onClick={() => setIsProfileOpen(true)}
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        Profile
                      </a>
                    </li>
                  </ul>
                  <div className="py-2">
                    <button
                      onClick={handleLogout}
                      className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
                    >
                      Sign out
                    </button>
                  </div>
                </div>
              )}
              <ProfileModal
                isOpen={isProfileOpen}
                onClose={() => setIsProfileOpen(false)}
                userData={userData}
              />
            </div>
          ) : (
            <>
              <Link to="/register">
                <button className="px-5 py-2 text-sm font-medium text-gray-900 rounded-lg bg-gradient-to-r from-teal-200 to-lime-200">
                  Sign Up
                </button>
              </Link>
              <Link to="/login">
                <button className="px-5 py-2 text-sm font-medium text-gray-900 rounded-lg bg-gradient-to-r from-red-200 via-red-300 to-yellow-200">
                  Sign In
                </button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={toggleMenu}>
            <svg
              className="w-6 h-6 text-white"
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
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="p-2 md:hidden backdrop-blur-md">
          <a
            href="#home"
            className="block py-1 text-sm text-white transition hover:text-gray-200"
          >
            Home
          </a>
          <a
            href="#experience"
            className="block py-1 text-sm text-white transition hover:text-gray-200"
          >
            Experience
          </a>
          <a
            href="#contact"
            className="block py-1 text-sm text-white transition hover:text-gray-200"
          >
            Contact
          </a>
          <div className="mt-2 space-y-2">
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="w-full py-1 text-sm text-center text-black bg-gray-200 rounded-lg"
              >
                Logout
              </button>
            ) : (
              <>
                <Link to="/register">
                  <button className="w-full py-1 text-sm font-medium text-gray-900 rounded-lg bg-gradient-to-r from-teal-200 to-lime-200">
                    Sign Up
                  </button>
                </Link>
                <Link to="/login">
                  <button className="w-full py-1 text-sm font-medium text-gray-900 rounded-lg bg-gradient-to-r from-red-200 via-red-300 to-yellow-200">
                    Sign In
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
