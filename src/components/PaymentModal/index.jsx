import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const PaymentModal = ({
  isOpen,
  onClose,
  data,
  selectedPaymentMethod,
  setShowPaymentMethodModal,
  setSelectedPaymentMethod,
}) => {
  if (!isOpen) return null;
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const navigate = useNavigate();
  console.log(data);
  

  const handlePayment = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${BASE_URL}/transaction/create`,
        {
          sport_activity_id: data.id,
          payment_method_id: selectedPaymentMethod?.id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );
      Swal.fire({
        title: "Pembayaran berhasil! Order ID: " + response.data.order_id,
        icon: "success",
        draggable: true
      });
      navigate("/my-transaction");
    } catch (error) {
      Swal.fire({
        title: "Terjadi kesalahan saat melakukan pembayaran",
        icon: "success",
        draggable: true
      });
      console.error("Payment Error:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-xl">
        <h2 className="mb-4 text-2xl font-bold text-center text-gray-800">
          Rincian Biaya
        </h2>

        <div className="p-6 mt-4 bg-gray-100 rounded-lg shadow-md">
          <div className="mb-4 text-center">
            <p className="text-2xl font-semibold text-gray-800">{data.title}</p>
            <p className="text-lg text-gray-600">Tanggal: {data.activity_date}</p>
            <p className="mt-2 text-2xl font-bold text-blue-600">
              {data.start_time} - {data.end_time}
            </p>
            <p className="mt-2 text-lg font-semibold text-gray-800">
              Lokasi: {data.address}
            </p>
          </div>

          <div className="mt-6">
            <p className="flex justify-between text-lg font-medium text-gray-700">
              Pendaftaran
              <span className="font-semibold text-gray-800">
                Rp. {data.price.toLocaleString()}
              </span>
            </p>
            <p className="flex justify-between text-lg font-medium text-gray-700">
              Biaya Layanan
              <span className="font-semibold text-gray-800">Rp. 0</span>
            </p>
            <p className="flex justify-between mt-4 text-xl font-bold text-gray-700">
              Total
              <span className="font-bold text-blue-600">
                Rp. {data.price.toLocaleString()}
              </span>
            </p>
          </div>

          <div className="mt-6">
            <p className="flex justify-between text-lg font-medium text-gray-700">
              Metode Pembayaran
              {selectedPaymentMethod ? (
                <img
                  src={selectedPaymentMethod.image_url}
                  alt={selectedPaymentMethod.name}
                  className="w-12 h-12 rounded-md cursor-pointer"
                  onClick={() => setShowPaymentMethodModal(true)}
                />
              ) : (
                <span
                  className="text-blue-500 cursor-pointer"
                  onClick={() => setShowPaymentMethodModal(true)}
                >
                  Belum dipilih
                </span>
              )}
            </p>
          </div>
        </div>

        <div className="flex gap-4 mt-6">
          <button
            onClick={onClose}
            className="w-1/2 py-2 font-semibold text-white bg-gray-400 rounded-lg hover:bg-gray-500"
          >
            Tutup
          </button>
          <button
            onClick={handlePayment}
            className="w-1/2 py-2 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700"
            disabled={!selectedPaymentMethod}
          >
            Lanjut Pembayaran
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
