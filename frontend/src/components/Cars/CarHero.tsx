import { Search } from "lucide-react";

interface CarHeroProps {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

const CarHero: React.FC<CarHeroProps> = ({ searchQuery, setSearchQuery }) => {
  return (
    <section className='relative text-text-900 text-center py-16 sm:py-24 px-6'>
      <div className='max-w-3xl mx-auto'>
        <h1 className='text-4xl sm:text-6xl font-extrabold text-text-900 leading-tight drop-shadow-md'>
          Find Your <br className='sm:hidden' /> Perfect Ride
        </h1>
        <p className='text-md sm:text-xl text-text-700 mt-5 max-w-xl mx-auto leading-relaxed'>
          Explore our{" "}
          <span className='font-semibold text-text-800'>
            top-rated rental cars
          </span>{" "}
          and find the perfect ride at{" "}
          <span className='text-primary-600 font-semibold'>
            unbeatable prices
          </span>
          .
        </p>

        {/* Search Bar */}
        <div className='mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-0'>
          {/* Mobile*/}
          <div className='w-full sm:hidden flex flex-col gap-3'>
            <div className='flex items-center bg-white/80 dark:bg-background-100 backdrop-blur-lg border border-gray-300 rounded-full shadow-lg w-full pl-1 py-3 focus-within:ring-2 focus-within:ring-primary-500'>
              <Search className='text-gray-500 mx-3' size={20} />
              <input
                type='text'
                placeholder='Search cars by name, brand...'
                aria-label='Search for rental cars'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className='flex-1 bg-transparent text-text-950 placeholder-gray-500 focus:outline-none text-base px-2'
              />
            </div>
            <button
              className='bg-primary-500 text-text-50 px-6 py-3 rounded-full font-medium hover:bg-primary-600 transition-all duration-300 shadow-md w-full'
              onClick={() => {
                searchQuery.length > 0 &&
                  document
                    .getElementById("car-listings")
                    ?.scrollIntoView({ behavior: "smooth" });
              }}>
              Search
            </button>
          </div>

          {/* Desktop */}
          <div className='hidden sm:flex items-center bg-white/80 dark:bg-background-100 backdrop-blur-lg border border-gray-300 rounded-full shadow-lg w-full sm:max-w-lg p-2 transition-all duration-300 focus-within:ring-2 focus-within:ring-primary-500'>
            <Search className='text-gray-500 mx-3' size={20} />
            <input
              type='text'
              placeholder='Search cars by name, brand...'
              aria-label='Search for rental cars'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className='flex-1 bg-transparent text-text-950 placeholder-gray-500 focus:outline-none text-lg px-2'
            />
            <button
              className='bg-primary-500 text-text-50 px-6 py-3 rounded-full font-medium hover:bg-primary-600 transition-all duration-300 shadow-md'
              onClick={() => {
                searchQuery.length > 0 &&
                  document
                    .getElementById("car-listings")
                    ?.scrollIntoView({ behavior: "smooth" });
              }}>
              Search
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CarHero;
