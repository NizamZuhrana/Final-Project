import React, { useState } from "react";
import axios from "axios";

const CreateActivitiesModal = ({ isOpen, onClose, onActivityCreated }) => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    slot: "",
    price: "",
    address: "",
    activity_date: "",
    start_time: "",
    end_time: "",
    map_url: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCreateActivity = async () => {
    if (
      !formData.title ||
      !formData.address ||
      !formData.activity_date ||
      !formData.start_time ||
      !formData.end_time
    ) {
      alert("Pastikan semua data yang diperlukan telah diisi.");
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
        `${BASE_URL}/sport-activities/create`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      setLoading(false);
      onActivityCreated(response.data.result);
      setFormData({
        title: "",
        description: "",
        slot: 1,
        price: 1000,
        address: "",
        activity_date: "",
        start_time: "",
        end_time: "",
        map_url: "",
      });
      onClose();
    } catch (err) {
      setLoading(false);
      setError("Gagal membuat aktivitas. Pastikan Anda memiliki akses.");
      console.error("Error Response:", err.response?.data || err.message);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold">Buat Aktivitas Baru</h3>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Judul Aktivitas"
          className="w-full px-3 py-2 mt-4 border border-gray-300 rounded-md"
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Deskripsi"
          className="w-full px-3 py-2 mt-4 border border-gray-300 rounded-md"
        ></textarea>
        <input
          type="number"
          name="slot"
          value={formData.slot}
          onChange={handleChange}
          placeholder="Jumlah Slot"
          className="w-full px-3 py-2 mt-4 border border-gray-300 rounded-md"
        />
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Harga"
          className="w-full px-3 py-2 mt-4 border border-gray-300 rounded-md"
        />
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Alamat"
          className="w-full px-3 py-2 mt-4 border border-gray-300 rounded-md"
        />
        <input
          type="date"
          name="activity_date"
          value={formData.activity_date}
          onChange={handleChange}
          className="w-full px-3 py-2 mt-4 border border-gray-300 rounded-md"
        />
        <input
          type="time"
          name="start_time"
          value={formData.start_time}
          onChange={handleChange}
          className="w-full px-3 py-2 mt-4 border border-gray-300 rounded-md"
        />
        <input
          type="time"
          name="end_time"
          value={formData.end_time}
          onChange={handleChange}
          className="w-full px-3 py-2 mt-4 border border-gray-300 rounded-md"
        />
        <input
          type="text"
          name="map_url"
          value={formData.map_url}
          onChange={handleChange}
          placeholder="URL Peta"
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
            onClick={handleCreateActivity}
            className="px-4 py-2 text-white bg-blue-500 rounded-md"
            disabled={loading}
          >
            {loading ? "Membuat..." : "Buat Aktivitas"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateActivitiesModal;
