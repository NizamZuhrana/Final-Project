import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Footer from "../../components/Footer";
import Football from "../../assets/football2.jpg";
import Futsal from "../../assets/futsal3.jpg";
import TenisMeja from "../../assets/tenis-meja (1).jpg";
import Tenis from "../../assets/tenis (3).jpg";
import Minsoc from "../../assets/minsoc2.jpg";
import Badminton from "../../assets/badminton2.jpg";
import PaymentMethodModal from "../../components/PaymentMethodModal";
import PaymentModal from "../../components/PaymentModal";
import useNavbar from "../../hooks/useNavbar";
import Navbar from "../../components/Navbar";
import Default from "../../assets/all-sport.jpg";

const ExploreDetailPage = ({}) => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showPaymentMethodModal, setShowPaymentMethodModal] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const { userData } = useNavbar();

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
    "Tenis Meja": TenisMeja,
    Tenis: Tenis,
    "Mini Soccer": Minsoc,
    Badminton: Badminton,
  };

  const handlePaymentMethodSelection = (method) => {
    setSelectedPaymentMethod(method);
    setShowPaymentMethodModal(false);
  };

  useEffect(() => {
    fetchDetails();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <div className="relative z-50 mb-5">
        <Navbar />
      </div>
      <div className="flex flex-col items-start justify-center gap-6 p-6 md:flex-row ">
        {/* Card Kiri - Detail */}
        <div className="w-full p-6 bg-white shadow-lg md:w-2/3 rounded-2xl">
          <div className="mb-4">
            <img
              src={imagesMap[data.sport_category?.name] || Default}
              alt={`${data.sport_category?.name || "N/A"}`}
              className="object-cover w-full bg-gray-200 rounded-lg h-96"
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
                className="text-blue-600 hover:underline"
              >
                {data.address}
              </a>
            </p>
          </div>
        </div>

        {/* Card Kanan - Order */}

        {userData && userData.role === "user" && (
          <div className="flex flex-col justify-between p-6 bg-white shadow-lg h-52 w-60 rounded-2xl">
            <div>
              <h2 className="mb-2 text-xl font-semibold">Order Sekarang</h2>
              <p className="text-gray-500">
                Harga:{" "}
                <span className="text-lg font-bold">
                  Rp {data.price.toLocaleString()}
                </span>
              </p>
            </div>
            {}
            <button
              onClick={handleOrder}
              className="w-full py-3 mt-4 font-semibold text-black transition bg-[#A6E3E9] rounded-lg hover:bg-[#00ADB5]"
            >
              Order Sekarang
            </button>
          </div>
        )}

        <PaymentModal
          isOpen={showPaymentModal}
          onClose={() => setShowPaymentModal(false)}
          data={data}
          selectedPaymentMethod={selectedPaymentMethod}
          setShowPaymentMethodModal={setShowPaymentMethodModal}
          setSelectedPaymentMethod={setSelectedPaymentMethod}
        />
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
