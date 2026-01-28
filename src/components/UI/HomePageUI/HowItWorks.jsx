import React from "react";
import { steps } from "../../../data/HowItWorks";
import Heading from "./Heading";

const HowItWorks = () => {
  return (
    <section id="how-it-works">
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
                  <img
                    src={step.image}
                    alt="image"
                    className="w-100 brightness-80"
                  />
                </div>
                <div
                  className={`flex flex-col gap-6 ${isEven ? "col-start-1 row-start-1" : ""}`}
                >
                  <p className="text-7xl md:text-9xl font-black tracking-tighter text-transparent bg-clip-text bg-linear-to-b from-white/10 to-transparent select-none">
                    {step.number}
                  </p>
                  <div className="relative -mt-10 md:-mt-16 z-10 pl-4 md:pl-8">
                    <h3 className="text-3xl 3xl:text-5xl font-bold text-bright-snow-100 mb-4 tracking-tight">
                      {step.title}
                    </h3>
                    <p className="text-bright-snow-300 tracking-wide leading-relaxed 3xl:text-lg">
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
