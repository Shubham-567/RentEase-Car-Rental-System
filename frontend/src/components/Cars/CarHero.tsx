import { Search } from "lucide-react";

interface CarHeroProps {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

const CarHero: React.FC<CarHeroProps> = ({ searchQuery, setSearchQuery }) => {
  return (
    <section className='relative text-text-900 text-center py-24 px-6'>
      <div className='max-w-3xl mx-auto'>
        <h1 className='text-6xl font-extrabold text-text-900 leading-tight drop-shadow-md'>
          Find Your Perfect Ride
        </h1>
        <p className='text-xl text-text-700 mt-5 max-w-xl mx-auto text-center leading-relaxed'>
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

        <div className='mt-8 flex justify-center'>
          <div className='flex items-center bg-background-100 backdrop-blur-lg border border-gray-300 rounded-full shadow-lg w-full max-w-lg p-2 transition-all duration-300 focus-within:ring-2 focus-within:ring-primary-500'>
            <Search className='text-gray-500 mx-3' size={20} />
            <input
              type='text'
              placeholder='Search cars by name, brand...'
              aria-label='Search for rental cars'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className='flex-1 bg-transparent text-text-950  placeholder-gray-500 focus:outline-none text-lg px-2'
            />
            <button
              className='bg-primary-500 text-text-50 px-6 py-3 rounded-full font-medium hover:bg-primary-600 transition-all duration-300 shadow-md'
              onClick={() => {
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
