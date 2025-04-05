import heroImg from "../../assets/hero-image.png";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className='relative flex flex-col lg:flex-row items-center justify-between px-6 sm:px-12 md:px-20 py-12 md:py-20 lg:py-32'>
      {/* Hero Text Section */}
      <div className='w-full lg:w-1/2 max-w-xl space-y-6 text-center lg:text-left'>
        <h1 className='text-4xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-text-900 leading-tight'>
          Rent Your Dream Car Today!
        </h1>
        <p className='text-base sm:text-lg md:text-xl text-text-900 leading-relaxed'>
          Choose from our wide selection of luxury, SUVs, and budget-friendly
          cars. Experience top-notch service and unbeatable prices!
        </p>

        {/* Call to Action Buttons */}
        <div className='flex flex-col sm:flex-row justify-center lg:justify-start gap-4 sm:gap-5'>
          <Link
            to='/browse-cars'
            className='bg-primary-500 text-text-50 dark:text-text-950 px-6 py-3 rounded-lg text-lg font-semibold hover:shadow-2xl transition-transform duration-300 hover:-translate-y-1 hover:shadow-primary-400 hover:bg-primary-600'
            aria-label='Explore Cars'>
            Explore Cars
          </Link>
          <Link
            to='/browse-cars'
            className='bg-secondary-500 text-text-950 dark:text-text-50 px-6 py-3 rounded-lg text-lg font-semibold transition-transform duration-300 hover:-translate-y-1 hover:shadow-secondary-400 hover:bg-secondary-600'
            aria-label='Book Now'>
            Book Now
          </Link>
        </div>
      </div>

      {/* Hero Image Section */}
      <div className='w-full lg:w-1/2 flex justify-center relative mt-12 lg:mt-0'>
        {/* Image Background */}
        <div className='absolute top-[-30px] w-[80%] sm:w-[85%] h-[280px] sm:h-[320px] md:h-[380px] rounded-full scale-110 bg-primary-500/30 dark:bg-primary-500/15 blur-3xl'></div>

        {/* Hero Image */}
        <img
          src={heroImg}
          alt='Luxury Car Rental'
          className='relative w-[85%] sm:w-[90%] md:w-[95%] max-w-2xl drop-shadow-2xl object-contain'
        />
      </div>
    </section>
  );
};

export default HeroSection;
