import { useEffect, useState } from "react";
import { useCarStore } from "../../store/carsStore";
import type { Car } from "../../store/carsStore";
import { Car as CarIcon, PlusCircle, Trash, Edit, Filter } from "lucide-react";

import AddEditCarModal from "../../components/Admin/AddEditCarModal";

const ManageCars = () => {
  const { cars, loadCars, deleteCarById } = useCarStore();
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [availability, setAvailability] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [filteredCars, setFilteredCars] = useState<Car[]>([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    loadCars();
  }, []);

  useEffect(() => {
    setFilteredCars([...cars].reverse());
  }, [cars]);

  // Filter Cars on Button Click
  const handleFilter = () => {
    const updatedCars = cars.filter((car) => {
      const matchesSearch =
        searchTerm === "" ||
        car.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.brand.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesYear =
        selectedYear === "" || car.year.toString() === selectedYear;

      const matchesBrand = selectedBrand === "" || car.brand === selectedBrand;

      const matchesAvailability =
        availability === "" ||
        (availability === "available" && car.availability) ||
        (availability === "unavailable" && !car.availability);

      // Price Filter
      let matchesPrice = true;
      if (priceRange) {
        const [min, max] = priceRange.split("-").map(Number);
        matchesPrice = car.price_per_day >= min && car.price_per_day <= max;
      }

      return (
        matchesSearch &&
        matchesYear &&
        matchesBrand &&
        matchesAvailability &&
        matchesPrice
      );
    });

    setFilteredCars(updatedCars.reverse());
  };

  // Pagination
  const carsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(filteredCars.length / carsPerPage);
  const startIndex = (currentPage - 1) * carsPerPage;
  const endIndex = startIndex + carsPerPage;
  const paginatedCars = filteredCars.slice(startIndex, endIndex);

  const handleDelete = async (carId: number) => {
    if (window.confirm("Are you sure you want to delete this car?")) {
      await deleteCarById(carId, token!);
      handleFilter(); // Refresh list after deletion
    }
  };

  return (
    <div className='p-8 bg-background-50 min-h-screen'>
      <div className='flex justify-between items-center'>
        <h2 className='text-4xl font-bold text-text-950 mb-8 flex items-center gap-3'>
          <CarIcon size={40} className='text-accent-500' /> Manage Cars
        </h2>

        {/* Add Car Button */}
        <button
          onClick={() => {
            setSelectedCar(null);
            setIsModalOpen(true);
          }}
          className='mb-6 px-5 py-3 bg-primary-500 text-white font-medium rounded-lg flex items-center gap-2 hover:bg-primary-600 transition-all shadow-md'>
          <PlusCircle size={22} /> Add New Car
        </button>
      </div>

      {/* Filters Section */}
      <div className='bg-accent-50 p-5 mb-6 rounded-xl shadow-lg flex flex-wrap gap-4 items-center'>
        {/* Search Input */}
        <input
          type='text'
          placeholder='Search by Name or Brand'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className='p-3 flex-1 border text-text-950 border-gray-300 rounded-lg w-64 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-400 bg-white dark:bg-background-50'
        />

        {/* Year Dropdown */}
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          className='p-3 text-text-950 border border-gray-300 rounded-lg w-44 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-400 bg-white dark:bg-background-50'>
          <option value=''>All Years</option>
          {Array.from(new Set(cars.map((car) => car.year))).map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>

        {/* Brand Dropdown */}
        <select
          value={selectedBrand}
          onChange={(e) => setSelectedBrand(e.target.value)}
          className='p-3 text-text-950 border border-gray-300 rounded-lg w-44 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-400 bg-white dark:bg-background-50'>
          <option value=''>All Brands</option>
          {Array.from(new Set(cars.map((car) => car.brand))).map((brand) => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
        </select>

        {/* Availability Dropdown */}
        <select
          value={availability}
          onChange={(e) => setAvailability(e.target.value)}
          className='p-3 text-text-950 border border-gray-300 rounded-lg w-44 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-400 bg-white dark:bg-background-50'>
          <option value=''>All Cars</option>
          <option value='available'>Available</option>
          <option value='unavailable'>Unavailable</option>
        </select>

        {/* Price Range Dropdown */}
        <select
          value={priceRange}
          onChange={(e) => setPriceRange(e.target.value)}
          className='p-3 text-text-950 border border-gray-300 rounded-lg w-44 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-400 bg-white dark:bg-background-50'>
          <option value=''>All Prices</option>
          <option value='0-500'>₹0 - ₹500</option>
          <option value='500-1000'>₹500 - ₹1000</option>
          <option value='1000-2000'>₹1000 - ₹2000</option>
          <option value='2000-5000'>₹2000 - ₹5000</option>
          <option value='5000-10000'>₹5000 - ₹10000</option>
        </select>

        {/* Apply Filters Button */}
        <button
          onClick={handleFilter}
          className='px-5 py-3 bg-secondary-500 text-white font-bold flex gap-2 items-center rounded-lg hover:bg-secondary-600 transition-all shadow-md focus:ring-2 focus:ring-secondary-400 active:scale-95'>
          <Filter size={20} /> Filter Cars
        </button>
      </div>

      {/* Cars Table */}
      <div className='overflow-x-auto bg-secondary-50 p-6 rounded-xl shadow-lg border border-gray-200'>
        {filteredCars.length === 0 ? (
          <p className='text-center text-gray-500 col-span-full'>
            No cars match your filters.
          </p>
        ) : (
          <table className='w-full text-gray-700 border-collapse rounded-lg overflow-hidden shadow-md'>
            <thead>
              <tr className='bg-primary-500 text-white text-left'>
                <th className='p-4'>Image</th>
                <th className='p-4'>Name</th>
                <th className='p-4'>Brand</th>
                <th className='p-4'>Model</th>
                <th className='p-4'>Year</th>
                <th className='p-4'>Price/Day</th>
                <th className='p-4'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedCars.map((car, index) => (
                <tr
                  key={car.id}
                  className={`border-t border-primary-500 ${
                    index % 2 === 0 ? "bg-background-50" : "bg-secondary-50"
                  } hover:bg-background-100 transition-all`}>
                  <td className='p-4'>
                    <img
                      src={car.images[0]}
                      alt={car.name}
                      className='w-30 h-16 object-cover rounded-md'
                    />
                  </td>
                  <td className='p-4 font-medium text-gray-900'>{car.name}</td>
                  <td className='p-4'>{car.brand}</td>
                  <td className='p-4'>{car.model}</td>
                  <td className='p-4'>{car.year}</td>
                  <td className='p-4 font-semibold text-green-700'>
                    ₹{car.price_per_day.toLocaleString()}
                  </td>
                  <td className='p-4 flex gap-2'>
                    {/* Edit Button */}
                    <button
                      onClick={() => {
                        setSelectedCar(car);
                        setIsModalOpen(true);
                      }}
                      className='p-2 bg-green-600 text-white rounded-lg flex items-center gap-2 hover:bg-green-700 transition-all shadow-md focus:ring-2 focus:ring-green-400 focus:outline-none active:scale-95'>
                      <Edit size={18} /> Edit
                    </button>

                    {/* Delete Button */}
                    <button
                      onClick={() => handleDelete(car.id)}
                      className='p-2 bg-red-500 text-white rounded-lg flex items-center gap-2 hover:bg-red-700 transition-all shadow-md focus:ring-2 focus:ring-red-400 focus:outline-none active:scale-95'>
                      <Trash size={18} /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination Controls */}

      {filteredCars.length > carsPerPage && (
        <div className='flex justify-center mt-6 gap-4 items-center'>
          {/* Previous Button */}
          <button
            onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-lg shadow-md transition-all ${
              currentPage === 1
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-secondary-500 text-white font-bold hover:bg-secondary-600 active:scale-95 focus:ring-2 focus:ring-secondary-400"
            }`}>
            ← Previous
          </button>

          <span className='text-lg font-medium text-gray-700 dark:text-white'>
            Page {currentPage} of {totalPages}
          </span>

          {/* Next Button */}
          <button
            onClick={() =>
              setCurrentPage(Math.min(currentPage + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-lg shadow-md transition-all ${
              currentPage === totalPages
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-secondary-500 text-white font-bold hover:bg-secondary-600 active:scale-95 focus:ring-2 focus:ring-secondary-400"
            }`}>
            Next →
          </button>
        </div>
      )}

      {isModalOpen && (
        <AddEditCarModal
          car={selectedCar}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default ManageCars;
