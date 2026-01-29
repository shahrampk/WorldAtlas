import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import { getCountries } from "../api/api";
import {
  ContinentHero,
  StatTable,
  ContinentDetail,
  FunFact,
} from "../components/UI/ContinentPageUI/continentPageUI";
import { continentExtremes } from "../data/ContinentData";
import Map from "../components/UI/Map";
import Heading from "../components/Heading";

const Continent = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState([]);
  const [continentData, setContinentData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const countries = await getCountries();
        console.log(countries);
        // Aggregate data by continent
        const aggregated = countries.reduce((acc, country) => {
          const continent = country.continents?.[0] || "Other";
          if (!acc[continent]) {
            acc[continent] = {
              name: continent,
              population: 0,
              area: 0,
              languages: [],
              countries: [],
            };
          }
          acc[continent].population += country.population || 0;
          acc[continent].area += country.area || 0;
          acc[continent].countries.push(country.name.common);
          acc[continent].languages.push(country.languages);
          return acc;
        }, {});
        // Format for StatTable
        const statArray = Object.values(aggregated)
          .map((c) => ({
            ...c,
            density: c.area > 0 ? c.population / c.area : 0,
          }))
          .sort((a, b) => b.population - a.population);
        console.log(statArray);
        // Format for ContinentDetail
        const detailObj = Object.values(aggregated).reduce((acc, c) => {
          acc[c.name] = {
            overview: `A major landmass consisting of ${c.countries.length} nations with a combined population of approx. ${(
              c.population / 1000000000
            ).toFixed(2)} billion.`,
            extremes: continentExtremes[c.name] || {
              "Highest Point": "Data not available",
              "Longest River": "Data not available",
            },
            countries: c.countries.sort(),
            population: c.population,
          };
          return acc;
        }, {});
        setStats(statArray);
        setContinentData(detailObj);
      } catch (err) {
        setError("Failed to fetch world data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-carbon-black-950">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-azure-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-bright-snow-300 font-medium">
            Loading World Data...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-carbon-black-950 px-6">
        <div className="max-w-md p-8 bg-carbon-black-900 rounded-3xl border border-red-500/30 text-center">
          <div className="text-4xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-bright-snow-50 mb-4">Error</h2>
          <p className="text-bright-snow-300 mb-8">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-8 py-3 bg-azure-blue-600 text-bright-snow-50 rounded-xl font-bold hover:bg-azure-blue-500 transition-all"
          >
            Retry Connection
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <ContinentHero />

      <div className="max-w-6xl mx-auto px-6 py-12 md:py-20 space-y-24">
        {/* 3. Section Heading + 4. Table for static data */}
        <section>
          <Heading title="Global Status" />
          <div className="text-bright-snow-200 3xl:text-lg leading-relaxed tracking-wide space-y-6">
            <p className="text-center text-bright-snow-300 max-w-2xl mx-auto mb-10">
              Live data from around the globe. These statistics are aggregated
              from 250+ countries and territories across seven major regions.
            </p>
            <StatTable data={stats} />
          </div>
        </section>

        {/* 5. Interactive Map */}
        <section>
          <Heading title="Intrative Map" />
          <div className="w-full bg-carbon-black-900 rounded-3xl border-2 border-dashed border-carbon-black-700 p-8  hover:border-azure-blue-500/50 transition-colors">
            <Map />
          </div>
        </section>

        {/* 6. Tabs/Sidebar + Content Area */}
        <section>
          <Heading title="Detailed Exploration" />
          <ContinentDetail continentData={continentData} />
        </section>

        {/* Extra: Fun Facts & Navigation */}
        <section>
          <Heading title="🌟 Global Trivia" />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FunFact
              icon="❄️"
              title="Antarctica"
              fact="Antarctica holds about 90% of the world's freshwater ice."
            />
            <FunFact
              icon="🌍"
              title="Africa"
              fact="The only continent to extend from the northern to southern temperate zones."
            />
            <FunFact
              icon="🌏"
              title="Asia"
              fact="Shares borders with Europe and Africa; home to the highest and lowest points on Earth."
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default Continent;
