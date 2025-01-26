import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); 
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); 
  };

  const [isVisible, setIsVisible] = useState(true);
  const lastScrollTop = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollY } = window;
      if (scrollY > lastScrollTop.current) {
        setIsVisible(false); // Hide navbar on scroll down
      } else if (scrollY < lastScrollTop.current) {
        setIsVisible(true); // Show navbar on scroll up
      }
      lastScrollTop.current = scrollY <= 0 ? 0 : scrollY; // Prevent negative values
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll); // Cleanup event listener
  }, []);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const dropdownRef = useRef(null);

  const toggleProfileMenu = () => {
    setShowProfileMenu((prev) => !prev);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup the event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  return { isMenuOpen, toggleMenu, isVisible, isLoggedIn, handleLogout, showProfileMenu, toggleProfileMenu, dropdownRef };
};

export default useNavbar;
