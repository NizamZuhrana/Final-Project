import { useState, useEffect } from "react";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const useAllTransaction = () => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getAllTransaction = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                throw new Error("Token tidak ditemukan");
            }
            const response = await axios.get(`${BASE_URL}/all-transaction?is_paginate=false`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
            });
    
            const result = response.data.result;
            setTransactions(result || []); // Default ke array kosong
        } catch (error) {
            setError(error.message);
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };
    

    useEffect(() => {
        getAllTransaction();
    }, []);

    return { transactions, loading, error };
};
