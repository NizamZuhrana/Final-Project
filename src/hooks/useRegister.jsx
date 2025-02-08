import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const useRegister = () => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [form, setForm] = useState({
    email: "",
    name: "",
    password: "",
    c_password: "",
    role: "user", 
    phone_number: "",
  });

  const handleChange = (e) => {
    setError("");
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    console.log("Submitting data:", form);

    try {
      const response = await axios.post(`${BASE_URL}/register`, form);
      localStorage.setItem("token", response.data.data.token);
      setSuccess("Register successful!");

      console.log("Registration Success:", response.data);

      navigate("/login");
    } catch (error) {
      setError(error.response?.data?.message || "Registration failed!");
      console.error("Registration Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, handleRegister, handleChange, error, success };
};

export default useRegister;
