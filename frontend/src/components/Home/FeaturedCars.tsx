import { useCarStore } from "../../store/carsStore";
import { useEffect } from "react";
import CarCard from "../Cars/CarCard";

const FeaturedCars = () => {
  const { cars, loading, error, loadCars } = useCarStore();

  useEffect(() => {
    loadCars();
  }, []);

  return (
    <section className='py-16 px-4 sm:px-8 md:px-12'>
      <div className='text-center mb-10'>
        <h2 className='text-3xl sm:text-4xl md:text-5xl font-bold text-text-950'>
          Featured Cars
        </h2>
        <p className='text-gray-500 mt-4 text-base sm:text-lg max-w-2xl mx-auto'>
          Discover top-rated vehicles available for rent at unbeatable prices.
        </p>
      </div>

      {loading && (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto'>
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className='bg-secondary-50 border border-primary-200 rounded-xl shadow-lg overflow-hidden animate-pulse'>
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
          ))}
        </div>
      )}

      {error && !loading && (
        <div className='w-full sm:w-2/3 md:w-1/3 mx-auto text-center'>
          <div className='text-red-500 my-10 text-lg sm:text-xl'>
            <span className='font-bold'>Error: </span>
            {error}
          </div>
          <button
            onClick={loadCars}
            className='bg-primary-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-primary-600 transition'>
            Retry
          </button>
        </div>
      )}

      {!loading && !error && (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto'>
          {cars.slice(0, 3).map((car) => (
            <CarCard key={car.id} {...car} />
          ))}
        </div>
      )}
    </section>
  );
};

export default FeaturedCars;
