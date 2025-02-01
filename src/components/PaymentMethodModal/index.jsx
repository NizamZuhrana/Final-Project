import { useEffect, useState } from "react";
import axios from "axios";

const PaymentMethodModal = ({ isOpen, setIsOpen, onSelectPaymentMethod }) => {
  const [paymentInfo, setPaymentInfo] = useState(null);
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    const fetchPayment = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${BASE_URL}/payment-methods`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });
        setPaymentInfo(response.data.result);
      } catch (error) {
        console.error(error);
      }
    };

    if (isOpen) {
      fetchPayment();
    }
  }, [isOpen]);

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center p-4 bg-gray-900 bg-opacity-50 sm:p-6 md:p-8">
      <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-xl md:max-w-md lg:max-w-lg">
        <h2 className="mb-4 text-xl font-bold text-center text-gray-800 sm:text-2xl">
          Pilih Metode Pembayaran
        </h2>

        <div className="mt-4 space-y-4 overflow-y-auto max-h-80 sm:max-h-96">
          {paymentInfo ? (
            paymentInfo.map((method) => (
              <button
                key={method.id}
                onClick={() => {
                  onSelectPaymentMethod(method);
                  setIsOpen(false);
                }}
                className="flex items-center justify-between w-full p-4 transition-all bg-white rounded-lg shadow-md hover:shadow-lg hover:bg-blue-700 focus:outline-none"
              >
                {/* Gambar Metode */}
                <img
                  src={method.image_url}
                  alt={method.name}
                  className="object-contain w-10 h-10 rounded-md sm:w-12 sm:h-12"
                />

                {/* Info */}
                <div className="flex-1 ml-4 text-left">
                  <p className="text-sm font-semibold text-gray-800 sm:text-lg">
                    {method.name}
                  </p>
                  <p className="text-xs text-gray-600 sm:text-sm">
                    <span className="font-medium">VA:</span> {method.virtual_account_number}
                  </p>
                  <p className="text-xs text-gray-600 sm:text-sm">
                    <span className="font-medium">Nama:</span> {method.virtual_account_name}
                  </p>
                </div>
              </button>
            ))
          ) : (
            <p className="text-center text-gray-500">Loading payment methods...</p>
          )}
        </div>

        <div className="mt-6">
          <button
            onClick={() => setIsOpen(false)}
            className="w-full py-2 font-semibold text-white bg-gray-400 rounded-lg hover:bg-gray-500"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethodModal;
