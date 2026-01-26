import React from "react";

const AboutSections = () => {
  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-4 text-center border border-carbon-black-100 rounded-2xl py-10 bg-carbon-black-900 -translate-y-30 relative z-30">
      <h1 className="text-4xl font-bold mb-6">About WorldAtlas</h1>
      <p className="text-lg text-carbon-black-100 max-w-3xl mx-auto leading-relaxed tracking-wider font-light drop-shadow-md">
        WorldAtlas is your go to place to explore the world in a simple and
        interactive way. From countries and continents to interesting global
        facts, everything is organized clearly so you can learn quickly. Perfect
        for students, curious minds, and anyone who wants to understand the
        world better, WorldAtlas turns complex data into easy to read insights
        with maps, visuals, and fun facts.
      </p>
    </div>
  );
};

export default AboutSections;
