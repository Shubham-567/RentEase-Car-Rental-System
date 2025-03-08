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
        <div
          className='relative h-72 md:h-[22rem] w-full flex transition-transform duration-700 ease-in-out'
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Car Image ${index + 1}`}
              className='w-full h-full object-cover flex-shrink-0 rounded-2xl'
              aria-hidden={index !== currentIndex}
            />
          ))}
        </div>

        {/* Navigation Buttons */}
        <button
          className='absolute top-1/2 left-4 -translate-y-1/2 bg-background/60 shadow-md hover:bg-background/70 p-3 rounded-full transition-all duration-300 hover:scale-110 focus:outline-none'
          onClick={prevSlide}
          aria-label='Previous Slide'>
          <ChevronLeft className='w-6 h-6 text-text-800' />
        </button>

        <button
          className='absolute top-1/2 right-4 -translate-y-1/2 bg-background/60 shadow-md hover:bg-background/70 p-3 rounded-full transition-all duration-300 hover:scale-110 focus:outline-none'
          onClick={nextSlide}
          aria-label='Next Slide'>
          <ChevronRight className='w-6 h-6 text-text-800' />
        </button>
      </div>

      {/* Horizontal Thumbnails */}
      <div className='mt-4 min-h-18 flex justify-center gap-3 overflow-x-auto overflow-y-hidden scrollbar-hide px-2 items-center'>
        {images.map((img, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`relative rounded-lg overflow-hidden transition-all duration-300 focus:outline-none ${
              index === currentIndex && "scale-110 shadow-lg "
            }`}>
            <img
              src={img}
              alt={`Thumbnail ${index + 1}`}
              className='w-20 aspect-[16/9] object-cover rounded-md hover:opacity-80 transition-opacity'
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default CarImageCarousel;
