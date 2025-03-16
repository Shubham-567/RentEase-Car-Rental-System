import { Link } from "react-router-dom";

const About = () => {
  return (
    <section className='min-h-screen flex items-center justify-center px-4 sm:px-6 py-6'>
      <div className='max-w-5xl w-full bg-background-50 shadow-lg rounded-lg p-6 md:p-12 flex flex-col lg:flex-row lg:items-start gap-10'>
        {/* Left Section: Text Content */}
        <div className='flex-1 text-left'>
          <h1 className='text-3xl md:text-5xl font-extrabold text-text-950 leading-tight'>
            About <span className='text-primary-500'>RentEase</span>
          </h1>
          <hr className='w-24 md:w-32 h-1 bg-accent-500 my-3 md:my-4' />

          <p className='text-base md:text-lg text-text-900 mt-4 leading-relaxed'>
            RentEase makes car rentals simple and hassle-free. Whether you need
            a luxury car or an affordable ride, we have you covered.
          </p>

          <p className='text-text-800 text-base md:text-lg mt-4'>
            Enjoy a seamless rental experience with transparent pricing and
            top-notch customer support.
          </p>

          <div className='mt-6'>
            <Link to='/browse-cars'>
              <button
                className='px-5 py-3 bg-primary-500 text-text-50 dark:text-text-950 font-semibold text-lg rounded-lg hover:shadow-2xl hover:bg-primary-600 hover:shadow-primary-400 hover:-translate-y-1 transform transition duration-300'
                aria-label='Explore Cars'>
                Explore Cars
              </button>
            </Link>
          </div>
        </div>

        {/* Right Section: Image */}
        <div className='flex-1 flex flex-col items-start'>
          <img
            src='https://plus.unsplash.com/premium_photo-1661486495613-735044caebf3'
            alt='About RentEase'
            className='rounded-lg shadow-md w-full max-w-xs sm:max-w-sm md:max-w-md'
          />
          <p className='mt-4 text-gray-500 text-left text-lg'>
            Designed & developed by
            <span className='text-primary-500 font-semibold'> Shubham</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
