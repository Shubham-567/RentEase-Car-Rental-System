import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const CallToAction = () => {
  return (
    <section className='relative text-black py-20 px-8 flex flex-col items-center text-center overflow-hidden'>
      <h2 className='text-7xl font-extrabold tracking-tight relative z-10 text-text-950 drop-shadow-xl'>
        Ready to Hit the Road?
      </h2>
      <p className='text-2xl mt-6 max-w-3xl relative z-10 text-text-800 leading-relaxed'>
        Drive your dream car today with effortless booking and unbeatable
        prices.
      </p>

      <Link
        to='/cars'
        className='mt-10 bg-secondary-400 text-text-900 px-12 py-4 rounded-full text-2xl font-bold flex items-center gap-4 shadow-lg transition-all duration-300 transform hover:-translate-y-2 hover:bg-secondary-500 hover:shadow-2xl relative z-10'
        aria-label='Get Started'>
        Get Started <ArrowRight className='w-7 h-7' />
      </Link>
    </section>
  );
};

export default CallToAction;
