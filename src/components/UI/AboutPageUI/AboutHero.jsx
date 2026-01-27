import React from "react";

const AboutHero = () => {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden border-b border-carbon-black-800">
      <div className="max-w-4xl 3xl:max-w-300 mx-auto px-6 relative z-10 text-center">
        <h1 className="text-3xl md:text-5xl 3xl:text-7xl font-bold tracking-tight mb-10 text-bright-snow-50 leading-tight">
          WorldAtlas: Mapping Knowledge <br />
          <span className="text-azure-blue-500 italic">
            {" "}
            for the Curious Mind
          </span>
        </h1>
        <div className="flex flex-col gap-6">
          <p className="text-bright-snow-100 2xl:text-lg leading-relaxed tracking-wide">
            Understanding the world goes far beyond memorizing borders and
            capital cities. It’s about discovering how continents formed, how
            countries function, and how humanity and nature shape our planet
            together.
          </p>
          <p className="text-bright-snow-200 2xl:text-lg leading-relaxed tracking-wide">
            <span className="text-azure-blue-400 font-semibold ">
              WorldAtlas
            </span>{" "}
            is built to make this exploration simple, structured, and
            meaningful. Designed with clarity and curiosity in mind, WorldAtlas
            organizes global knowledge into well-defined sections that allow
            users to navigate the world effortlessly.
          </p>
        </div>
      </div>

      {/* Subtle decorative background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full z-0 pointer-events-none opacity-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-200 h-200 bg-azure-blue-600 rounded-full blur-[150px]"></div>
      </div>
    </section>
  );
};

export default AboutHero;
