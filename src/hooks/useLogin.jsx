import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const useLogin = () => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleChange = (e) => {
    setError("");
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${BASE_URL}/login`, form);
      const userData = response.data.data;

      console.log("User Data dari backend:", userData);

      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("token", userData.token);

      setSuccess("Login successful!");

      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      console.error("Login error:", error);
      setError("Invalid username or password!");
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    handleLogin,
    handleChange,
    error,
    success,
    togglePasswordVisibility,
    showPassword,
  };
};

export default useLogin;

//   const BASE_URL = import.meta.env.VITE_BASE_URL;
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   const handleLogin = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.post(`${BASE_URL}/login`, {
//         email,
//         password,
//       });
//       localStorage.setItem("token", response.data.data.token);
//       setTimeout(() => {
//         navigate("/");
//       }, 2000);
//       console.log(response);
//       setSuccess("Login successful!");
//     } catch (error) {
//       console.error(error);
//       setError("invalid username or password...");
//     } finally {
//       setLoading(false);
//     }
//   };
//   return {
//     handleLogin,
//     email,
//     setEmail,
//     password,
//     setPassword,
//     loading,
//     error,
//     success
//   };
