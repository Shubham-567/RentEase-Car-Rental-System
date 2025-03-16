import { Star } from "lucide-react";

const reviews = [
  {
    name: "Emily Johnson",
    rating: 5,
    review:
      "RentEase made my trip effortless! The car was clean, well-maintained, and the service was top-notch.",
  },
  {
    name: "Michael Smith",
    rating: 4,
    review:
      "Great selection of vehicles and smooth booking process. Highly recommended for anyone needing a rental!",
  },
  {
    name: "Sophia Martinez",
    rating: 5,
    review:
      "Absolutely fantastic experience! The customer service was outstanding, and the car exceeded my expectations!",
  },
];

const CustomerReviews = () => {
  return (
    <section className='py-16 px-6 md:px-12 lg:px-20 bg-background'>
      <div className='max-w-6xl mx-auto text-center'>
        <h2 className='text-3xl sm:text-4xl md:text-5xl font-bold text-text-950 tracking-wide mb-4'>
          What Our Customers Say
        </h2>
        <p className='text-gray-500 text-base sm:text-lg mb-12'>
          Hear from our happy customers who have experienced our service.
        </p>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8'>
          {reviews.map((review, index) => (
            <div
              key={index}
              className='p-6 sm:p-8 bg-background-50 border border-primary-500 rounded-3xl shadow-md transition-all duration-300 hover:shadow-2xl hover:scale-[1.03] flex flex-col items-center text-center'>
              <div className='flex justify-center mb-4'>
                {[...Array(review.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className='text-primary w-5 h-5 sm:w-6 sm:h-6 fill-current'
                    fill='currentColor'
                  />
                ))}
              </div>
              <p className='text-text-900 text-base sm:text-lg italic leading-relaxed'>
                "{review.review}"
              </p>
              <h4 className='mt-4 font-semibold text-text-500 text-lg sm:text-xl'>
                - {review.name}
              </h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CustomerReviews;
