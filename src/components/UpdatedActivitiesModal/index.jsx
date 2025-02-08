import React, { useState, useEffect } from "react";
import axios from "axios";

const UpdateActivitiesModal = ({ isOpen, onClose, activityId, onActivityUpdated }) => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [formData, setFormData] = useState({
    sport_category_id: "",
    city_id: "",
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

  useEffect(() => {
    if (!activityId) return;
    
    const fetchActivityData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${BASE_URL}/sport-activities/${activityId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFormData(response.data);
      } catch (err) {
        console.error("Error fetching activity data:", err);
      }
    };
    
    fetchActivityData();
  }, [activityId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdateActivity = async () => {
    if (!activityId) {
      alert("Activity ID tidak ditemukan.");
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${BASE_URL}/sport-activities/update/${activityId}`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setLoading(false);
      onActivityUpdated(response.data);
      onClose();
    } catch (err) {
      setLoading(false);
      setError("Gagal memperbarui aktivitas. Pastikan semua data benar.");
      console.error("Error updating activity:", err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold">Update Aktivitas</h3>
        <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Judul Aktivitas" className="w-full px-3 py-2 mt-4 border border-gray-300 rounded-md" />
        <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Deskripsi" className="w-full px-3 py-2 mt-4 border border-gray-300 rounded-md"></textarea>
        <input type="number" name="slot" value={formData.slot} onChange={handleChange} placeholder="Jumlah Slot" className="w-full px-3 py-2 mt-4 border border-gray-300 rounded-md" />
        <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Harga" className="w-full px-3 py-2 mt-4 border border-gray-300 rounded-md" />
        <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Alamat" className="w-full px-3 py-2 mt-4 border border-gray-300 rounded-md" />
        <input type="date" name="activity_date" value={formData.activity_date} onChange={handleChange} className="w-full px-3 py-2 mt-4 border border-gray-300 rounded-md" />
        <input type="time" name="start_time" value={formData.start_time} onChange={handleChange} className="w-full px-3 py-2 mt-4 border border-gray-300 rounded-md" />
        <input type="time" name="end_time" value={formData.end_time} onChange={handleChange} className="w-full px-3 py-2 mt-4 border border-gray-300 rounded-md" />
        <input type="text" name="map_url" value={formData.map_url} onChange={handleChange} placeholder="URL Peta" className="w-full px-3 py-2 mt-4 border border-gray-300 rounded-md" />
        {error && <p className="mt-2 text-red-500">{error}</p>}
        <div className="flex justify-between mt-4">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded-md">Batal</button>
          <button onClick={handleUpdateActivity} className="px-4 py-2 text-white bg-blue-500 rounded-md" disabled={loading}>{loading ? "Memperbarui..." : "Update Aktivitas"}</button>
        </div>
      </div>
    </div>
  );
};

export default UpdateActivitiesModal;
