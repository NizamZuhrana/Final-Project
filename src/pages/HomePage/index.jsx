import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Banner from "../../assets/banner-1.jpg";
import useData from "../../hooks/useData";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

// Import user images
import FootballImage from "../../assets/Football.jpg";
import FutsalImage from "../../assets/futsal.jpg";
import MinsocImage from "../../assets/minsoc.jpg";
import BadmintonImage from "../../assets/badminton.jpg";
import BasketballImage from "../../assets/basketball.jpg";

const HomePage = () => {
  const { getUseData, useUsers, ratings } = useData();
  const { id } = useParams();

  const images = [
    { id: 1, name: "Football", image: FootballImage },
    { id: 2, name: "Futsal", image: FutsalImage },
    { id: 3, name: "Minsoc", image: MinsocImage },
    { id: 4, name: "Badminton", image: BadmintonImage },
    { id: 5, name: "Basketball", image: BasketballImage },
  ];

  useEffect(() => {
    getUseData();
  }, [id]);

  return (
    <div className="relative">
      <div className="relative z-50 pb-24">
        <Navbar />
      </div>

      {/* Banner Section */}
      <div className="relative w-full h-[400px] flex items-center justify-center overflow-hidden z-0">
        <img
          src={Banner}
          alt="Banner Background"
          className="absolute top-0 left-0 object-cover w-full h-full transition-transform duration-300 opacity-85 hover:scale-105"
        />
        <div className="relative z-10 max-w-3xl p-5 text-center text-white bg-black rounded-lg shadow-lg bg-opacity-40">
          <h2 className="mb-4 text-4xl font-bold">Welcome to Oyok</h2>
          <p className="text-lg leading-relaxed">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Omnis
            possimus sunt at voluptates consectetur officia aliquid expedita
            voluptate, velit soluta deserunt laudantium molestiae ex autem
            incidunt dolor ipsum et! Unde!
          </p>
        </div>
      </div>

      {/* Users Section */}
      <div className="container px-4 mx-auto mt-8">
        <h3 className="mb-6 text-2xl font-bold text-center">Our Users</h3>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {useUsers.map((user) => {
            // Cari gambar berdasarkan user.id
            const userImage = images.find((img) => img.id === user.id)?.image;

            return (
              <div
                key={user.id}
                className="p-6 transition-shadow duration-300 bg-white rounded-lg shadow-lg hover:shadow-xl"
              >
                {/* User Image */}
                <div className="w-full h-48 mb-4 overflow-hidden rounded-lg">
                  <img
                    src={userImage || "../../assets/default.jpg"} // Fallback ke gambar default jika tidak ditemukan
                    alt={`${user.name}'s Avatar`}
                    className="object-cover w-full h-full"
                  />
                </div>
                <h4 className="text-xl font-semibold text-center text-gray-800">
                  {user.name}
                </h4>
                <p className="text-center text-gray-600">
                  Email: {user.email || "Not Provided"}
                </p>
                <p className="text-center text-gray-600">
                  Username: {user.username || "N/A"}
                </p>
              </div>
            );
          })}
        </div>

        <div className="container px-4 mx-auto mt-12">
          <h3 className="mb-6 text-2xl font-bold text-center text-gray-800">
            User Reviews
          </h3>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {ratings.map((rating) => (
              <div
                key={rating.id}
                className="relative p-6 bg-gradient-to-r from-[#ECECEC] via-[#F8F8F8] to-[#FFFFFF] rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                {/* User Info */}
                <div className="flex items-center mb-4">
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold text-gray-800">
                      {rating.user.name}
                    </h4>
                    <p className="text-sm text-gray-500">
                      {new Date(rating.timestamp).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {/* Star Rating */}
                <div className="flex items-center mb-2">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <svg
                      key={index}
                      xmlns="http://www.w3.org/2000/svg"
                      fill={index < Math.round(rating.rating) ? "gold" : "none"}
                      stroke="gold"
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                      />
                    </svg>
                  ))}
                  <span className="ml-2 text-lg font-semibold text-gray-800">
                    {rating.rating.toFixed(1)}
                  </span>
                </div>

                {/* Comment */}
                <p className="italic leading-relaxed text-gray-700">
                  “{rating.comment}”
                </p>

                {/* Highlight Border */}
                <div className="absolute inset-0 transition-colors duration-300 border-2 border-transparent rounded-xl hover:border-yellow-400"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
