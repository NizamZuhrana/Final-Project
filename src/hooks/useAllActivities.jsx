import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const useAllActivities = () => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activities, setActivities] = useState([]);

  const fetchActivities = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${BASE_URL}/sport-activities`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        params: {
          is_paginate: false,
          per_page: 5,
          page: 1,
        },
      });
      setActivities(response?.data?.result || []);
    } catch (error) {
      console.error("Error fetching activities:", error);
      setActivities([]);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, []);
  return { activities, error, loading };
};

export default useAllActivities;
