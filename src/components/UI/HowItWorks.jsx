import React from "react";
import Heading from "../Heading";
import { steps } from "../../data/HowItWorks";

const HowItWorks = () => {
  return (
    <section>
      <div className="max-w-6xl 3xl:max-w-[1400px] mx-auto px-6 flex flex-col gap-7 md:gap-28">
        <Heading title="How to Get Information" subtitle="From WorldAtlas" />
        <div className="flex flex-col gap-20">
          {steps.map((step, index) => {
            const isEven = index % 2 === 0;
            return (
              <div
                key={index}
                className={`flex flex-col md:grid grid-cols-2 gap-x-10 justify-between items-center`}
              >
                <div
                  className={`flex justify-center ${isEven ? "md:col-start-2" : ""}`}
                >
                  <img src={step.image} alt="image" className="w-100" />
                </div>
                <div
                  className={`flex flex-col gap-6 ${isEven ? "col-start-1 row-start-1" : ""}`}
                >
                  <p className="text-6xl md:text-9xl text-carbon-black-600 font-bold tracking-wide">
                    {step.number}
                  </p>
                  <div>
                    <h3 className="text-3xl 3xl:text-4xl font-bold text-carbon-black-100 mb-4">
                      {step.title}
                    </h3>
                    <p className="text-carbon-black-200 tracking-wide leading-relaxed md:text-lg 3xl:text-xl">
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
