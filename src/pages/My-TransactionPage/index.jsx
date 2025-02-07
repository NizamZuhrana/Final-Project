import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MyTransaction = () => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Fungsi untuk mengambil semua transaksi
  const fetchTransaction = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token tidak ditemukan. Silakan login kembali.");
      }
      const response = await axios.get(
        `${BASE_URL}/my-transaction?is_paginate=false&per_page=5&page=1&search`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      setTransactions(response.data.result || []);
    } catch (err) {
      console.error(err);
      setError(err.message || "Gagal mengambil data transaksi.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransaction();
  }, []);

  const handleCardClick = (transactionId) => {
    navigate(`/my-transaction/${transactionId}`);
  };

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  // Pisahkan transaksi yang dibatalkan
  const activeTransactions = transactions.filter(
    (transaction) => transaction.status !== "cancelled"
  );
  const cancelledTransactions = transactions.filter(
    (transaction) => transaction.status === "cancelled"
  );

  return (
    <div className="max-w-3xl p-6 mx-auto">
      <h2 className="mb-4 text-2xl font-bold text-gray-800">Transaksi Saya</h2>

      {/* Transaksi yang aktif */}
      <h3 className="text-xl font-semibold text-gray-800">Transaksi Aktif</h3>
      {activeTransactions.length > 0 ? (
        activeTransactions.map((transaction) => (
          <div
            key={transaction.id}
            className="p-6 mb-4 bg-white border border-gray-200 rounded-lg shadow-lg cursor-pointer"
            onClick={() => handleCardClick(transaction.id)} // Set ID saat card diklik
          >
            <p className="text-lg font-semibold">Invoice: {transaction.invoice_id}</p>
            <p className="text-sm text-gray-600">Status: {transaction.status}</p>
            <p className="mt-2 text-lg font-semibold">
              Total Pembayaran: Rp.{" "}
              {transaction.total_amount.toLocaleString()}
            </p>
            <p className="text-sm text-gray-600">Tanggal Pemesanan: {transaction.order_date}</p>
            <p className="text-sm text-gray-600">Tanggal Kedaluwarsa: {transaction.expired_date}</p>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">Tidak ada transaksi aktif.</p>
      )}

      {/* Transaksi yang dibatalkan */}
      <h3 className="mt-6 text-xl font-semibold text-gray-800">Transaksi Dibatalkan</h3>
      {cancelledTransactions.length > 0 ? (
        cancelledTransactions.map((transaction) => (
          <div
            key={transaction.id}
            className="p-6 mb-4 bg-white border border-gray-200 rounded-lg shadow-lg"
          >
            <p className="text-lg font-semibold">Invoice: {transaction.invoice_id}</p>
            <p className="text-sm text-gray-600">Status: {transaction.status}</p>
            <p className="mt-2 text-lg font-semibold">
              Total Pembayaran: Rp.{" "}
              {transaction.total_amount.toLocaleString()}
            </p>
            <p className="text-sm text-gray-600">Tanggal Pemesanan: {transaction.order_date}</p>
            <p className="text-sm text-gray-600">Tanggal Kedaluwarsa: {transaction.expired_date}</p>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">Tidak ada transaksi yang dibatalkan.</p>
      )}

      {/* Render detail transaksi jika ID dipilih */}
      <p className="mt-4 text-center text-gray-500">Halaman 1 dari 1</p>
    </div>
  );
};

export default MyTransaction;
