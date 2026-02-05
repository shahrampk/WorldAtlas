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
      <div className="relative max-w-6xl mx-auto flex w-full overflow-hidden py-10 px-5 group">
        <button
          onClick={prevSlide}
          className="absolute z-20 left-4 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 bg-carbon-black-900/40 hover:bg-azure-blue-600 backdrop-blur-md border border-white/10 rounded-full flex items-center justify-center cursor-pointer shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 md:opacity-0 group-hover:opacity-100"
        >
          <ChevronLeft className="text-white w-4 h-4 md:w-6 md:h-6" />
        </button>
        {slides.map((slide) => (
          <div
            key={slide.id}
            className="min-w-full transition-transform duration-700 ease-in-out px-4"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-10 rounded-3xl p-4 md:p-10 glass-card h-full">
              <div className="w-full md:w-80 h-50 md:h-80 shrink-0 relative overflow-hidden rounded-2xl ">
                <img
                  src={slide.imageUrl}
                  alt={slide.name}
                  className="object-cover w-full h-full transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-linear-to-t from-carbon-black-950/60 to-transparent"></div>
              </div>

              <div className="flex-1">
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-carbon-black-50 mb-4 md:mb-6 leading-tight tracking-tight">
                  {slide.name}
                </h3>
                <p className="text-sm md:text-lg leading-relaxed tracking-wide text-carbon-black-300 mb-8 max-w-xl">
                  {slide.description}
                </p>
              </div>
            </div>
          </div>
        ))}

        <div className="flex justify-center gap-3 absolute z-20 bottom-0 left-1/2 -translate-x-1/2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 transition-all duration-500 rounded-full cursor-pointer ${
                index === currentSlide
                  ? "w-8 bg-azure-blue-500"
                  : "w-2 bg-bright-snow-500/30 hover:bg-bright-snow-500/50"
              }`}
            />
          ))}
        </div>

        <button
          onClick={nextSlide}
          className="absolute z-20 right-4 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 bg-carbon-black-900/40 hover:bg-azure-blue-600 backdrop-blur-md border border-white/10 rounded-full flex items-center justify-center cursor-pointer shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 md:opacity-0 group-hover:opacity-100"
        >
          <ChevronRight className="text-white w-4 h-4 md:w-6 md:h-6" />
        </button>
      </div>
    </div>
  );
}

export default Slider;
