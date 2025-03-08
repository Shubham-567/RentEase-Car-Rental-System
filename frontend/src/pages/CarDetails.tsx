import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useCarStore } from "../store/carsStore";
import {
  Fuel,
  Settings,
  Car,
  Users,
  Shield,
  Gauge,
  Loader,
  Star,
  CheckCircle,
} from "lucide-react";

import CarDetailsCard from "../components/Cars/CarDetailsCard";

const CarDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { selectedCar, loadCarById, loading, error } = useCarStore();

  useEffect(() => {
    if (id) {
      loadCarById(parseInt(id));
    }
  }, [id, loadCarById]);

  if (loading)
    return (
      <div className='text-center mt-10'>
        <Loader className='animate-spin w-8 h-8 text-primary-500' />
      </div>
    );

  if (error)
    return <div className='text-center text-red-500 mt-10'>{error}</div>;

  if (!selectedCar)
    return <div className='text-center mt-10'>Car not found</div>;

  return (
    <div className='container mx-auto px-3 md:px-0 py-6'>
      {/* Back Button */}
      <Link
        to='/browse-cars'
        className='text-primary-600 font-medium flex items-center gap-2 mb-6 transition-all duration-300 hover:text-primary-800'>
        <svg
          className='w-5 h-5'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          viewBox='0 0 24 24'
          xmlns='http://www.w3.org/2000/svg'>
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M15 19l-7-7 7-7'></path>
        </svg>
        Back to Cars
      </Link>
      <CarDetailsCard car={selectedCar} />

      <div className='mt-12 space-y-10'>
        {/* Car Features & Specifications */}
        <div className='bg-background-100 p-6 rounded-xl shadow-lg border border-gray-200'>
          <h2 className='text-2xl font-semibold text-text-800 mb-6'>
            Car Features
          </h2>
          <ul className='grid sm:grid-cols-2 lg:grid-cols-3 gap-6 text-text-700'>
            {[
              { icon: Car, label: "Type", value: selectedCar.type },
              { icon: Fuel, label: "Fuel", value: selectedCar.fuel_type },
              {
                icon: Settings,
                label: "Transmission",
                value: selectedCar.transmission,
              },
              { icon: Users, label: "Seats", value: selectedCar.seats },
              { icon: Gauge, label: "Mileage", value: "15 km/l" },
              { icon: Shield, label: "Safety", value: "5-Star Rating" },
            ].map(({ icon: Icon, label, value }, index) => (
              <li
                key={index}
                className='flex items-center gap-3 p-3 rounded-lg bg-secondary-50 shadow-sm'>
                <Icon className='w-6 h-6 text-accent-500' />
                <span className='font-medium'>{label}:</span> {value}
              </li>
            ))}
          </ul>
        </div>

        {/* Customer Reviews */}
        <div>
          <h2 className='text-2xl font-semibold text-text-800 mb-6'>
            Customer Reviews
          </h2>
          <div className='space-y-5'>
            {[
              {
                name: "John Doe",
                review: "Great car! Smooth ride and excellent condition.",
                rating: 5,
              },
              {
                name: "Jane Smith",
                review: "Comfortable and well-maintained. Will rent again!",
                rating: 4,
              },
            ].map((review, index) => (
              <div
                key={index}
                className='p-5 bg-secondary-50 border border-gray-200 rounded-xl shadow-lg'>
                <div className='flex items-center gap-1 text-primary-500'>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < review.rating ? "fill-primary-500" : "fill-text-50"
                      }`}
                    />
                  ))}
                </div>
                <p className='text-text-700 mt-3'>{review.review}</p>
                <span className='text-text-500 text-sm block mt-3 font-medium'>
                  - {review.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Rental Terms & FAQs */}
        <div className='bg-background-100 p-6 rounded-xl shadow-lg border border-gray-200'>
          <h2 className='text-2xl font-semibold text-text-800 mb-6'>
            Rental Terms & FAQs
          </h2>
          <ul className='space-y-3 text-text-700'>
            {[
              "No smoking inside the car.",
              "Security deposit required at pickup.",
              "Insurance coverage available.",
              "Cancellation allowed within 24 hours.",
            ].map((term, index) => (
              <li
                key={index}
                className='flex items-center gap-3 p-3 rounded-lg bg-secondary-50 shadow-sm'>
                <CheckCircle className='w-5 h-5 text-accent-500' />
                {term}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;
