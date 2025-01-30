import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Banner from "../../assets/banner-1.jpg";
import useData from "../../hooks/useData";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
const HomePage = () => {
  const {
    getUseData,
    useUsers,
    ratings,
    pagination,
    handleNextPage,
    handlePreviousPage,
    images,
  } = useData();
  const { id } = useParams();

  useEffect(() => {
    getUseData();
  }, [id, pagination.current_page]);

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
      <div className="container relative px-4 mx-auto mt-8">
        <h3 className="text-2xl font-bold px-5 py-2.5 my-2 mx-2">
          Cabang Olahraga
        </h3>
        <Link to="/explore">
          <button
            type="button"
            className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mx-2 my-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 "
          >
            Temukan Lapangan Keinginanmu
            <span className="inline-flex items-center justify-center w-4 h-4 text-xs font-semibold ms-2 ">
              <FaSearch />
            </span>
          </button>
        </Link>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {useUsers.map((user) => {
            const userImage = images.find((img) => img.id === user.id)?.image;
            return (
              <div
                key={user.id}
                className="p-6 transition-transform duration-300 bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-2xl hover:scale-105 hover:border-transparent hover:bg-gradient-to-r hover:from-[#F9F9F9] hover:via-[#FDFDFD] hover:to-[#FFFFFF]"
              >
                {/* User Image */}
                <div className="w-full h-48 mb-4 overflow-hidden border-2 border-gray-200 rounded-lg">
                  <img
                    src={userImage || "../../assets/default.jpg"}
                    alt={`${user.name}'s Avatar`}
                    className="object-cover w-full h-full"
                  />
                </div>
                <h4 className="text-xl font-semibold text-center text-gray-800 ">
                  {user.name}
                </h4>
              </div>
            );
          })}
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-between mt-8">
          <button
            onClick={handlePreviousPage}
            disabled={pagination.page === 1}
            className="px-4 py-2 font-semibold text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-lg font-medium">
            Page {pagination.current_page} of {pagination.total_pages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={pagination.page === pagination.total_pages}
            className="px-4 py-2 font-semibold text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>

      <div className="container px-4 mx-auto mt-12">
        <h3 className="mb-6 text-2xl font-bold text-center text-gray-800">
          Ini Rating Mereka kepada Oyok
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
      <Footer />
    </div>
  );
};

export default HomePage;
