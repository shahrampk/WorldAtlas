import { Map } from "lucide-react";
import React, { useState } from "react";

const ContinentDetail = ({ continentData }) => {
  const [activeContinent, setActiveContinent] = useState(
    Object.keys(continentData)[0] || "Asia",
  );
  const data = continentData[activeContinent];

  if (!data) return null;

  return (
    <div className="flex flex-col md:flex-row gap-8 min-h-[500px] bg-carbon-black-900/30 rounded-3xl border border-carbon-black-800 p-6 md:p-8">
      {/* Sidebar */}
      <div className="w-full md:w-64 flex md:flex-col gap-2 overflow-x-auto md:overflow-x-visible pb-4 md:pb-0 border-b md:border-b-0 md:border-r border-carbon-black-800 pr-0 md:pr-4">
        {Object.keys(continentData).map((name) => (
          <button
            key={name}
            onClick={() => setActiveContinent(name)}
            className={`px-6 py-3 rounded-xl cursor-pointer font-semibold transition-all text-left whitespace-nowrap md:whitespace-normal border ${
              activeContinent === name
                ? "bg-azure-blue-600 border-azure-blue-500 text-bright-snow-50 shadow-lg shadow-azure-blue-900/20"
                : "bg-carbon-black-800/50 border-carbon-black-700 text-bright-snow-300 hover:bg-carbon-black-700 hover:text-bright-snow-100"
            }`}
          >
            {name}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="flex-1 space-y-8">
        <div>
          <h3 className="text-3xl md:text-4xl font-bold text-bright-snow-50 mb-4 flex items-center gap-3">
            <Map size={35} strokeWidth={1.5} /> {activeContinent}
          </h3>
          <p className="text-bright-snow-200 text-lg leading-relaxed italic">
            {data.overview}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">
          <div className="space-y-6">
            <h4 className="text-sm uppercase tracking-wider text-azure-blue-400 font-bold border-b border-azure-blue-500/20 pb-2">
              Geographic Extremes
            </h4>
            <div className="space-y-4">
              {Object.entries(data.extremes).map(([key, value]) => (
                <div
                  key={key}
                  className="flex justify-between items-center bg-carbon-black-800/30 p-4 rounded-xl border border-carbon-black-800/50"
                >
                  <span className="font-medium text-bright-snow-100">
                    {key}
                  </span>
                  <span className="text-bright-snow-300">{value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="text-sm uppercase tracking-wider text-azure-blue-400 font-bold border-b border-azure-blue-500/20 pb-2">
              Region Details
            </h4>
            <div className="space-y-6">
              <div className="space-y-2">
                <span className="text-bright-snow-100 font-semibold block">
                  Countries in this Continent
                </span>
                <div className="flex flex-wrap gap-2">
                  {data.countries.slice(0, 15).map((country) => (
                    <span
                      key={country}
                      className="px-3 py-1 rounded-full bg-carbon-black-800 text-bright-snow-300 text-sm border border-carbon-black-700"
                    >
                      {country}
                    </span>
                  ))}
                  {data.countries.length > 15 && (
                    <span className="text-azure-blue-400 text-sm font-medium self-center">
                      + {data.countries.length - 15} more
                    </span>
                  )}
                </div>
              </div>
              <div className="p-4 bg-azure-blue-500/5 rounded-xl border border-azure-blue-500/10 italic text-azure-blue-300">
                Total population: {data.population.toLocaleString()} across{" "}
                {data.countries.length} countries.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContinentDetail;
