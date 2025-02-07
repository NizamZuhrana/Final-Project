import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const useUpdateCategory = () => {
  const updateCategory = async (id, name) => {
    try {
      const response = await axios.post(`${BASE_URL}/sport-categories/update/${id}`, { name });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  return { updateCategory };
};