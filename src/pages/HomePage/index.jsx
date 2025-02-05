import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Banner from "../../assets/banner-1.jpg";
import useData from "../../hooks/useData";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { GrFormNextLink, GrFormPreviousLink } from "react-icons/gr";
import { Link } from "react-router-dom";
import Poster from "../../assets/poster-1.png";
import Poster2 from "../../assets/poster-2.jpeg";
import Default from "../../assets/all-sport.jpg";
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
    <div className="relative bg-[#222831]">
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
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent backdrop-blur-sm"></div>

        <div className="relative z-10 max-w-3xl p-8 text-center text-white border rounded-lg shadow-2xl bg-black/40 backdrop-blur-md border-white/10">
          <h2 className="mb-6 text-5xl font-bold transition-colors duration-300 text-white/90 hover:text-white">
            Welcome to Oyok
          </h2>
          <p className="text-lg leading-relaxed transition-colors duration-300 text-white/80 hover:text-white">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Omnis
            possimus sunt at voluptates consectetur officia aliquid expedita
            voluptate, velit soluta deserunt laudantium molestiae ex autem
            incidunt dolor ipsum et! Unde!
          </p>
        </div>
      </div>
      <div className="container relative px-4 mx-auto mt-8">
        {/* Heading */}
        <div className="flex flex-col items-center justify-center text-center">
          <h3 className="text-2xl font-bold px-5 py-2.5 my-2 text-white">
            Cabang Olahraga
          </h3>
          {/* Button */}
          <Link to="/explore">
            <button
              type="button"
              className="text-black bg-[#EEEEEE] hover:bg-[#00ADB5] focus:outline-none focus:ring-4 focus:ring-blue-500 font-medium rounded-lg text-sm px-5 py-2.5 my-2 transition-all duration-300 hover:scale-105 flex items-center"
            >
              Temukan Lapangan Keinginanmu
              <span className="inline-flex items-center justify-center w-4 h-4 text-xs font-semibold ms-2">
                <FaSearch />
              </span>
            </button>
          </Link>
        </div>

        {/* User Section dengan Tombol Pagination di Sisi Kiri dan Kanan */}
        <div className="relative flex items-center gap-4">
          {/* Tombol Previous */}
          <button
            onClick={handlePreviousPage}
            disabled={pagination.page === 1}
            className="px-4 py-2 font-semibold text-black transition-all duration-300 bg-[#EEEEEE] rounded-lg shadow-md hover:bg-[#00ADB5] disabled:opacity-50 hover:scale-105"
          >
            <GrFormPreviousLink />
          </button>

          {/* User Cards Grid */}
          <div className="grid flex-1 grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {useUsers.map((user) => {
              const userImage = images.find((img) => img.id === user.id)?.image;
              return (
                <div
                  key={user.id}
                  className="p-6 transition-transform duration-300 border rounded-lg shadow-lg bg-white/10 border-white/10 hover:shadow-2xl hover:scale-105 backdrop-blur-md hover:border-white/20"
                >
                  {/* User Image */}
                  <div className="w-full h-48 mb-4 overflow-hidden border-2 rounded-lg border-white/10">
                    <img
                      src={userImage || Default}
                      alt={`${user.name}'s Avatar`}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  {/* User Name */}
                  <h4 className="text-xl font-semibold text-center text-white">
                    {user.name}
                  </h4>
                </div>
              );
            })}
          </div>

          {/* Tombol Next */}
          <button
            onClick={handleNextPage}
            disabled={pagination.page === pagination.total_pages}
            className="px-4 py-2 font-semibold text-black transition-all duration-300 bg-[#EEEEEE] rounded-lg shadow-md hover:bg-[#00ADB5] disabled:opacity-50 hover:scale-105"
          >
            <GrFormNextLink />
          </button>
        </div>

        {/* Pagination Info */}
        <div className="flex justify-center mt-14">
          <span className="text-xl font-medium text-white">
            Page {pagination.current_page} of {pagination.total_pages}
          </span>
        </div>
      </div>
      
      <div className="px-4 py-12 sm:px-6 lg:px-8 bg-[#393E46]">
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
              <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                Kenapa OYOK?
              </h2>
              <ul className="mt-6 space-y-6">
                <li className="flex items-start">
                  <span className="flex items-center justify-center flex-shrink-0 w-6 h-6 font-bold text-white bg-blue-500 rounded-full">
                    1
                  </span>
                  <p className="ml-4 text-xl text-white">
                    <strong className="text-red-500">All-in-One Platform:</strong> Oyok memungkinkan
                    pengguna untuk menyewa lapangan olahraga dan mencari lawan
                    sparring atau teman bermain dalam satu aplikasi. Tidak perlu
                    lagi membuka beberapa platform berbeda!
                  </p>
                </li>
                <li className="flex items-start">
                  <span className="flex items-center justify-center flex-shrink-0 w-6 h-6 font-bold text-white bg-blue-500 rounded-full">
                    2
                  </span>
                  <p className="ml-4 text-xl text-white">
                    <strong className="text-red-500">Kemudahan Akses:</strong> Dengan antarmuka yang
                    mudah digunakan, pengguna bisa dengan cepat menemukan
                    lapangan yang tersedia dan mencari teman bermain sesuai
                    dengan jenis olahraga yang diinginkan.
                  </p>
                </li>
                <li className="flex items-start">
                  <span className="flex items-center justify-center flex-shrink-0 w-6 h-6 font-bold text-white bg-blue-500 rounded-full">
                    3
                  </span>
                  <p className="ml-4 text-xl text-white">
                    <strong className="text-red-500">Fitur Rating dan Ulasan:</strong> Pengguna bisa
                    memberikan ulasan dan rating terhadap lapangan atau
                    pengalaman bermain bersama orang lain, membantu yang lain
                    untuk memilih pilihan terbaik.
                  </p>
                </li>
                <li className="flex items-start">
                  <span className="flex items-center justify-center flex-shrink-0 w-6 h-6 font-bold text-white bg-blue-500 rounded-full">
                    4
                  </span>
                  <p className="ml-4 text-xl text-white">
                    <strong className="text-red-500">Akses Melalui Aplikasi dan Web:</strong> Oyok
                    tersedia baik di platform web maupun aplikasi mobile,
                    memberikan kemudahan akses kapan saja dan di mana saja.
                  </p>
                </li>
                <li className="flex items-start">
                  <span className="flex items-center justify-center flex-shrink-0 w-6 h-6 font-bold text-white bg-blue-500 rounded-full">
                    5
                  </span>
                  <p className="ml-4 text-xl text-white">
                    <strong className="text-red-500">Fitur Pembayaran yang Aman:</strong> Proses
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
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80"></div>
        <div className="relative z-10 flex justify-center h-full gap-8">
          <div className="flex flex-col items-center justify-center lg:flex-row">
            <img
              src={Poster}
              alt=""
              className="object-cover rounded-lg w-96 h-96"
            />
            <div className="text-center text-white md:text-left">
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
        <h3 className="mb-6 text-2xl font-bold text-center text-white">
          Ini Rating Mereka kepada Oyok
        </h3>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {ratings.map((rating) => (
            <div
              key={rating.id}
              className="relative p-6 transition-transform duration-300 border rounded-lg shadow-lg bg-white/10 border-white/10 hover:shadow-2xl hover:scale-105 backdrop-blur-md hover:border-white/20"
            >
              {/* User Info */}
              <div className="flex items-center mb-4">
                <div className="ml-4">
                  <h4 className="text-lg font-semibold text-white">
                    {rating.user.name}
                  </h4>
                  <p className="text-sm text-white/80">
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
                <span className="ml-2 text-lg font-semibold text-white">
                  {rating.rating.toFixed(1)}
                </span>
              </div>

              {/* Comment */}
              <p className="italic leading-relaxed text-white/80">
                “{rating.comment}”
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-center p-6 my-20">
        <div className="flex flex-col w-full max-w-4xl overflow-hidden border rounded-lg shadow-lg bg-white/10 md:flex-row backdrop-blur-md border-white/10">
          {/* Header Section */}
          <div className="flex flex-col justify-center w-full p-8 text-white md:w-1/2 bg-background-3">
            <h2 className="mb-4 text-3xl font-bold">
              Mau mengobrol langsung dengan tim OYOK?
            </h2>
            <p className="text-white/80">
              Terima kasih sudah mengunjungi website OYOK. Apakah Kamu memiliki
              pertanyaan seputar platform OYOK? Sampaikan pertanyaan Anda
              disini. Tim kami akan menghubungi Anda secepatnya.
            </p>
          </div>

          {/* Form Section */}
          <div className="w-full p-8 md:w-1/2">
            <form className="space-y-6">
              {/* Nama */}
              <div>
                <label
                  htmlFor="nama"
                  className="block text-sm font-medium text-white"
                >
                  Nama
                </label>
                <input
                  type="text"
                  id="nama"
                  name="nama"
                  placeholder="Masukkan nama Anda"
                  className="block w-full px-4 py-2 mt-1 text-white border rounded-md shadow-sm border-white/10 bg-white/10 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-white"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Masukkan email Anda"
                  className="block w-full px-4 py-2 mt-1 text-white border rounded-md shadow-sm border-white/10 bg-white/10 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              {/* No HP */}
              <div>
                <label
                  htmlFor="no-hp"
                  className="block text-sm font-medium text-white"
                >
                  No HP
                </label>
                <input
                  type="tel"
                  id="no-hp"
                  name="no-hp"
                  placeholder="Masukkan nomor HP Anda"
                  className="block w-full px-4 py-2 mt-1 text-white border rounded-md shadow-sm border-white/10 bg-white/10 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              {/* Domisili */}
              <div>
                <label
                  htmlFor="domisili"
                  className="block text-sm font-medium text-white"
                >
                  Domisili
                </label>
                <input
                  type="text"
                  id="domisili"
                  name="domisili"
                  placeholder="Masukkan domisili Anda"
                  className="block w-full px-4 py-2 mt-1 text-white border rounded-md shadow-sm border-white/10 bg-white/10 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              {/* Pertanyaan */}
              <div>
                <label
                  htmlFor="pertanyaan"
                  className="block text-sm font-medium text-white"
                >
                  Pertanyaan
                </label>
                <textarea
                  id="pertanyaan"
                  name="pertanyaan"
                  rows="4"
                  placeholder="Masukkan pertanyaan Anda"
                  className="block w-full px-4 py-2 mt-1 text-white border rounded-md shadow-sm border-white/10 bg-white/10 focus:ring-blue-500 focus:border-blue-500"
                  required
                ></textarea>
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  className="w-full px-4 py-2 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Kirim
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>{" "}
      <Footer className="text-white bg-black" />
    </div>
  );
};

export default HomePage;
