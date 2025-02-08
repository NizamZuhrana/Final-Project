import { useState, useEffect } from "react";
import axios from "axios";

const useAllUsers = () => {
  const [user, setUser] = useState(null); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("{{BASE_URL}}/me", { withCredentials: true });
        setUser(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return { user, loading, error };
};

export default useAllUsers;
