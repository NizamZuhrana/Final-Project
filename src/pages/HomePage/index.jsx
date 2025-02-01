import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Banner from "../../assets/banner-1.jpg";
import useData from "../../hooks/useData";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import Poster from "../../assets/poster-1.png";
import Poster2 from "../../assets/poster-2.jpeg";
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
      <div>
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
        <div className="flex justify-between mt-8 mb-10">
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

      <div className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="lg:flex lg:items-center lg:justify-between">
            {/* Gambar */}
            <div className="lg:w-1/2">
              <img
                src={Poster2}
                alt="Poster OYOK"
                className="transition-transform duration-300 transform rounded-lg shadow-2xl hover:scale-105"
              />
            </div>

            {/* Konten Teks */}
            <div className="mt-8 lg:mt-0 lg:w-1/2 lg:pl-12">
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                Kenapa OYOK?
              </h2>
              <ul className="mt-6 space-y-6">
                <li className="flex items-start">
                  <span className="flex items-center justify-center flex-shrink-0 w-6 h-6 font-bold text-white bg-blue-500 rounded-full">
                    1
                  </span>
                  <p className="ml-4 text-lg text-gray-700">
                    <strong>All-in-One Platform:</strong> Oyok memungkinkan
                    pengguna untuk menyewa lapangan olahraga dan mencari lawan
                    sparring atau teman bermain dalam satu aplikasi. Tidak perlu
                    lagi membuka beberapa platform berbeda!
                  </p>
                </li>
                <li className="flex items-start">
                  <span className="flex items-center justify-center flex-shrink-0 w-6 h-6 font-bold text-white bg-blue-500 rounded-full">
                    2
                  </span>
                  <p className="ml-4 text-lg text-gray-700">
                    <strong>Kemudahan Akses:</strong> Dengan antarmuka yang
                    mudah digunakan, pengguna bisa dengan cepat menemukan
                    lapangan yang tersedia dan mencari teman bermain sesuai
                    dengan jenis olahraga yang diinginkan.
                  </p>
                </li>
                <li className="flex items-start">
                  <span className="flex items-center justify-center flex-shrink-0 w-6 h-6 font-bold text-white bg-blue-500 rounded-full">
                    3
                  </span>
                  <p className="ml-4 text-lg text-gray-700">
                    <strong>Fitur Rating dan Ulasan:</strong> Pengguna bisa
                    memberikan ulasan dan rating terhadap lapangan atau
                    pengalaman bermain bersama orang lain, membantu yang lain
                    untuk memilih pilihan terbaik.
                  </p>
                </li>
                <li className="flex items-start">
                  <span className="flex items-center justify-center flex-shrink-0 w-6 h-6 font-bold text-white bg-blue-500 rounded-full">
                    4
                  </span>
                  <p className="ml-4 text-lg text-gray-700">
                    <strong>Akses Melalui Aplikasi dan Web:</strong> Oyok
                    tersedia baik di platform web maupun aplikasi mobile,
                    memberikan kemudahan akses kapan saja dan di mana saja.
                  </p>
                </li>
                <li className="flex items-start">
                  <span className="flex items-center justify-center flex-shrink-0 w-6 h-6 font-bold text-white bg-blue-500 rounded-full">
                    5
                  </span>
                  <p className="ml-4 text-lg text-gray-700">
                    <strong>Fitur Pembayaran yang Aman:</strong> Proses
                    pembayaran untuk sewa lapangan atau biaya terkait lainnya
                    aman dan mudah digunakan, dengan berbagai metode pembayaran
                    yang tersedia.
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="relative h-screen mt-10 bg-center bg-cover bg-background-2">
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-50"></div>
        <div className="relative z-10 flex justify-center h-full gap-8 ">
          <div className="flex flex-col items-center justify-center lg:flex-row">
            <img
              src={Poster}
              alt=""
              className="object-cover rounded-lg w-96 h-96"
            />
            <div className="text-center text-black md:text-left">
              <h2 className="text-4xl font-bold md:text-6xl">
                Super Sport Community App
              </h2>
              <p className="mt-4 text-2xl">
                Platform all-in-one untuk sewa lapangan, cari lawan sparring,
                atau cari kawan main bareng. Olahraga makin mudah dan
                menyenangkan!
              </p>
            </div>
          </div>
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
      <div class="flex items-center justify-center p-6 my-20">
        <div class="max-w-4xl w-full bg-white shadow-lg rounded-lg overflow-hidden flex flex-col md:flex-row">
          {/* <!-- Header Section --> */}
          <div class="w-full md:w-1/2 p-8 bg-background-3 text-white flex flex-col justify-center ">
            <h2 class="text-3xl font-bold mb-4">
              Mau mengobrol langsung dengan tim OYOK?
            </h2>
            <p class="text-white">
              Terima kasih sudah mengunjungi website OYOK. Apakah Kamu memiliki
              pertanyaan seputar platform OYOK? Sampaikan pertanyaan Anda
              disini. Tim kami akan menghubungi Anda secepatnya.
            </p>
          </div>

          {/* <!-- Form Section --> */}
          <div class="w-full md:w-1/2 p-8">
            <form class="space-y-6">
              {/* <!-- Nama --> */}
              <div>
                <label
                  for="nama"
                  class="block text-sm font-medium text-gray-700"
                >
                  Nama
                </label>
                <input
                  type="text"
                  id="nama"
                  name="nama"
                  placeholder="Masukkan nama Anda"
                  class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              {/* <!-- Email --> */}
              <div>
                <label
                  for="email"
                  class="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Masukkan email Anda"
                  class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              {/* <!-- No HP --> */}
              <div>
                <label
                  for="no-hp"
                  class="block text-sm font-medium text-gray-700"
                >
                  No HP
                </label>
                <input
                  type="tel"
                  id="no-hp"
                  name="no-hp"
                  placeholder="Masukkan nomor HP Anda"
                  class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              {/* <!-- Domisili --> */}
              <div>
                <label
                  for="domisili"
                  class="block text-sm font-medium text-gray-700"
                >
                  Domisili
                </label>
                <input
                  type="text"
                  id="domisili"
                  name="domisili"
                  placeholder="Masukkan domisili Anda"
                  class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              {/* <!-- Pertanyaan --> */}
              <div>
                <label
                  for="pertanyaan"
                  class="block text-sm font-medium text-gray-700"
                >
                  Pertanyaan
                </label>
                <textarea
                  id="pertanyaan"
                  name="pertanyaan"
                  rows="4"
                  placeholder="Masukkan pertanyaan Anda"
                  class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  required
                ></textarea>
              </div>

              {/* <!-- Submit Button --> */}
              <div>
                <button
                  type="submit"
                  class="w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Kirim
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
