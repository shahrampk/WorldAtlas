import React from "react";

const ContinentHero = () => {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden border-b border-carbon-black-800">
      <div className="max-w-6xl 3xl:max-w-6xl mx-auto px-6 relative z-10 text-left">
        <h1 className="text-3xl md:text-5xl 3xl:text-7xl font-bold tracking-tight mb-10 leading-tight">
          <span className="text-azure-blue-500 italic">
            
            Explore the World by Regions
          </span>
        </h1>
        <div className="flex flex-col gap-8">
          <div className="space-y-4">
            <h2 className="text-xl md:text-2xl font-semibold text-bright-snow-100 flex items-center gap-2">
              <span>🌍</span> What is a Region?
            </h2>
            <p className="text-bright-snow-200 2xl:text-lg leading-relaxed tracking-wide">
              A continent is a large, continuous area of land on Earth that is
              typically made up of multiple countries. Each continent has its
              own geography, climate, culture, and population. Continents are
              the biggest landmasses on the planet, separated by oceans or
              distinct geographic features.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl md:text-2xl font-semibold text-bright-snow-100 flex items-center gap-2">
              <span>🌋</span> Geologic History (Pangea)
            </h2>
            <p className="text-bright-snow-200 2xl:text-lg leading-relaxed tracking-wide">
              Millions of years ago, Earth did not look like it does today. All
              the continents were joined together in a single supercontinent
              called <strong className="text-azure-blue-400">Pangea</strong>.
              Over millions of years, tectonic plates moved, causing Pangea to
              break apart and drift, eventually forming the seven continents we
              know today.
            </p>
          </div>
        </div>
      </div>

      {/* Subtle decorative background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full z-0 pointer-events-none opacity-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-200 h-200 bg-azure-blue-600 rounded-full blur-[150px]"></div>
      </div>
    </section>
  );
};

export default ContinentHero;
