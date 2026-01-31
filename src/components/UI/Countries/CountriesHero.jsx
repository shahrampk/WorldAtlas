import React from "react";
import { Heading } from "../../Component";
const CountriesHero = () => {
  return (
    <section className="pt-10 mb-12">
      <div className="max-w-7xl mx-auto px-6">
        <Heading title="World Nations" />
        <p className="text-center text-bright-snow-300 max-w-2xl mx-auto mb-10 -mt-8 font-light italic">
          Search to explore deep insights into any country.
        </p>
      </div>
    </section>
  );
};

export default CountriesHero;
