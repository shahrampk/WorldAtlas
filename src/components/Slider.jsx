import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { slides } from "../data/Slider";
function Slider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div>
      {/* Slider Track */}
      <div className="relative max-w-6xl  mx-auto flex w-full overflow-hidden py-10 px-5">
        <button
          onClick={prevSlide}
          className="absolute z-50 left-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-carbon-black-800 hover:bg-azure-blue-600 border border-carbon-black-700 rounded-full flex items-center justify-center cursor-pointer shadow-lg transition-all duration-300 hover:scale-110 active:scale-95"
        >
          <ChevronLeft />
        </button>
        {slides.map((slide) => (
          <div
            key={slide.id}
            className="min-w-full transition-transform duration-700 ease-in-out rounded-3xl px-5 "
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            <div className="flex flex-col md:flex-row items-center gap-6 lg:gap-10 rounded-3xl p-3 md:px-10 md:py-5 bg-carbon-black-800 h-full">
              <div className="w-full md:w-80 h-80 p-5 bg-carbon-black-950 md:shadow-xl rounded-2xl">
                <img
                  src={slide.imageUrl}
                  alt={slide.name}
                  className="object-cover bg-center rounded-xl w-full h-full"
                />
              </div>
              <div className="flex-1 ">
                <h3 className="text-xl sm:text-xl lg:text-3xl font-bold text-bright-snow-50 mb-4 leading-tight">
                  {slide.name}
                </h3>

                <p className="3xl:text-lg leading-relaxed tracking-wider text-bright-snow-200 mb-6">
                  {slide.description}
                </p>
              </div>
            </div>
          </div>
        ))}
        <div className="flex justify-center gap-2 absolute z-50 bottom-3 right-1/2 translate-x-1/2">
          {slides.map((slide) => (
            <button
              key={slide.id}
              onClick={() => goToSlide(slide.id - 1)}
              className={`w-3 h-3 ${slide.id === currentSlide + 1 ? "bg-bright-snow-100 scale-120" : "bg-bright-snow-500 scale-95"} hover:bg-bright-snow-300 rounded-full flex items-center justify-center cursor-pointer shadow-lg transition-all duration-300`}
            >
              <span className="text-carbon-black-800"></span>
            </button>
          ))}
        </div>
        <button
          onClick={nextSlide}
          className="absolute z-50 right-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-carbon-black-800 hover:bg-azure-blue-600 border border-carbon-black-700 rounded-full flex items-center justify-center cursor-pointer shadow-lg transition-all duration-300 hover:scale-110 active:scale-95"
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
}

export default Slider;
