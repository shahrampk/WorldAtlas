import React, { useState, useRef } from "react";
import { useCountryIntelligence } from "../hooks/useCountryIntelligence";
import CountriesHero from "../components/UI/Countries/CountriesHero";
import CountriesSearch from "../components/UI/Countries/CountriesSearch";
import CountriesSelectionList from "../components/UI/Countries/CountriesSelectionList";
import CountryDetails from "../components/UI/Countries/CountryDetails";
import Loader from "../components/Loader";

function Countries() {
  const [searchTerm, setSearchTerm] = useState("");
  const detailsRef = useRef(null);

  // Everything logic-related is now managed by this custom hook
  const {
    countries,
    selectedCountry,
    wikiData,
    loadingWiki,
    handleCountrySelect,
  } = useCountryIntelligence(detailsRef);
  console.log(wikiData);
  // Filter countries for search display
  const filteredCountries = countries.filter((c) =>
    c.name.common.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="bg-carbon-black-950 text-bright-snow-50 py-20">
      {/* 1. Exploration Hero with Interactive Map */}
      <CountriesHero onCountrySelect={handleCountrySelect} />

      {/* 2. Intelligence Search Bar */}
      <CountriesSearch
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        count={filteredCountries.length}
      />

      {/* 3. Deep Insight Reveal Area (Scroll Target) */}
      <section
        ref={detailsRef}
        className="max-w-7xl mx-auto px-6 min-h-[400px]"
      >
        {selectedCountry ? (
          loadingWiki ? (
            <div className="flex flex-col items-center justify-center py-40">
              <Loader />
              <p className="mt-8 text-azure-blue-400 font-medium tracking-[0.3em] uppercase animate-pulse">
                Retrieving Nation Intelligence
              </p>
            </div>
          ) : (
            <div className="animate-in fade-in slide-in-from-bottom-10 duration-700">
              <CountryDetails
                country={selectedCountry}
                wikiContent={wikiData.content}
                wikiIntro={wikiData.intro}
              />
            </div>
          )
        ) : (
          <div className="flex flex-col items-center justify-center py-32 border-2 border-dashed border-carbon-black-800 rounded-3xl opacity-40 grayscale">
            <div className="text-8xl mb-6">🌍</div>
            <p className="text-2xl font-light tracking-wide">
              Select a nation to begin exploration
            </p>
          </div>
        )}
      </section>

      {/* 4. Overlay Quick Selection (Active when searching) */}
      {searchTerm && (
        <CountriesSelectionList
          countries={filteredCountries}
          onCountrySelect={handleCountrySelect}
          setSearchTerm={setSearchTerm}
        />
      )}
    </div>
  );
}

export default Countries;
