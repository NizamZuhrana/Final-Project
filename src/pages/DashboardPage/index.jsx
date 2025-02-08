import { useState } from "react";
import { RefreshCw, Users, List, Activity, ShoppingCart } from "lucide-react";
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
import UpdateCategoryModal from "../../components/UpdateCategoryModal";
import CreateActivitiesModal from "../../components/CreateActivitiesModal";
import UpdateActivitiesModal from "../../components/UpdatedActivitiesModal";
import useDeleteActivities from "../../hooks/useDeleteActivities";
import useAllUsers from "../../hooks/useAllUsers";

const DashboardAdmin = () => {
  const [selectedPage, setSelectedPage] = useState("dashboard");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isActivityModalOpen, setIsActivityModalOpen] = useState(false);
  const [selectedTransactionId, setSelectedTransactionId] = useState(null);
  const { transactions, loading, error } = useAllTransaction();
  const { categories, images } = useAllCategories();
  const { activities } = useAllActivities();
  const { users } = useAllUsers();
  const [categorie, setCategorie] = useState([]);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isUpdateModalOpen2, setUpdateModalOpen] = useState(false);
  const [selectedActivityId, setSelectedActivityId] = useState(null);
  const {
    handleDeleteActivities,
    selectedActivities,
    loadingActivities,
    handleCardClickActivities, 
  } = useDeleteActivities();

  const handleCardClick2 = (id) => {
    handleCardClickActivities(id);
  };

  const {
    handleDelete,
    handleCheckboxChange,
    selectedCategories,
    handleCardClick,
  } = useDeleteCategories();
  // const { createCategory } = useCreateCategory();

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleOpenActivityModal = () => {
    setIsActivityModalOpen(true);
  };

  const handleCloseActivityModal = () => {
    setIsActivityModalOpen(false);
  };

  const handleCategoryCreated = (newCategory) => {
    setCategorie([...categorie, newCategory]); 
    window.location.reload();
  };

  const handleCategoryUpdated = (updatedCategory) => {
    setCategorie((prevCategories) =>
      prevCategories.map((category) =>
        category.id === updatedCategory.id ? updatedCategory : category
      )
    );
    window.location.reload();
  };

  if (error) return <p className="text-red-500">Error: {error}</p>;

  const handleTransactionClick = (id) => {
    setSelectedTransactionId(id);
    setIsModalOpen(true);
  };

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
      <div className="flex-1 p-6 ml-64">

        {/* Dashboard */}
        {selectedPage === "dashboard" && (
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
              Welcome to Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Manage all your activities, categories, and transactions.
            </p>
            <div className="grid grid-cols-1 gap-6 mt-6 sm:grid-cols-2 lg:grid-cols-4">
              <div className="flex items-center justify-between p-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
                <div>
                  <h2 className="text-lg font-semibold text-gray-700 dark:text-white">
                    Users
                  </h2>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {users && <p>Welcome, {users.name}!</p>}
                  </p>
                </div>
                <Users size={32} className="text-blue-500" />
              </div>
              <div className="flex items-center justify-between p-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
                <div>
                  <h2 className="text-lg font-semibold text-gray-700 dark:text-white">
                    Categories
                  </h2>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {categories.length}
                  </p>
                </div>
                <List size={32} className="text-green-500" />
              </div>
              <div className="flex items-center justify-between p-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
                <div>
                  <h2 className="text-lg font-semibold text-gray-700 dark:text-white">
                    Activities
                  </h2>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {activities.length}
                  </p>
                </div>
                <Activity size={32} className="text-yellow-500" />
              </div>
              <div className="flex items-center justify-between p-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
                <div>
                  <h2 className="text-lg font-semibold text-gray-700 dark:text-white">
                    Transactions
                  </h2>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {transactions.length}
                  </p>
                </div>
                <ShoppingCart size={32} className="text-red-500" />
              </div>
            </div>
          </div>
        )}

        {/* TRANSACTION MANAGEMENT */}
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
        {/* ACTIVITIES MANAGEMENT */}
        {selectedPage === "settings" && (
          <div>
            <h1 className="flex items-center justify-center mb-4 text-2xl font-bold">
              Manage Activities
            </h1>

            <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {activities.map((activity) => (
                <li
                  key={activity.id}
                  className="p-6 transition-shadow duration-300 border rounded-lg shadow-md cursor-pointer bg-white/10 border-white/10 hover:bg-white/20 hover:shadow-lg"
                  onClick={() => handleCardClick2(activity.id)}
                >
                  <div className="flex items-center space-x-4">
                    <input
                      type="checkbox"
                      checked={selectedActivities.includes(activity.id)}
                      onChange={(e) => {
                        e.stopPropagation();
                        handleCardClick2(activity.id);
                      }}
                    />
                    <div>
                      <h3 className="text-2xl font-bold text-black">
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
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="flex items-center justify-center gap-10 mt-4">
              <button
                onClick={handleOpenActivityModal}
                className="px-4 py-2 mb-4 text-white bg-blue-500 rounded-md"
              >
                Create Activity
              </button>
              <button
                onClick={() => setSelectedActivityId(2)}
                className="px-4 py-2 mb-4 text-white bg-yellow-500 rounded-md"
              >
                Update Aktivity
              </button>
              <button
                onClick={handleDeleteActivities}
                disabled={selectedActivities.length === 0 || loadingActivities}
                className="px-4 py-2 mb-4 text-white bg-red-500 rounded-md"
              >
                Delete Aktivity
              </button>
            </div>

            <CreateActivitiesModal
              isOpen={isActivityModalOpen}
              onClose={handleCloseActivityModal}
            />
            <UpdateActivitiesModal
              isOpen={Boolean(selectedActivityId)}
              onClose={() => setSelectedActivityId(null)}
              activityId={selectedActivityId}
              onActivityUpdated={(data) => console.log("Updated:", data)}
            />
          </div>
        )}

        {/* CATEGORY MANAGEMENT */}
        {selectedPage === "categories" && (
          <div>
            <h1 className="mb-4 text-2xl font-bold">Manage Categories</h1>
            <button className="flex items-center p-2 mb-4 space-x-2 text-white bg-gray-500 rounded">
              <RefreshCw size={16} /> <span>Refresh</span>
            </button>

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
                      onClick={() => handleCardClick(category.id)} 
                    >
                      <div
                        onClick={() => {
                          setSelectedCategory(category);
                        }}
                        className="cursor-pointer "
                      >
                        <div className="flex items-center mt-2 space-x-2">
                          <input
                            type="checkbox"
                            checked={selectedCategories.includes(category.id)}
                            onChange={() => handleCheckboxChange(category.id)}
                            className="mr-2"
                          />
                          <label className="text-sm">Select</label>

                          <div>
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
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              
              <div className="flex items-center justify-center gap-8 mt-4">
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
                  disabled={selectedCategories.length === 0}
                >
                  Delete Categories
                </button>

                
                <button
                  onClick={handleOpenModal}
                  className="px-4 py-2 text-white bg-blue-500 rounded-md "
                >
                  Create Activities
                </button>

                <button
                  onClick={() => setIsUpdateModalOpen(true)}
                  className="px-4 py-2 text-white bg-yellow-500 rounded-md"
                >
                  Update Category
                </button>

                <UpdateCategoryModal
                  isOpen={isUpdateModalOpen}
                  onClose={() => setIsUpdateModalOpen(false)}
                  category={selectedCategory}
                  onCategoryUpdated={handleCategoryUpdated}
                />

                
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
