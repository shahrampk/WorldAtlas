import React from "react";
import HeroSection from "../components/UI/HeroSection";
import AboutSections from "../components/UI/AboutSections";
import HowItWorks from "../components/UI/HowItWorks";
import Monuments from "../components/UI/Monuments";

function Home() {
  return (
    <div>
      <div className="flex flex-col gap-40">
        <HeroSection />
        <HowItWorks />
        <Monuments />
      </div>
    </div>
  );
}

export default Home;
