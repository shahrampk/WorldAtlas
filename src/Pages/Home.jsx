import React from "react";
import HeroSection from "../components/UI/HeroSection";
import AboutSections from "../components/UI/AboutSections";
import HowItWorks from "../components/UI/HowItWorks";

function Home() {
  return (
    <div>
      <HeroSection />
      <HowItWorks />
      {/* <AboutSections /> */}
    </div>
  );
}

export default Home;
