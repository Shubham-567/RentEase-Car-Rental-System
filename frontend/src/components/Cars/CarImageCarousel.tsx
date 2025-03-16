import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CarImageCarouselProps {
  images: string[];
}

const CarImageCarousel: React.FC<CarImageCarouselProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className='relative w-full max-w-4xl mx-auto'>
      {/* Main Image Container */}
      <div className='relative overflow-hidden rounded-2xl shadow-xl'>
        <img
          src={images[currentIndex]}
          alt={`Car Image ${currentIndex + 1}`}
          className='w-full h-56 md:h-[22rem] object-cover rounded-2xl transition-opacity duration-500 ease-in-out'
        />

        {/* Navigation Buttons */}
        <button
          className='absolute top-1/2 left-3 md:left-4 -translate-y-1/2 bg-black/60 shadow-md p-3 rounded-full transition-all duration-300 hover:scale-110 focus:outline-none'
          onClick={prevSlide}
          aria-label='Previous Slide'>
          <ChevronLeft className='w-6 h-6 text-primary-500' />
        </button>

        <button
          className='absolute top-1/2 right-3 md:right-4 -translate-y-1/2 bg-black/60 shadow-md p-3 rounded-full transition-all duration-300 hover:scale-110 focus:outline-none'
          onClick={nextSlide}
          aria-label='Next Slide'>
          <ChevronRight className='w-6 h-6 text-primary-500' />
        </button>
      </div>

      {/* Thumbnail Navigation */}
      <div className='mt-4 flex justify-center gap-2 md:gap-3 overflow-x-auto scrollbar-hide min-h-20 px-2 items-center'>
        {images.map((img, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`relative rounded-lg overflow-hidden transition-all duration-300 outline-none ${
              index === currentIndex &&
              "ring-2 ring-primary-500 scale-110 shadow-lg"
            }`}>
            <img
              src={img}
              alt={`Thumbnail ${index + 1}`}
              className='w-16 md:w-20 aspect-[16/9] object-cover rounded-md hover:opacity-80 transition-opacity'
            />

            {index !== currentIndex && (
              <div className='absolute inset-0 bg-black/40 dark:bg-black/60 rounded-md'></div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CarImageCarousel;
