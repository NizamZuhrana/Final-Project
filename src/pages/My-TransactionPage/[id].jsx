import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

const MyTransactionID = ({ onClose }) => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [transactionDetail, setTransactionDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { id } = useParams();
  const [transactionItemsDetail, setTransactionItemsDetail] = useState(null);
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState("");
  const [isCancelled, setIsCancelled] = useState(false);  // State untuk menyimpan status apakah transaksi dibatalkan

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

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (!selectedFile) {
      Swal.fire({
        title: "Tidak ada file yang dipilih!",
        icon: "error",
      });
      return;
    }

    if (selectedFile.size > 500 * 1024) {
      Swal.fire({
        title: "Ukuran file melebihi batas! Maksimum 500 KB",
        icon: "error",
      });
      return;
    }

    setFile(selectedFile);
  };

  const uploadFile = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(`${BASE_URL}/upload-image`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setUrl(response.data.result);
    } catch (err) {
      console.error(err);
    }
  };

  const updateProofPayment = async () => {
    if (!url) {
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${BASE_URL}/transaction/update-proof-payment/${transactionDetail.id}`,
        {
          proof_payment_url: url,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      console.log(response);

      Swal.fire({
        title: "Bukti pembayaran telah diperbarui!",
        icon: "success",
      });

      window.location.reload();
    } catch (err) {
      console.error(err);
      Swal.fire({
        title: "Gagal memperbarui bukti pembayaran!",
        icon: "error",
      });
    }
  };

  const cancelTransaction = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${BASE_URL}/transaction/cancel/${transactionDetail.id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      Swal.fire({
        title: "Transaksi berhasil dibatalkan!",
        icon: "success",
      });

      setIsCancelled(true);  // Update status transaksi dibatalkan
    } catch (err) {
      console.error(err);
      Swal.fire({
        title: "Gagal membatalkan transaksi!",
        icon: "error",
      });
    }
  };

  useEffect(() => {
    if (file) {
      uploadFile();
    }
  }, [file]);

  if (loading)
    return <p className="text-center">Loading detail transaksi...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full max-w-3xl p-6 bg-white rounded-lg">
        <button
          className="absolute text-gray-500 top-2 right-2 hover:text-gray-700"
          onClick={onClose}
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
            <h3 className="mt-4 text-xl font-bold text-gray-800">Bukti Transaksi:</h3>
            {transactionDetail.proof_payment_url ? (
              <img
                src={url || transactionDetail.proof_payment_url}
                alt="Bukti Pembayaran"
                className="object-cover w-full p-2 border-2 border-gray-200 rounded-lg shadow-lg max-h-60"
              />
            ) : (
              <p className="text-gray-500">Belum ada bukti pembayaran</p>
            )}
            {!transactionDetail.proof_payment_url && (
              <>
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="mt-2"
                />
                <button
                  onClick={updateProofPayment}
                  className="px-4 py-2 mt-2 text-white transition bg-blue-500 rounded hover:bg-blue-600 disabled:bg-gray-300"
                >
                  Perbarui Bukti Pembayaran
                </button>
              </>
            )}

            {/* Tombol Batalkan Transaksi */}
            {!isCancelled && (
              <div className="mt-4">
                <button
                  onClick={cancelTransaction}
                  className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600 disabled:bg-gray-300"
                  disabled={transactionDetail.status === "cancelled"}
                >
                  Batalkan Transaksi
                </button>
              </div>
            )}
          </>
        ) : (
          <p className="text-center text-gray-500">Tidak ada detail transaksi.</p>
        )}
      </div>
    </div>
  );
};

export default MyTransactionID;
