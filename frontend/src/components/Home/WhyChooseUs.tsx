import { CheckCircle, Headset, Car, CalendarCheck } from "lucide-react";

const WhyChooseUs = () => {
  return (
    <section className='py-16 px-6 bg-background-50 dark:bg-background-50'>
      <div className='text-center mb-12'>
        <h2 className='text-3xl sm:text-4xl md:text-5xl font-extrabold text-text-950 tracking-wide'>
          Why Choose Us?
        </h2>
        <p className='text-gray-500 mt-4 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed'>
          Experience the best car rental service with unmatched benefits.
        </p>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto text-center'>
        <div className='bg-accent-50 p-6 sm:p-8 lg:p-10 rounded-3xl border border-accent shadow-lg hover:shadow-2xl transition-transform hover:-translate-y-2'>
          <CheckCircle className='w-14 h-14 sm:w-16 sm:h-16 mx-auto text-accent-500' />
          <h3 className='text-xl sm:text-2xl font-bold mt-4 sm:mt-6 text-text-950'>
            Affordable Prices
          </h3>
          <p className='text-gray-600 mt-3 text-sm sm:text-base leading-relaxed'>
            Get the best deals on a wide range of rental cars.
          </p>
        </div>

        <div className='bg-accent-50 p-6 sm:p-8 lg:p-10 rounded-3xl border border-accent shadow-lg hover:shadow-2xl transition-transform hover:-translate-y-2'>
          <Headset className='w-14 h-14 sm:w-16 sm:h-16 mx-auto text-accent-500' />
          <h3 className='text-xl sm:text-2xl font-bold mt-4 sm:mt-6 text-text-950'>
            24/7 Support
          </h3>
          <p className='text-gray-600 mt-3 text-sm sm:text-base leading-relaxed'>
            Our team is here to assist you anytime, anywhere.
          </p>
        </div>

        <div className='bg-accent-50 p-6 sm:p-8 lg:p-10 rounded-3xl border border-accent shadow-lg hover:shadow-2xl transition-transform hover:-translate-y-2'>
          <Car className='w-14 h-14 sm:w-16 sm:h-16 mx-auto text-accent-500' />
          <h3 className='text-xl sm:text-2xl font-bold mt-4 sm:mt-6 text-text-950'>
            Wide Selection
          </h3>
          <p className='text-gray-600 mt-3 text-sm sm:text-base leading-relaxed'>
            Choose from luxury, SUVs, and budget-friendly cars.
          </p>
        </div>

        <div className='bg-accent-50 p-6 sm:p-8 lg:p-10 rounded-3xl border border-accent shadow-lg hover:shadow-2xl transition-transform hover:-translate-y-2'>
          <CalendarCheck className='w-14 h-14 sm:w-16 sm:h-16 mx-auto text-accent-500' />
          <h3 className='text-xl sm:text-2xl font-bold mt-4 sm:mt-6 text-text-950'>
            Easy Booking
          </h3>
          <p className='text-gray-600 mt-3 text-sm sm:text-base leading-relaxed'>
            Book your car rental in just a few clicks.
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
