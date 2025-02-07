import { useState, useEffect } from "react";
import axios from "axios";

const useDeleteCategories = () => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Ambil token dari localStorage
  const token = localStorage.getItem("token");

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/sport-categories`, {
        headers: { Authorization: `Bearer ${token}` }, // Pastikan token dikirim
      });
      setCategories(response.data);
    } catch (err) {
      console.error("Gagal mengambil kategori:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCheckboxChange = (categoryId) => {
    setSelectedCategories((prevSelected) =>
      prevSelected.includes(categoryId)
        ? prevSelected.filter((id) => id !== categoryId)
        : [...prevSelected, categoryId]
    );
  };

  const handleDelete = async () => {
    if (selectedCategories.length === 0) {
      alert("Pilih kategori yang ingin dihapus!");
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("token"); // Pastikan token ada
      if (!token) {
        alert("Token tidak ditemukan! Silakan login ulang.");
        return;
      }

      await Promise.all(
        selectedCategories.map(async (categoryId) => {
          const response = await axios.delete(
            `${BASE_URL}/sport-categories/delete/${categoryId}`, // Pastikan URL benar
            {
              headers: { Authorization: `Bearer ${token}` }, // Kirim token
            }
          );
          console.log(`Kategori ${categoryId} berhasil dihapus`, response.data);
        })
      );

      window.location.reload();
      fetchCategories();
      setSelectedCategories([]);
    } catch (err) {
      console.error(
        "Error saat menghapus kategori:",
        err.response?.data || err
      );
      alert(
        `Gagal menghapus kategori: ${
          err.response?.data?.message || "Unknown error"
        }`
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCardClick = (categoryId) => {
    setSelectedCategories((prevSelected) =>
      prevSelected.includes(categoryId)
        ? prevSelected.filter((id) => id !== categoryId)
        : [...prevSelected, categoryId]
    );
  };

  return {
    categories,
    selectedCategories,
    loading,
    handleCheckboxChange,
    handleDelete,
    handleCardClick,
  };
};

export default useDeleteCategories;
