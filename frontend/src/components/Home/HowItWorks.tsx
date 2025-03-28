const HowItWorks = () => {
  return (
    <section className='py-16 px-6 bg-background-50'>
      <div className='text-center mb-12'>
        <h2 className='text-3xl sm:text-4xl md:text-5xl font-extrabold text-text-950 tracking-wide'>
          How It Works
        </h2>
        <p className='text-gray-500 mt-4 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed'>
          Renting a car with us is quick and hassle-free. Just follow these
          simple steps!
        </p>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto text-center'>
        <div className='bg-secondary-50 p-6 sm:p-8 md:p-10 rounded-3xl border border-secondary shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2'>
          <div className='w-16 h-16 sm:w-20 sm:h-20 mx-auto bg-accent-500 text-white flex items-center justify-center rounded-full text-3xl sm:text-4xl font-bold shadow-md'>
            1
          </div>
          <h3 className='text-xl sm:text-2xl font-bold mt-6 text-text-950'>
            Choose Your Car
          </h3>
          <p className='text-gray-600 mt-3 text-sm sm:text-base leading-relaxed'>
            Explore our selection of luxury, SUVs, and budget-friendly cars to
            find your perfect ride.
          </p>
        </div>

        <div className='bg-secondary-50 p-6 sm:p-8 md:p-10 rounded-3xl border border-secondary shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2'>
          <div className='w-16 h-16 sm:w-20 sm:h-20 mx-auto bg-accent-500 text-white flex items-center justify-center rounded-full text-3xl sm:text-4xl font-bold shadow-md'>
            2
          </div>
          <h3 className='text-xl sm:text-2xl font-bold mt-6 text-text-950'>
            Book Easily
          </h3>
          <p className='text-gray-600 mt-3 text-sm sm:text-base leading-relaxed'>
            Select your dates, confirm your booking, and receive instant
            confirmation.
          </p>
        </div>

        <div className='bg-secondary-50 p-6 sm:p-8 md:p-10 rounded-3xl border border-secondary shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2'>
          <div className='w-16 h-16 sm:w-20 sm:h-20 mx-auto bg-accent-500 text-white flex items-center justify-center rounded-full text-3xl sm:text-4xl font-bold shadow-md'>
            3
          </div>
          <h3 className='text-xl sm:text-2xl font-bold mt-6 text-text-950'>
            Drive & Enjoy
          </h3>
          <p className='text-gray-600 mt-3 text-sm sm:text-base leading-relaxed'>
            Pick up your car and enjoy a seamless, comfortable ride wherever you
            go.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
