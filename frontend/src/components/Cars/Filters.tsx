import { Fuel, Settings, Car } from "lucide-react";

interface FiltersProps {
  filters: {
    fuel_type: string;
    transmission: string;
    type: string;
  };
  setFilters: (filters: {
    fuel_type: string;
    transmission: string;
    type: string;
  }) => void;
}

const Filters: React.FC<FiltersProps> = ({ filters, setFilters }) => {
  return (
    <div className='max-w-7xl mx-auto px-6 py-6 sm:py-10'>
      <div className='flex flex-col sm:flex-row gap-4 sm:gap-6 items-center sm:items-stretch justify-center'>
        {/* Fuel Type */}
        <div className='relative w-full sm:w-1/3'>
          <Fuel
            className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-500'
            size={20}
          />
          <select
            className='w-full border border-gray-300 bg-white/80 dark:bg-background-100 text-text-900 pl-12 pr-4 py-3 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all'
            onChange={(e) =>
              setFilters({ ...filters, fuel_type: e.target.value })
            }>
            <option value=''>Fuel Type</option>
            <option value='Petrol'>Petrol</option>
            <option value='Diesel'>Diesel</option>
            <option value='Electric'>Electric</option>
            <option value='Hybrid'>Hybrid</option>
          </select>
        </div>

        {/* Transmission */}
        <div className='relative w-full sm:w-1/3'>
          <Settings
            className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-500'
            size={20}
          />
          <select
            className='w-full border border-gray-300 bg-white/80 dark:bg-background-100 text-text-900 pl-12 pr-4 py-3 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all'
            onChange={(e) =>
              setFilters({ ...filters, transmission: e.target.value })
            }>
            <option value=''>Transmission</option>
            <option value='Automatic'>Automatic</option>
            <option value='Manual'>Manual</option>
          </select>
        </div>

        {/* Car Type */}
        <div className='relative w-full sm:w-1/3'>
          <Car
            className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-500'
            size={20}
          />
          <select
            className='w-full border border-gray-300 bg-white/80 dark:bg-background-100 text-text-900 pl-12 pr-4 py-3 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all'
            onChange={(e) => setFilters({ ...filters, type: e.target.value })}>
            <option value=''>Car Type</option>
            <option value='Sedan'>Sedan</option>
            <option value='SUV'>SUV</option>
            <option value='Hatchback'>Hatchback</option>
            <option value='Luxury'>Luxury</option>
            <option value='Electric'>Electric</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Filters;
