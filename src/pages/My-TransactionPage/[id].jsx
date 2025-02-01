import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const MyTransactionID = ({ onClose }) => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [transactionDetail, setTransactionDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const {id} = useParams();
    const [transactionItemsDetail, setTransactionItemsDetail] = useState(null);

  // Fungsi untuk mengambil detail transaksi berdasarkan ID
  const fetchTransactionById = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token tidak ditemukan. Silakan login kembali.");
      }
      const response = await axios.get(`${BASE_URL}/transaction/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      setTransactionDetail(response.data.result);
      setTransactionItemsDetail(response.data.result.transaction_items);
    } catch (err) {
      console.error(err);
      setError(err.message || "Gagal mengambil detail transaksi.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactionById();
  }, [id]);

  if (loading) return <p className="text-center">Loading detail transaksi...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full max-w-3xl p-6 bg-white rounded-lg">
        <button
          className="absolute text-gray-500 top-2 right-2 hover:text-gray-700"
          onClick={onClose} // Tutup modal
        >
          &times;
        </button>
        <h2 className="mb-4 text-2xl font-bold text-gray-800">Detail Transaksi</h2>
        {transactionDetail ? (
          <>
            <p>
              <strong>Invoice:</strong> {transactionDetail.invoice_id}
            </p>
            <p>
              <strong>Status:</strong> {transactionDetail.status}
            </p>
            <p>
              <strong>Total Bayar:</strong> Rp.{" "}
              {transactionDetail.total_amount.toLocaleString()}
            </p>
            <p>
              <strong>Tanggal Pemesanan:</strong> {transactionDetail.order_date}
            </p>
            <p>
              <strong>Tanggal Kedaluwarsa:</strong> {transactionDetail.expired_date}
            </p>
            <h3 className="mt-4 text-xl font-bold text-gray-800">Item Transaksi</h3>
            <p>{transactionDetail.transaction_items.title}</p>
            <p>
              <strong>Deskripsi:</strong> {transactionItemsDetail.sport_activities.description}
            </p>
            <p>
              <strong>Harga:</strong> Rp. {transactionItemsDetail.sport_activities.price.toLocaleString()}
            </p>
            <p>
              <strong>Tanggal Aktivitas:</strong> {transactionItemsDetail.sport_activities.activity_date} |{" "}
              {transactionDetail.start_time} - {transactionItemsDetail.sport_activities.end_time}
            </p>
            <p>
              <strong>Lokasi:</strong> {transactionItemsDetail.sport_activities.address}
            </p>
            <h3 className="mt-4 text-xl font-bold text-gray-800">Bukti Transaksi</h3>
            <p>{transactionDetail.payment_proof ? "Ada bukti pembayaran" : "Belum ada bukti pembayaran"}</p>
          </>
        ) : (
          <p className="text-center text-gray-500">Tidak ada detail transaksi.</p>
        )}
      </div>
    </div>
  );
};

export default MyTransactionID;