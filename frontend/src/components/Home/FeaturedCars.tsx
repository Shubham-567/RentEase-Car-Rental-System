import { Link } from "react-router-dom";
import { useCarStore } from "../../store/carsStore";
import { useEffect } from "react";

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
              className='bg-secondary-50 border border-secondary rounded-2xl shadow-md overflow-hidden animate-pulse'>
              <div className='w-full h-48 sm:h-84 lg:h-64 bg-gray-300'></div>
              <div className='p-4 sm:p-6 text-center'>
                <div className='h-6 bg-gray-300 rounded w-3/4 mx-auto'></div>
                <div className='h-4 bg-gray-300 rounded w-1/2 mx-auto mt-2'></div>
                <div className='h-5 bg-gray-300 rounded w-1/3 mx-auto mt-4'></div>
                <div className='h-10 bg-gray-300 rounded w-full mt-6'></div>
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
          {cars
            .slice(0, 3)
            .map(
              ({
                id,
                name,
                brand,
                model,
                year,
                images,
                price_per_day,
                type,
                fuel_type,
                transmission,
                seats,
              }) => (
                <div
                  key={id}
                  className='bg-secondary-50 border border-secondary rounded-2xl shadow-md overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl'>
                  <div className='relative'>
                    <img
                      src={images[0]}
                      alt={name}
                      className='w-full h-48 sm:h-84 lg:h-64 object-cover rounded-t-2xl'
                    />
                    <span className='absolute top-4 left-4 bg-accent-500 text-text-50 px-4 py-2 text-sm font-semibold rounded-full shadow-lg'>
                      {type}
                    </span>
                  </div>
                  <div className='p-4 sm:p-6 text-center'>
                    <h3 className='text-lg sm:text-xl font-semibold text-text-900'>
                      {brand} {model} ({year})
                    </h3>
                    <p className='text-sm sm:text-md text-gray-600 mt-1'>
                      {fuel_type} • {transmission} • {seats} Seats
                    </p>
                    <p className='text-lg sm:text-xl font-semibold text-text-900 mt-2'>
                      ₹{price_per_day.toLocaleString()}/day
                    </p>
                    <Link
                      to={`/cars/${id}`}
                      className='mt-4 sm:mt-6 inline-block w-full bg-primary-500 text-white font-bold px-4 py-2 sm:py-3 rounded-xl text-lg shadow-lg transition-all duration-300 hover:bg-primary-600 hover:shadow-xl'>
                      Rent Now
                    </Link>
                  </div>
                </div>
              )
            )}
        </div>
      )}
    </section>
  );
};

export default FeaturedCars;
