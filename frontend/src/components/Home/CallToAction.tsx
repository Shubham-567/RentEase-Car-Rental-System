import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const CallToAction = () => {
  return (
    <section className='relative text-black py-16 sm:py-24 px-4 sm:px-8 flex flex-col items-center text-center overflow-hidden'>
      <h2 className='text-3xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight relative z-10 text-text-950 drop-shadow-xl'>
        Ready to Hit the Road?
      </h2>
      <p className='text-md sm:text-lg md:text-xl lg-2xl mt-6 max-w-3xl relative z-10 text-text-800 leading-relaxed'>
        Drive your dream car today with effortless booking and unbeatable
        prices.
      </p>

      <Link
        to='/browse-cars'
        className='mt-10 bg-accent-400 text-white px-6 sm:px-10 py-3 sm:py-4 rounded-full text-lg sm:text-xl md:text-2xl font-bold flex items-center gap-3 sm:gap-4 shadow-lg transition-all duration-300 transform hover:-translate-y-2 hover:bg-accent-500 hover:shadow-2xl hover:shadow-accent-500 dark:hover:shadow-accent-200 relative z-10'
        aria-label='Get Started'>
        Get Started <ArrowRight className='w-6 h-6 sm:w-7 sm:h-7' />
      </Link>
    </section>
  );
};

export default CallToAction;
