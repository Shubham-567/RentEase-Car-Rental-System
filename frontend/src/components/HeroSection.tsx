import heroImg from "../assets/hero-image.png";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className='relative flex flex-col lg:flex-row items-center justify-between px-6 md:px-16 py-16 lg:py-30'>
      {/* Hero Text Section */}
      <div className='w-full lg:w-1/2 max-w-lg space-y-6 text-center lg:text-left'>
        <h1 className='text-4xl md:text-6xl font-extrabold text-text-900 leading-tight'>
          Rent Your Dream Car Today!
        </h1>
        <p className='text-base md:text-lg text-text-700'>
          Choose from our wide selection of luxury, SUVs, and budget-friendly
          cars all at unbeatable prices. Find the perfect ride for your needs
          today!
        </p>
        <div className='flex flex-wrap justify-center lg:justify-start gap-4'>
          <Link
            to='/cars'
            className='bg-primary-500 text-white px-6 py-2 rounded-lg text-lg font-medium shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-primary-300 hover:bg-primary-600'
            aria-label='Explore Cars'>
            Explore Cars
          </Link>
          <Link
            to='/booking'
            className='bg-secondary-500 text-white px-6 py-2 rounded-lg text-lg font-medium transition-all duration-300 transform hover:-translate-y-1 hover:bg-secondary-600'
            aria-label='Book Now'>
            Book Now
          </Link>
        </div>
      </div>

      {/* Hero Image Section */}
      <div className='w-full lg:w-1/2 flex justify-center relative mt-20 lg:mt-0'>
        {/* Image Background */}
        <div className='absolute top-[-20px] w-[80%] h-[300px] md:h-[350px] rounded-full opacity-40 scale-105 bg-primary blur-2xl'></div>

        {/* Hero Image */}
        <img
          src={heroImg}
          alt='Luxury Car Rental'
          className='relative w-[80%] md:w-[90%] max-w-md md:max-w-lg drop-shadow-xl'
        />
      </div>
    </section>
  );
};

export default HeroSection;
