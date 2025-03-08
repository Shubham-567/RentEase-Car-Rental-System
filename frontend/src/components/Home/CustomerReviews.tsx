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
    <section className='py-20 px-6 md:px-20 bg-background'>
      <div className='max-w-6xl mx-auto text-center'>
        <h2 className='text-5xl font-bold text-text-950 tracking-wide mb-4'>
          What Our Customers Say
        </h2>
        <p className='text-gray-500 text-lg mb-12'>
          Hear from our happy customers who have experienced our service.
        </p>

        <div className='grid gap-8 md:grid-cols-3'>
          {reviews.map((review, index) => (
            <div
              key={index}
              className='p-8 bg-background-50 rounded-3xl shadow-md transition-all duration-300 hover:shadow-2xl hover:scale-105'>
              <div className='flex justify-center mb-4'>
                {[...Array(review.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className='text-primary w-6 h-6 fill-current'
                    fill='currentColor'
                  />
                ))}
              </div>
              <p className='text-text-900 text-lg italic leading-relaxed'>
                "{review.review}"
              </p>
              <h4 className='mt-4 font-semibold text-text-500 text-xl'>
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
