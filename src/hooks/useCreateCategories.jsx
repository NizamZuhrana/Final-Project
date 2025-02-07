import { useState } from "react";
import axios from "axios";

const useCreateCategory = () => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const createCategory = async (categoryName) => {
    try {
      setLoading(true);
      const response = await axios.post(`${BASE_URL}/sport-categories/create`, {
        name: categoryName,
      });
      setLoading(false);
      return response.data; // Mengembalikan data kategori yang baru dibuat
    } catch (err) {
      setLoading(false);
      setError("Gagal membuat kategori");
      console.error(err);
      return null;
    }
  };

  return {
    createCategory,
    loading,
    error,
  };
};

export default useCreateCategory;
