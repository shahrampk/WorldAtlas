import React from "react";
import step1 from "../../assets/steps/step-1.png";
import step2 from "../../assets/steps/step-2.png";
import step3 from "../../assets/steps/step-3.png";
import step4 from "../../assets/steps/step-4.png";
import step5 from "../../assets/steps/step-5.png";
const steps = [
  {
    number: "01",
    title: "Start your journey",
    description:
      "Start your journey from the Home page. Here, you’ll get a quick overview of what WorldAtlas offers, along with interesting world facts and questions that help you understand the scope of the website.",
    image: step1,
  },
  {
    number: "02",
    title: "Decide what to Learn",
    description:
      "From the Home page, choose your path: Visit Continents to understand the world region by region, Open Countries to learn about a specific nation, or Explore World Facts to discover global insights.",
    image: step2,
  },
  {
    number: "03",
    title: "Explore Connected Information",
    description:
      "As you explore, WorldAtlas connects information for you. From a continent, you can move directly to its countries. From a country, you can explore related facts and its continent.",
    image: step3,
  },
  {
    number: "04",
    title: "Expand Your Understanding",
    description:
      "Use the World Facts section to go beyond individual locations. Here, you’ll discover interesting facts, famous monuments, and global comparisons that add deeper context to countries and continents.",
    image: step4,
  },
  {
    number: "05",
    title: "Learn the Purpose",
    description:
      "If you want to understand why WorldAtlas exists, visit the About page. It explains the mission, vision, and how the website organizes information to support meaningful learning.",
    image: step5,
  },
];

const HowItWorks = () => {
  return (
    <section className="py-24 bg-carbon-black-900 border-carbon-black-800">
      <div className="max-w-6xl mx-auto px-6 flex flex-col gap-7 md:gap-28">
        <div className="text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            How to Get Information
            <span className="block mt-2 text-transparent bg-clip-text bg-linear-to-r from-azure-blue-400 to-azure-blue-200">
              From WorldAtlas
            </span>
          </h2>
        </div>
        <div className="flex flex-col gap-20">
          {steps.map((step, index) => {
            const isEven = index % 2 === 0;
            return (
              <div
                key={index}
                className={`flex flex-col gap-10 md:grid grid-cols-2 gap-x-10 justify-between items-center`}
              >
                <div
                  className={`flex justify-center ${isEven ? "md:col-start-2" : ""}`}
                >
                  <img src={step.image} alt="image" className="h-96" />
                </div>
                <div
                  className={`flex flex-col gap-3 ${isEven ? "col-start-1 row-start-1" : ""}`}
                >
                  <div className="text-left">
                    <p className="text-6xl md:text-9xl text-carbon-black-400 font-bold tracking-wide">
                      {step.number}
                    </p>
                  </div>
                  <div className="text-left">
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {step.title}
                    </h3>
                    <p className="text-carbon-black-300 text-md">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
