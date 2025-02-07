import { useState } from "react";
import { RefreshCw } from "lucide-react";
import Sidebar from "../../components/Sidebar";
import { useAllTransaction } from "../../hooks/useAllTransaction";
import { useAllCategories } from "../../hooks/useAllCategories";
import Default from "../../assets/all-sport.jpg";
import { Link } from "react-router-dom";
import useAllActivities from "../../hooks/useAllActivities";
import TransactionModalId from "../../components/TransactionIdModal";
import useDeleteCategories from "../../hooks/useDeleteCategories";
// import useCreateCategory from "../../hooks/useCreateCategory";
import CreateCategoryModal from "../../components/CreateCategoryModal";

const DashboardAdmin = () => {
  const [selectedPage, setSelectedPage] = useState("dashboard");
  const [isModalOpen, setIsModalOpen] = useState(false); // State untuk mengontrol modal
  const [selectedTransactionId, setSelectedTransactionId] = useState(null); // State untuk menyimpan ID transaksi yang dipilih
  const { transactions, loading, error } = useAllTransaction();
  const { categories, images } = useAllCategories();
  const { activities } = useAllActivities();
  const [categorie, setCategorie] = useState([]);
  const {
    handleDelete,
    handleCheckboxChange,
    selectedCategories,
    handleCardClick,
  } = useDeleteCategories();
  // const { createCategory } = useCreateCategory();

  // Fungsi untuk membuka modal
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCategoryCreated = (newCategory) => {
    setCategorie([...categorie, newCategory]); // Tambahkan kategori baru ke state
    window.location.reload();
  };

  if (error) return <p className="text-red-500">Error: {error}</p>;

  // Fungsi untuk membuka modal dan menyimpan ID transaksi
  const handleTransactionClick = (id) => {
    setSelectedTransactionId(id);
    setIsModalOpen(true);
  };

  // Fungsi untuk menutup modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTransactionId(null);
  };

  const renderTransactionList = (title, transactions) => (
    <div>
      <h2 className="mt-6 text-xl font-bold">{title}</h2>
      <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-3">
        {transactions.map((trx) => (
          <div
            key={trx.id}
            className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm cursor-pointer dark:bg-gray-800 dark:border-gray-700"
            onClick={() => handleTransactionClick(trx.id)}
          >
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              Invoice: {trx.invoice_id}
            </p>
            <p
              className={`text-sm font-medium ${
                trx.status === "success"
                  ? "text-green-500"
                  : trx.status === "cancelled"
                  ? "text-red-500"
                  : "text-black"
              }`}
            >
              Status: {trx.status}
            </p>
            <p className="font-bold text-md">
              Total: Rp {trx.total_amount.toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="flex h-full">
      <div>
        <Sidebar onSelect={setSelectedPage} />
      </div>
      <div className="flex-1 p-6">
        {selectedPage === "dashboard" && (
          <div>
            <h1 className="text-2xl font-bold">Welcome to Dashboard</h1>
          </div>
        )}
        {selectedPage === "users" && (
          <div>
            <h1 className="text-2xl font-bold">Manage Transaction</h1>
            {renderTransactionList(
              "Pending Transactions",
              transactions.filter((trx) => trx.status === "pending")
            )}
            {renderTransactionList(
              "Cancelled Transactions",
              transactions.filter((trx) => trx.status === "cancelled")
            )}
            {renderTransactionList(
              "Successful Transactions",
              transactions.filter((trx) => trx.status === "success")
            )}

            <TransactionModalId
              isOpen={isModalOpen}
              onClose={handleCloseModal}
              transactionId={selectedTransactionId}
            />
          </div>
        )}

        {selectedPage === "settings" && (
          <div>
            <h1 className="mb-4 text-2xl font-bold">Manage Activities</h1>
            <div>
              <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {activities.map((activity) => (
                  <Link to={`/dashboard/${activity.id}`} key={activity.id}>
                    <li className="p-6 transition-shadow duration-300 border rounded-lg shadow-md bg-white/10 border-white/10 hover:bg-white/20 hover:shadow-lg">
                      <h3 className="mb-3 text-2xl font-bold text-black">
                        {activity.title}
                      </h3>
                      <p className="mb-2 text-sm text-black">
                        <span className="font-semibold">Address:</span>{" "}
                        {activity.address}
                      </p>
                      <p className="mb-2 text-sm text-black">
                        <span className="font-semibold">City:</span>{" "}
                        {activity.city?.city_name}
                      </p>
                      <p className="mb-2 text-sm text-black">
                        <span className="font-semibold">Category:</span>{" "}
                        {activity.sport_category?.name || "N/A"}
                      </p>
                      <p className="text-sm text-black">
                        <span className="font-semibold">Price:</span>{" "}
                        {activity.price}
                      </p>
                    </li>
                  </Link>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* CATEGORY MANAGEMENT */}
        {selectedPage === "categories" && (
          <div>
            <h1 className="mb-4 text-2xl font-bold">Manage Categories</h1>
            <button className="flex items-center p-2 mb-4 space-x-2 text-white bg-gray-500 rounded">
              <RefreshCw size={16} /> <span>Refresh</span>
            </button>

            {/* Render Categories */}
            <div>
              <div className="grid flex-1 grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {categories.map((category) => {
                  const userImage = images.find(
                    (img) => img.id === category.id
                  )?.image;
                  return (
                    <div
                      key={category.id}
                      className="p-6 transition-transform duration-300 border rounded-lg shadow-lg bg-white/10 border-white/10 hover:shadow-2xl hover:scale-105 backdrop-blur-md hover:border-white/20"
                      onClick={() => handleCardClick(category.id)} // Event handler untuk klik card
                    >
                      <div className="w-full h-48 mb-4 overflow-hidden border-2 rounded-lg border-white/10">
                        <img
                          src={userImage || Default}
                          alt={`${category.name}'s Avatar`}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <h4 className="text-xl font-semibold text-center text-black">
                        {category.name}
                      </h4>

                      {/* Checkbox for category selection */}
                      <div className="flex items-center mt-2">
                        <input
                          type="checkbox"
                          checked={selectedCategories.includes(category.id)}
                          onChange={() => handleCheckboxChange(category.id)}
                          className="mr-2"
                        />
                        <label className="text-sm">Select</label>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Button to delete selected categories */}
              <div className="mt-4">
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
                  disabled={selectedCategories.length === 0}
                >
                  Delete Selected Categories
                </button>

                {/* Tombol Create Activities */}
                <button
                  onClick={handleOpenModal}
                  className="px-4 py-2 text-white bg-blue-500 rounded-md "
                >
                  Create Activities
                </button>

                {/* Render modal */}
                <CreateCategoryModal
                  isOpen={isModalOpen}
                  onClose={handleCloseModal}
                  onCategoryCreated={handleCategoryCreated} // Kirimkan fungsi untuk menangani kategori yang baru dibuat
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardAdmin;
