import { Link } from "react-router-dom";

// Define the type for Car Props
interface CarCardProps {
  id: number;
  name: string;
  brand: string;
  model: string;
  year: number;
  images: string[];
  price_per_day: number;
  type: string;
  fuel_type: string;
  transmission: string;
  seats: number;
}

const CarCard: React.FC<CarCardProps> = ({
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
}) => {
  return (
    <div className='bg-secondary-50 border border-gray-200 rounded-xl shadow-lg overflow-hidden transform transition-all ease-in-out duration-300 hover:scale-102 hover:shadow-2xl'>
      <div className='relative'>
        <img
          src={images[0]}
          alt={name}
          className='w-full h-56 object-cover rounded-t-xl'
        />
        <span className='absolute top-4 left-4 bg-accent-600 text-white px-4 py-1 text-sm font-bold rounded-full shadow-md'>
          {type}
        </span>
      </div>
      <div className='p-5 text-center'>
        <h3 className='text-xl font-semibold text-gray-900'>
          {brand} {model} ({year})
        </h3>
        <p className='text-gray-600 mt-1 text-sm'>
          {fuel_type} • {transmission} • {seats} Seats
        </p>
        <p className='text-lg font-semibold text-gray-800 mt-2'>
          ₹{price_per_day.toLocaleString()}/day
        </p>
        <Link
          to={`/cars/${id}`}
          className='mt-4 inline-block w-full bg-primary-500 text-white px-4 py-2 rounded-lg text-md font-medium shadow-md transition-all duration-300 hover:bg-primary-600 hover:shadow-lg'>
          Rent Now
        </Link>
      </div>
    </div>
  );
};

export default CarCard;
