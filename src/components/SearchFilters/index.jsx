import useFilters from "../../hooks/useFilter";
import { useEffect } from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import { Link } from "react-router-dom";
import Banner from "../../assets/fitness (1).jpg";

const SearchFilters = () => {
  const {
    provinces,
    categories,
    selectedLocation,
    selectedCategory,
    filteredActivities,
    setSelectedCategory,
    setSelectedLocation,
    filterActivities,
    handleSearch,
    filteredCities,
    searchQuery,
    setSearchQuery,
    searchCategory,
    setSearchCategory,
    filteredCategories,
  } = useFilters();

  useEffect(() => {
    filterActivities();
  }, [selectedLocation, selectedCategory]);

  return (
    <div className="relative min-h-screen bg-[#222831]">
      <div className="z-50">
        <Navbar />
      </div>

      <div className="relative w-full h-[400px] flex items-center justify-center overflow-hidden z-0 ">
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

      <div className="container px-4 mx-auto mt-8 max-w-7xl">
        <div className="flex flex-col gap-4 md:flex-row">
          <div className="w-full md:w-1/2">
            <label
              htmlFor="location"
              className="block mb-2 text-lg font-medium text-white"
            >
              Search & Select Location:
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Type city name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full p-3 pr-10 text-gray-700 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <select
                id="location"
                value={selectedLocation?.city_id || ""}
                onChange={(e) => {
                  const selectedCityId = parseInt(e.target.value);
                  const selectedCity = filteredCities.find(
                    (city) => city.city_id === selectedCityId
                  );
                  setSelectedLocation(selectedCity || null);
                }}
                className="absolute inset-y-0 right-0 p-3 text-gray-700 bg-transparent border-l border-gray-300 rounded-r-lg cursor-pointer"
              >
                <option value="">All Locations</option>
                {filteredCities.map((city) => (
                  <option key={city.city_id} value={city.city_id}>
                    {city.city_name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="w-full md:w-1/2">
            <label
              htmlFor="category"
              className="block mb-2 text-lg font-medium text-white"
            >
              Search & Select Sport Category:
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Type category name..."
                value={searchCategory}
                onChange={(e) => setSearchCategory(e.target.value)}
                className="w-full p-3 pr-10 text-gray-700 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <select
                id="category"
                value={selectedCategory || ""}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="absolute inset-y-0 right-0 p-3 text-gray-700 bg-transparent border-l border-gray-300 rounded-r-lg cursor-pointer"
              >
                <option value="">All Categories</option>
                {filteredCategories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="mb-6 text-2xl font-bold text-gray-800">
            Filtered Results:
          </h2>
          {filteredActivities.length > 0 ? (
            <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredActivities.map((activity) => (
                <Link to={`/explore/${activity.id}`} key={activity.id}>
                  <li className="p-6 transition-shadow duration-300 border rounded-lg shadow-md bg-white/10 border-white/10 hover:bg-white/20 hover:shadow-lg">
                    <h3 className="mb-3 text-2xl font-bold text-white">
                      {activity.title}
                    </h3>
                    <p className="mb-2 text-sm text-white">
                      <span className="font-semibold">Address:</span>{" "}
                      {activity.address}
                    </p>
                    <p className="mb-2 text-sm text-white">
                      <span className="font-semibold">City:</span>{" "}
                      {activity.city.city_name_full}
                    </p>
                    <p className="mb-2 text-sm text-white">
                      <span className="font-semibold">Category:</span>{" "}
                      {activity.sport_category?.name || 'N/A'}
                    </p>
                    <p className="text-sm text-white">
                      <span className="font-semibold">Price:</span>{" "}
                      {activity.price}
                    </p>
                  </li>
                </Link>
              ))}
            </ul>
          ) : (
            <p className="text-lg text-center text-gray-500">
              No activities found for the selected filters.
            </p>
          )}
        </div>
      </div>

      <div className="mt-12">
        <Footer />
      </div>
    </div>
  );
};

export default SearchFilters;
