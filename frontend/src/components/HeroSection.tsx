import heroImg from "../assets/hero-image.png";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className='relative flex flex-col lg:flex-row items-center justify-between px-6 md:px-20 py-16 lg:py-32'>
      {/* Hero Text Section */}
      <div className='w-full lg:w-1/2 max-w-xl space-y-6 text-center lg:text-left'>
        <h1 className='text-4xl md:text-6xl font-extrabold text-text-900 leading-tight'>
          Rent Your Dream Car Today!
        </h1>
        <p className='text-lg md:text-xl text-text-700 leading-relaxed'>
          Choose from our wide selection of luxury, SUVs, and budget-friendly
          cars. Experience top-notch service and unbeatable prices!
        </p>
        <div className='flex flex-wrap justify-center lg:justify-start gap-5'>
          <Link
            to='/cars'
            className='bg-primary-500 text-white px-7 py-3 rounded-lg text-lg font-semibold shadow-2xl transition-transform duration-300 hover:-translate-y-1 hover:shadow-primary-400 hover:bg-primary-600'
            aria-label='Explore Cars'>
            Explore Cars
          </Link>
          <Link
            to='/booking'
            className='bg-secondary-500 text-black px-7 py-3 rounded-lg text-lg font-semibold transition-transform duration-300 hover:-translate-y-1 hover:shadow-secondary-400 hover:bg-secondary-600'
            aria-label='Book Now'>
            Book Now
          </Link>
        </div>
      </div>

      {/* Hero Image Section */}
      <div className='w-full lg:w-1/2 flex justify-center relative mt-16 lg:mt-0'>
        {/* Image Background */}
        <div className='absolute top-[-30px] w-[85%] h-[320px] md:h-[380px] rounded-full opacity-30 scale-110 bg-primary blur-3xl'></div>

        {/* Hero Image */}
        <img
          src={heroImg}
          alt='Luxury Car Rental'
          className='relative w-[90%] md:w-[95%] max-w-2xl drop-shadow-2xl'
        />
      </div>
    </section>
  );
};

export default HeroSection;
