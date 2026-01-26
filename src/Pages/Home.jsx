import React from "react";
import {
  HeroSection,
  HowItWorks,
  Monuments,
  FAQsSection,
} from "../components/UI/HomePageUI/homePageUI";
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
