import React, { useState } from "react";
import axios from "axios";

const UpdateCategoryModal = ({ isOpen, onClose, category, onCategoryUpdated }) => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [categoryName, setCategoryName] = useState(category?.name || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleUpdateCategory = async () => {
    if (!categoryName) {
      alert("Nama kategori tidak boleh kosong");
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Token tidak ditemukan, silakan login ulang.");
        setLoading(false);
        return;
      }

      const response = await axios.post(
        `${BASE_URL}/sport-categories/update/${category.id}`,
        { name: categoryName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setLoading(false);
      onCategoryUpdated(response.data);
      setCategoryName("");
      onClose();
    } catch (err) {
      setLoading(false);
      setError("Gagal memperbarui kategori. Pastikan Anda memiliki akses.");
      console.error(err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold">Update Kategori</h3>
        <input
          type="text"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          placeholder="Masukkan nama kategori"
          className="w-full px-3 py-2 mt-4 border border-gray-300 rounded-md"
        />
        {error && <p className="mt-2 text-red-500">{error}</p>}
        <div className="flex justify-between mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded-md"
          >
            Batal
          </button>
          <button
            onClick={handleUpdateCategory}
            className="px-4 py-2 text-white bg-blue-500 rounded-md"
            disabled={loading}
          >
            {loading ? "Memperbarui..." : "Update Kategori"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateCategoryModal;
