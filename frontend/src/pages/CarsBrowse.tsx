import { useEffect, useState } from "react";
import { useCarStore } from "../store/carsStore";
import DangerAlert from "../components/DangerAlert";
import CarHero from "../components/Cars/CarHero";
import Filters from "../components/Cars/Filters";
import CarCard from "../components/Cars/CarCard";

const CarsBrowse = () => {
  const { cars, loading, error, loadCars } = useCarStore();
  const [filteredCars, setFilteredCars] = useState(cars);
  const [visibleCount, setVisibleCount] = useState(8); // Show 8 initially
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
          (filters.type === "" || car.type === filters.type)
        );
      })
    );
  }, [cars, filters]);

  if (loading)
    return <p className='text-center text-gray-600'>Loading cars...</p>;

  if (error)
    return (
      <div className='w-1/3 mx-auto'>
        <DangerAlert message={error} />
      </div>
    );

  return (
    <div>
      <CarHero />
      <Filters filters={filters} setFilters={setFilters} />

      {/* Car Listings */}
      <section className='py-12 px-6'>
        <div className='max-w-7xl mx-auto grid lg:grid-cols-4 md:grid-cols-3 xs:grid-cols-2 gap-4 sm:gap-8'>
          {filteredCars.length > 0 ? (
            filteredCars
              .slice(0, visibleCount)
              .map((car) => <CarCard key={car.id} {...car} />)
          ) : (
            <p className='text-center text-gray-500 col-span-full'>
              No cars match your filters.
            </p>
          )}
        </div>

        {/* Load More Button */}
        {visibleCount < filteredCars.length && (
          <div className='flex justify-center mt-8'>
            <button
              onClick={() => setVisibleCount((prev) => prev + 8)}
              className='bg-secondary-500 text-white px-6 py-2 rounded-lg text-lg font-medium shadow-md transition-all duration-300 hover:bg-secondary-600 hover:shadow-lg'>
              Load More
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default CarsBrowse;
