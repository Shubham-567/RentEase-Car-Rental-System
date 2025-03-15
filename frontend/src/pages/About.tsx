import { Link } from "react-router-dom";
const About = () => {
  return (
    <section className='min-h-screen flex items-center justify-center px-6 py-12'>
      <div className='max-w-5xl w-full bg-background-50 shadow-lg rounded-lg p-10 md:p-16 flex flex-col md:flex-row items-center gap-10'>
        {/* Left Section: Text Content */}
        <div className='flex-1 text-center md:text-left'>
          <h1 className='text-4xl font-extrabold text-text-950 md:text-5xl leading-tight'>
            About <span className='text-primary-500'>RentEase</span>
          </h1>
          <div className='w-32 h-1 bg-accent-500 my-4 mx-auto md:mx-0'></div>

          <p className='text-lg text-text-900 md:text-xl mt-4 leading-relaxed'>
            RentEase makes car rentals simple and hassle-free. Whether you need
            a luxury car or an affordable ride, we have you covered.
          </p>

          <p className='text-text-800 text-lg mt-4'>
            Enjoy a seamless rental experience with transparent pricing and
            top-notch customer support.
          </p>

          <div className='mt-6'>
            <Link to='/browse-cars'>
              <button
                className='px-6 py-3 bg-primary-500 text-text-50 dark:text-text-950 font-semibold text-lg rounded-lg hover:shadow-2xl hover:bg-primary-600 hover:shadow-primary-400 hover:-translate-y-1 transform transition duration-300'
                aria-label='Explore Cars'>
                Explore Cars
              </button>
            </Link>
          </div>
        </div>

        {/* Right Section: Image */}
        <div className='flex-1 flex flex-col justify-center items-center'>
          <img
            src='https://plus.unsplash.com/premium_photo-1661486495613-735044caebf3'
            alt='About RentEase'
            className='rounded-lg shadow-md w-full max-w-lg'
          />

          {/* 
          <p className='mt-4 text-gray-500 text-center text-lg'>
            Designed & developed by
            <span className='text-primary-500 font-semibold'> Shubham</span>
          </p> */}
        </div>
      </div>
    </section>
  );
};

export default About;
