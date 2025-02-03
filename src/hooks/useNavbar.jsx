import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const useNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const dropdownRef = useRef(null);
  const lastScrollTop = useRef(0);
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    // Fungsi untuk menangani perubahan scroll
    const handleScroll = () => {
      const { scrollY } = window;
      setIsVisible(scrollY < lastScrollTop.current);
      lastScrollTop.current = scrollY <= 0 ? 0 : scrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
  
    if (token) {
      axios
        .get(`${BASE_URL}/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        })
        .then((response) => {
          console.log("User Data:", response.data); // Debugging
          if (response.data.success) {
            setIsLoggedIn(true);
            setUserData(response.data.data);
          }
        })
        .catch((error) => {
          console.error("Gagal mengambil data pengguna:", error);
          setIsLoggedIn(false);
          setUserData(null);
        });
    }
  }, [BASE_URL]);
  

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUserData(null);
    navigate("/login");
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleProfileMenu = () => setShowProfileMenu((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return {
    isMenuOpen,
    toggleMenu,
    isVisible,
    isLoggedIn,
    handleLogout,
    userData,
    showProfileMenu,
    toggleProfileMenu,
    dropdownRef,
  };
};

export default useNavbar;
