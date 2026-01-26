import React from "react";
import HeroSection from "../components/UI/HeroSection";
import HowItWorks from "../components/UI/HowItWorks";
import Monuments from "../components/UI/Monuments";
import FAQsSection from "../components/UI/FAQsSection";

function Home() {
  return (
    <div>
      <div className="flex flex-col gap-40">
        <HeroSection />
        <HowItWorks />
        <Monuments />
        <FAQsSection />
      </div>
    </div>
  );
}

export default Home;
