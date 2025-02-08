import { useState, useEffect } from "react";
import axios from "axios";

const useDeleteActivities = () => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [activities, setActivities] = useState([]);
  const [selectedActivities, setSelectedActivities] = useState([]);
  const [loadingActivities, setLoadingActivities] = useState(false);


  const token = localStorage.getItem("token");
  const fetchActivities = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/sport-activities`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setActivities(response.data);
    } catch (err) {
      console.error("Gagal mengambil aktivitas:", err);
    } finally {
      setLoadingActivities(false);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  const handleDeleteActivities = async () => {
    console.log("Deleting activities:", selectedActivities); 
  
    if (selectedActivities.length === 0) {
      alert("Pilih aktivitas yang ingin dihapus!");
      return;
    }
  
    try {
      setLoadingActivities(true);
      if (!token) {
        alert("Token tidak ditemukan! Silakan login ulang.");
        return;
      }
  
      await Promise.all(
        selectedActivities.map(async (activityId) => {
          await axios.delete(`${BASE_URL}/sport-activities/delete/${activityId}`, {
            headers: { 
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json"
            },
          });
        })
      );
  
      setSelectedActivities([]); 
      fetchActivities(); 
    } catch (err) {
      console.error("Error saat menghapus aktivitas:", err.response?.data || err);
      alert(`Gagal menghapus aktivitas: ${err.response?.data?.message || "Unknown error"}`);
    } finally {
      setLoadingActivities(false);
    }
  };
  
  const handleCardClickActivities = (id) => {
    setSelectedActivities((prevSelected) => {
      const newSelected = prevSelected.includes(id)
        ? prevSelected.filter((activityId) => activityId !== id)
        : [...prevSelected, id];

      console.log("Selected Activities:", newSelected); 
      return newSelected;
    });
  };
  

  return {
    activities,
    selectedActivities,
    setSelectedActivities, 
    loadingActivities,
    handleDeleteActivities,
    handleCardClickActivities,
  };
};

export default useDeleteActivities;
