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
    role: "",
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
    try {
      const response = await axios.post(`${BASE_URL}/register`, form);
      localStorage.setItem("token", response.data.data.token);
      setSuccess("Register successful!");
      console.log(response.data.data.token);

      setTimeout(() => {
        navigate("/login");
      }, 2000);
      console.log(response);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, handleRegister, handleChange, error, success };
};

export default useRegister;
