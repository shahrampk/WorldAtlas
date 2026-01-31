import React, { useState } from "react";
import ContinentDetail from "./ContinentDetail";
import { Heading, Loader, Error } from "../../Component";
import Map from "../Map";
function CountinentData({ continentData, states }) {
  const [selectedContinent, setSelectedContinent] = useState(
    Object.keys(continentData)[0] || "Asia",
  );
  const [selectedCountry, setSelectedCountry] = useState("");
  return (
    <section className="flex flex-col gap-10">
      <Heading title="Continent Details" />
      <div>
        <div className="max-w-4xl mx-auto bg-carbon-black-900 rounded-3xl border-2 border-dashed border-carbon-black-700 p-4 md:p-8  hover:border-azure-blue-500/50 transition-colors">
          <Map
            setSelectedContinent={setSelectedContinent}
            setSelectedCountry={setSelectedCountry}
          />
        </div>
      </div>

      {/* 6. Tabs/Sidebar + Content Area */}
      <div id="regions-details">
        {states.loading ? (
          <Loader />
        ) : states.error ? (
          <Error />
        ) : (
          <ContinentDetail
            selectedContinent={selectedContinent}
            setSelectedContinent={setSelectedContinent}
            continentData={continentData}
            selectedCountry={selectedCountry}
            setSelectedCountry={setSelectedCountry}
          />
        )}
      </div>
    </section>
  );
}

export default CountinentData;
