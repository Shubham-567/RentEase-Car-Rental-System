import { useEffect, useState } from "react";
import { useCarStore } from "../store/carsStore";
import CarHero from "../components/Cars/CarHero";
import Filters from "../components/Cars/Filters";
import CarCard from "../components/Cars/CarCard";

const CarsBrowse = () => {
  const { cars, loading, error, loadCars } = useCarStore();
  const [filteredCars, setFilteredCars] = useState(cars);
  const [visibleCount, setVisibleCount] = useState(8);
  const [searchQuery, setSearchQuery] = useState("");

  const [filters, setFilters] = useState({
    fuel_type: "",
    transmission: "",
    type: "",
  });

  useEffect(() => {
    loadCars();
  }, []);

  useEffect(() => {
    setFilteredCars(
      cars.filter((car) => {
        return (
          (filters.fuel_type === "" || car.fuel_type === filters.fuel_type) &&
          (filters.transmission === "" ||
            car.transmission === filters.transmission) &&
          (filters.type === "" || car.type === filters.type) &&
          (searchQuery === "" ||
            car.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            car.brand.toLowerCase().includes(searchQuery.toLowerCase()))
        );
      })
    );
  }, [cars, filters, searchQuery]);

  return (
    <div className='px-6'>
      {/* Hero Section */}
      <CarHero searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      {/* Filters Section */}
      <Filters filters={filters} setFilters={setFilters} />

      {/* Car Listings Section */}
      <section id='car-listings' className='py-12'>
        <div className='max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
          {/* Loading Skeletons */}
          {loading ? (
            Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className='bg-secondary-50 border border-primary-200 rounded-xl shadow-lg overflow-hidden animate-pulse'>
                {/* Image Placeholder */}
                <div className='relative'>
                  <div className='w-full h-56 bg-primary-100 rounded-t-xl'></div>
                  <div className='absolute top-4 left-4 bg-secondary-200 h-6 w-16 rounded-full'></div>
                </div>

                <div className='p-5 text-center'>
                  <div className='h-6 w-3/4 bg-text-100 rounded-md mx-auto'></div>
                  <div className='h-4 w-1/2 bg-text-100 rounded-md mx-auto mt-2'></div>
                  <div className='h-6 w-1/3 bg-text-100 rounded-md mx-auto mt-3'></div>
                  <div className='h-10 w-full bg-primary-100 rounded-lg mt-4'></div>
                </div>
              </div>
            ))
          ) : error ? (
            <div className='col-span-full flex justify-center'>
              <p className='my-10 text-center text-xl text-red-600 max-w-lg'>
                <span className='font-bold'>Error: </span> {error}
              </p>
            </div>
          ) : filteredCars.length > 0 ? (
            filteredCars
              .slice(0, visibleCount)
              .map((car) => <CarCard key={car.id} {...car} />)
          ) : (
            <p className='text-center text-primary-500 col-span-full'>
              No cars match your filters.
            </p>
          )}
        </div>

        {/* Load More Button */}
        {visibleCount < filteredCars.length && !loading && (
          <div className='flex justify-center mt-8'>
            <button
              onClick={() => setVisibleCount((prev) => prev + 8)}
              className='bg-accent-500 text-white px-6 py-3 rounded-lg text-md md:text-lg font-bold shadow-lg transition-all duration-300 transform hover:-translate-y-2 hover:bg-accent-500 hover:shadow-2xl hover:shadow-accent-500 dark:hover:shadow-accent-200'>
              Load More
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default CarsBrowse;
