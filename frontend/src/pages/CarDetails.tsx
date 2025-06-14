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
  Star,
  CheckCircle,
  ChevronLeft,
} from "lucide-react";

import CarDetailsCard from "../components/Cars/CarDetailsCard";
import DangerAlert from "../components/DangerAlert";

const CarDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { selectedCar, loadCarById, loading, error } = useCarStore();

  useEffect(() => {
    if (id) {
      loadCarById(parseInt(id));
    }
  }, [id, loadCarById]);

  // --------- Skeleton ---------
  if (loading)
    return (
      <div className='container mx-auto px-3 md:px-0 py-6 animate-pulse'>
        {/* Back Button Skeleton */}
        <div className='h-6 w-42 bg-primary-100 rounded-lg mb-6'></div>

        {/* Car Details Card Skeleton */}
        <div className='p-6 sm:p-8 bg-background-50 rounded-2xl relative overflow-hidden'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-12'>
            {/* Image Placeholder */}
            <div className='w-full h-78 bg-accent-100 rounded-xl'></div>

            {/* Car Details */}
            <div className='flex flex-col gap-6'>
              <div className='h-8 w-3/4 bg-primary-100 rounded-md'></div>
              <div className='flex flex-wrap gap-3'>
                <div className='h-6 w-24 bg-primary-100 rounded-full'></div>
                <div className='h-6 w-20 bg-primary-100 rounded-full'></div>
                <div className='h-6 w-28 bg-primary-100 rounded-full'></div>
              </div>
              <div className='h-5 w-full bg-primary-100 rounded-md'></div>
              <div className='h-5 w-2/3 bg-primary-100 rounded-md'></div>
            </div>
          </div>
        </div>

        {/* Features Section Skeleton */}
        <div className='mt-12 p-6 bg-background-50 rounded-xl shadow-lg'>
          <div className='h-6 w-40 bg-primary-100 rounded-md mb-4'></div>
          <div className='grid grid-cols-2 md:grid-cols-3 gap-6'>
            {Array(6)
              .fill(null)
              .map((_, index) => (
                <div
                  key={index}
                  className='h-16 bg-primary-100 rounded-md'></div>
              ))}
          </div>
        </div>

        {/* Reviews Section Skeleton */}
        <div className='mt-12 p-6 bg-background-50 rounded-xl shadow-lg'>
          <div className='h-6 w-40 bg-primary-100 rounded-md mb-4'></div>
          {Array(3)
            .fill(null)
            .map((_, index) => (
              <div key={index} className='p-4 bg-secondary-50 rounded-lg mb-4'>
                <div className='h-4 w-24 bg-primary-100 rounded-md mb-2'></div>
                <div className='h-5 w-3/4 bg-primary-100 rounded-md'></div>
              </div>
            ))}
        </div>
      </div>
    );

  if (error)
    return (
      <div className='max-w-[20%] my-20 col-span-full flex flex-col mx-auto justify-center'>
        <DangerAlert message={error} />

        <button
          onClick={() => {
            if (id) loadCarById(Number(id));
          }}
          className='bg-primary-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-primary-600 transition'>
          Retry
        </button>
      </div>
    );

  if (!selectedCar)
    return <div className='text-center mt-10'>Car not found</div>;

  return (
    <div className='container mx-auto px-3 md:px-0 py-6'>
      {/* Back Button */}
      <Link
        to='/browse-cars'
        className='text-primary-500 font-medium flex items-center gap-2 mb-6 transition-all duration-300 hover:text-primary-800'>
        <ChevronLeft />
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
