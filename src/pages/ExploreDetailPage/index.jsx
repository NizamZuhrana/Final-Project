import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Football from "../../assets/football2.jpg";
import Futsal from "../../assets/futsal3.jpg";
import PaymentMethodModal from "../../components/PaymentMethodModal";

const ExploreDetailPage = ({ isOpen, setIsOpen }) => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showPaymentMethodModal, setShowPaymentMethodModal] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);

  const fetchDetails = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${BASE_URL}/sport-activities/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      setData(response.data.result);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleOrder = () => {
    setShowPaymentModal(true);
  };

  const imagesMap = {
    "Sepak Bola": Football,
    Futsal: Futsal,
  };

  const handlePaymentMethodSelection = (method) => {
    setSelectedPaymentMethod(method);
    setShowPaymentMethodModal(false); // Show modal to select payment method
  };

  useEffect(() => {
    fetchDetails(); // Fetch data when the page loads
  }, [id]); // Only rerun if 'id' changes

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      {/* <div className="relative z-50 mb-5">
        <Navbar />
      </div> */}
      <div className="flex flex-col max-w-4xl gap-6 p-6 mx-auto md:flex-row">
        {/* Card Kiri - Detail */}
        <div className="w-full p-6 bg-white shadow-lg md:w-2/3 rounded-2xl">
          <div className="mb-4">
            <img
              src={imagesMap[data.sport_category.name]}
              alt="Activity"
              className="object-cover w-full h-64 bg-gray-200 rounded-lg"
            />
          </div>
          <h1 className="mb-2 text-2xl font-bold">{data.title}</h1>
          <p className="text-gray-600">{data.description}</p>
          <div className="mt-4 space-y-2">
            <p>
              <strong>Harga:</strong> Rp {data.price.toLocaleString()}
            </p>
            <p>
              <strong>Lokasi:</strong> {data.address}
            </p>
            <p>
              <strong>Waktu:</strong> {data.start_time} - {data.end_time}
            </p>
            <p>
              <strong>Organizer:</strong> {data.organizer.name}
            </p>
            <p>
              <strong>Kota:</strong> {data.city.city_name}
            </p>
          </div>
          <div className="mt-6">
            <p className="mt-1 text-sm text-gray-700">
              <strong>Lokasi:</strong>{" "}
              <a
                href={data.map_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-600 hover:underline"
              >
                {data.address}
              </a>
            </p>
          </div>
        </div>

        {/* Card Kanan - Order */}
        <div className="flex flex-col justify-between w-full p-6 bg-white shadow-lg md:w-1/3 rounded-2xl">
          <div>
            <h2 className="mb-2 text-xl font-semibold">Order Sekarang</h2>
            <p className="text-gray-500">
              Harga:{" "}
              <span className="text-lg font-bold">
                Rp {data.price.toLocaleString()}
              </span>
            </p>
          </div>
          <button
            onClick={handleOrder}
            className="w-full py-3 mt-4 font-semibold text-white transition bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            Order Sekarang
          </button>
        </div>

        {/* Modal Pembayaran */}
        {showPaymentModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-xl">
              <h2 className="mb-4 text-2xl font-bold text-center text-gray-800">
                Rincian Biaya
              </h2>

              <div className="p-6 mt-4 bg-gray-100 rounded-lg shadow-md">
                <div className="mb-4 text-center">
                  <p className="text-2xl font-semibold text-gray-800">
                    {data.title}
                  </p>
                  <p className="text-lg text-gray-600">
                    Tanggal: {data.activity_date}
                  </p>
                  <p className="mt-2 text-2xl font-bold text-blue-600">
                    {data.start_time} - {data.end_time}
                  </p>
                  <p className="mt-2 text-lg font-semibold text-gray-800">
                    Lokasi: {data.address}
                  </p>
                </div>

                {/* Rincian Biaya */}
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

                {/* Metode Pembayaran */}
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
                  onClick={() => setShowPaymentModal(false)}
                  className="w-1/2 py-2 font-semibold text-white bg-gray-400 rounded-lg hover:bg-gray-500"
                >
                  Tutup
                </button>
                <button
                  onClick={handlePaymentMethodSelection} // Handle method selection here
                  className="w-1/2 py-2 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                >
                  Lanjut Pembayaran
                </button>
              </div>
            </div>
          </div>
        )}
        <PaymentMethodModal
          isOpen={showPaymentMethodModal}
          setIsOpen={setShowPaymentMethodModal}
          onSelectPaymentMethod={setSelectedPaymentMethod}
        />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default ExploreDetailPage;
