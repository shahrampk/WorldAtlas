import React from "react";
import heroImage from "../assets/heroImage.jpg";

const HeroSection = () => {
  return (
    <section className="relative w-full h-screen min-h-[600px] flex items-center justify-center text-white">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="World Map Background"
          className="w-full h-full object-cover"
        />
        {/* Dark Gradient Overlay for readability */}
        <div className="absolute inset-0 bg-linear-to-b from-carbon-black-900/30 via-carbon-black-900/70 to-carbon-black-900 z-10"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-20 container mx-auto px-6 text-center">
        {/* Badge / Pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full bg-azure-blue-900/80 border border-azure-blue-500/30 backdrop-blur-md">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-azure-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-azure-blue-500"></span>
          </span>
          <span className="text-sm font-medium text-azure-blue-100 tracking-wide uppercase">
            Explore the World
          </span>
        </div>

        {/* Main Title */}
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 text-white drop-shadow-2xl">
          Discover the World
          <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-linear-to-r from-azure-blue-300 via-white to-azure-blue-300 text-6xl">
            One Place at a Time
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-carbon-black-100 max-w-3xl mx-auto mb-10 leading-relaxed tracking-wider font-light drop-shadow-md">
          Discover countries, continents, and fascinating global facts in a
          simple, interactive way. Perfect for students, curious minds, and
          digital explorers.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button className="px-8 py-3.5 rounded-xl bg-azure-blue-600 hover:bg-azure-blue-500 text-white font-semibold text-lg transition-all shadow-[0_0_20px_rgba(11,100,244,0.4)] hover:shadow-[0_0_30px_rgba(11,100,244,0.6)] active:scale-95 cursor-pointer border border-transparent">
            Explore Countries
          </button>
          <button className="px-8 py-3.5 rounded-xl bg-carbon-black-900/60 hover:bg-carbon-black-800/80 border border-carbon-black-400 backdrop-blur-sm text-white font-medium text-lg transition-all hover:border-white active:scale-95 cursor-pointer">
            Discover Continents
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce z-20">
        <svg
          className="w-6 h-6 text-white/70"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          ></path>
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
