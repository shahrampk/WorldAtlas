import React from "react";

const CountriesSelectionList = ({
  countries,
  onCountrySelect,
  setSearchTerm,
}) => {
  if (!countries || countries.length === 0) return null;
  return (
    <div className="fixed bottom-10 left-1/2 -translate-x-1/2 w-full max-w-2xl px-6 z-50">
      <div className="bg-carbon-black-900/90 backdrop-blur-xl border border-carbon-black-700 rounded-2xl p-2 shadow-[0_20px_50px_rgba(0,0,0,0.5)] max-h-[300px] overflow-y-auto custom-scrollbar">
        {countries.slice().map((c) => (
          <button
            key={c.name.common}
            onClick={() => {
              onCountrySelect(c);
              setSearchTerm("");
            }}
            className="w-full text-left px-5 py-3 hover:bg-azure-blue-600 rounded-xl transition-colors flex items-center gap-4 group"
          >
            <img
              src={c.flags.png}
              alt={c.name.common}
              className="w-12 h-auto object-contain"
            />
            <span className="font-medium group-hover:text-white transition-colors">
              {c.name.common}
            </span>
            <span className="ml-auto text-xs text-carbon-black-500 group-hover:text-azure-blue-100">
              {c.region}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CountriesSelectionList;
