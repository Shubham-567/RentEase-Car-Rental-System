import { Link } from "react-router-dom";
import { useCarStore } from "../../store/carsStore";
import { useEffect } from "react";
import DangerAlert from "../DangerAlert";

const FeaturedCars = () => {
  const { cars, loading, error, loadCars } = useCarStore();

  useEffect(() => {
    loadCars();
  }, []);

  if (loading)
    return <p className='text-center text-gray-600'>Loading cars...</p>;

  if (error)
    return (
      <div className='w-1/3 mx-auto'>
        <DangerAlert message={error} />{" "}
      </div>
    );

  return (
    <section className='py-24 px-6'>
      <div className='text-center mb-14'>
        <h2 className='text-5xl font-bold text-text-950'>Featured Cars</h2>
        <p className='text-gray-500 mt-4 text-lg max-w-2xl mx-auto'>
          Discover top-rated vehicles available for rent at unbeatable prices.
        </p>
      </div>

      <div className='grid md:grid-cols-3 sm:grid-cols-2 gap-10 max-w-7xl mx-auto'>
        {cars
          .slice(0, 3) // only 3 featured cars
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
                className='bg-secondary-50 border border-secondary rounded-2xl shadow-md overflow-hidden transform transition duration-300 hover:scale-102 hover:shadow-2xl'>
                <div className='relative'>
                  <img
                    src={images[0]}
                    alt={name}
                    className='w-full h-64 object-cover rounded-t-2xl'
                  />
                  <span className='absolute top-4 left-4 bg-accent-500 text-text-50 px-4 py-2 text-sm font-semibold rounded-full shadow-lg'>
                    {type}
                  </span>
                </div>
                <div className='p-6 text-center'>
                  <h3 className='text-2xl font-semibold text-text-900'>
                    {brand} {model} ({year})
                  </h3>
                  <p className='text-md text-gray-600 mt-1'>
                    {fuel_type} • {transmission} • {seats} Seats
                  </p>
                  <p className='text-xl font-semibold text-text-900 mt-2'>
                    ₹{price_per_day.toLocaleString()}/day
                  </p>
                  <Link
                    to={`/cars/${id}`}
                    className='mt-6 inline-block w-full bg-primary-500 text-text-50 px-4 py-2 rounded-xl text-lg font-medium shadow-lg transition-all duration-300 hover:bg-primary-600 hover:shadow-xl'>
                    Rent Now
                  </Link>
                </div>
              </div>
            )
          )}
      </div>
    </section>
  );
};

export default FeaturedCars;
