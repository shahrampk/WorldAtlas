import React, { useEffect, useState, useRef } from "react";
import { getCountries } from "../api/api";
import {
  getArticleDetails,
  getArticleSummary,
  getSectionContent,
} from "../api/getArticle";
import Map from "../components/UI/Map";
import CountryDetails from "../components/Countries/CountryDetails";
import Heading from "../components/Heading";
import Loader from "../components/Loader";

function Countries() {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [wikiData, setWikiData] = useState({ intro: "", content: null });
  const [loading, setLoading] = useState(false);
  const [loadingWiki, setLoadingWiki] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const detailsRef = useRef(null);

  // Load Countries on Mount
  useEffect(() => {
    const fetchCountries = async () => {
      setLoading(true);
      try {
        const data = await getCountries();
        setCountries(data);
      } catch (error) {
        console.error("Failed to load countries");
      }
      setLoading(false);
    };
    fetchCountries();
  }, []);

  const handleCountrySelect = async (country) => {
    // If we only have map properties, find the full country data
    let fullCountry = country;
    if (country.name && !country.flags) {
      const mapName = (country.name.common || country.name || "").toLowerCase();
      const mapNameLong = (country.name_long || "").toLowerCase();
      const mapISO = (
        country.iso_a3 ||
        country.adm0_a3 ||
        country.sov_a3 ||
        ""
      ).toUpperCase();

      fullCountry = countries.find(
        (c) =>
          c.cca3 === mapISO ||
          c.name.common.toLowerCase() === mapName ||
          c.name.official.toLowerCase() === mapName ||
          c.name.common.toLowerCase() === mapNameLong ||
          c.name.official.toLowerCase() === mapNameLong,
      );

      if (!fullCountry) {
        console.warn("Could not find full country data for", country.name);
        return;
      }
    }

    setSelectedCountry(fullCountry);
    setLoadingWiki(true);
    setWikiData({ intro: "", content: null });

    // Scroll to details section
    setTimeout(() => {
      detailsRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);

    try {
      const countryName = fullCountry.name.common;

      // Fetch Wiki Intro and Details in parallel
      const [summary, details] = await Promise.all([
        getArticleSummary(countryName),
        getArticleDetails(countryName),
      ]);

      let parsedSections = {};
      if (details && details.sections) {
        const sectionsOfInterest = [
          "Geography",
          "Economy",
          "Demographics",
          "Culture",
          "History",
        ];

        const promises = sectionsOfInterest.map(async (key) => {
          const section = details.sections.find((s) =>
            s.line.toLowerCase().includes(key.toLowerCase()),
          );
          if (section) {
            const html = await getSectionContent(countryName, section.index);
            return { key, html };
          }
          return null;
        });

        const results = await Promise.all(promises);
        results.forEach((res) => {
          if (res) parsedSections[res.key] = res.html;
        });
      }

      setWikiData({
        intro: summary,
        content: parsedSections,
      });
    } catch (error) {
      console.error("Error fetching wiki data:", error);
    }
    setLoadingWiki(false);
  };

  // Filter countries
  const filteredCountries = countries.filter((c) =>
    c.name.common.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-carbon-black-950 text-bright-snow-50 pb-20">
      {/* 1. Header Section */}
      <section className="pt-10 mb-12">
        <div className="max-w-7xl mx-auto px-6">
          <Heading title="World Nations" />
          <p className="text-center text-bright-snow-300 max-w-2xl mx-auto mb-10 -mt-8 font-light italic">
            Click on the map or search to explore deep insights into any
            country.
          </p>
        </div>

        {/* Map Container */}
        <div className="max-w-6xl mx-auto px-6">
          <div className="w-full bg-carbon-black-900 rounded-[3rem] border-2 border-dashed border-carbon-black-800 p-8 hover:border-azure-blue-500/50 transition-all duration-700 shadow-2xl">
            <Map onCountrySelect={handleCountrySelect} />
          </div>
        </div>
      </section>

      {/* 2. Controls Section (Search Bar Below Map) */}
      <section className="max-w-4xl mx-auto px-6 mb-16">
        <div className="relative group">
          <div className="absolute -inset-1 bg-linear-to-r from-azure-blue-600 to-azure-blue-400 rounded-2xl blur opacity-20 group-focus-within:opacity-40 transition duration-1000"></div>
          <input
            type="text"
            placeholder="Search Nation..."
            className="relative w-full bg-carbon-black-900 border-2 border-carbon-black-800 rounded-2xl px-8 py-5 text-xl text-bright-snow-50 focus:outline-none focus:border-azure-blue-500 transition-all shadow-inner"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="absolute right-6 top-1/2 -translate-y-1/2 flex items-center gap-2">
            <span className="text-xs text-carbon-black-500 font-bold uppercase tracking-widest">
              {filteredCountries.length} Found
            </span>
          </div>
        </div>
      </section>

      {/* 3. Main Detail Area */}
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

      {/* 4. Quick Selection List (Hidden overflow) */}
      {searchTerm && filteredCountries.length > 0 && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 w-full max-w-2xl px-6 z-50">
          <div className="bg-carbon-black-900/90 backdrop-blur-xl border border-carbon-black-700 rounded-2xl p-2 shadow-[0_20px_50px_rgba(0,0,0,0.5)] max-h-[300px] overflow-y-auto custom-scrollbar">
            {filteredCountries.slice(0, 10).map((c) => (
              <button
                key={c.cca3}
                onClick={() => {
                  handleCountrySelect(c);
                  setSearchTerm("");
                }}
                className="w-full text-left px-5 py-3 hover:bg-azure-blue-600 rounded-xl transition-colors flex items-center gap-4 group"
              >
                <span className="text-2xl">{c.flag}</span>
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
      )}
    </div>
  );
}

export default Countries;
