import React, { useState, useEffect } from "react";
import { getCountries } from "../api/api";
import {
  ContinentHero,
  StatTable,
  FunFact,
  CountinentData,
} from "../components/UI/ContinentPageUI/continentPageUI";
import { continentExtremes } from "../data/ContinentData";
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
      } catch (error) {
        setError("Failed to fetch world data. Please try again later.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <ContinentHero />

      <div className="max-w-6xl mx-auto px-6 py-12 md:py-20 flex flex-col gap-20 md:gap-40">
        {/* 3. Section Heading + 4. Table for static data */}
        <section>
          <Heading title="Global Status" />
          <div className="text-bright-snow-200 3xl:text-lg leading-relaxed tracking-wide space-y-6">
            <p className="text-center text-bright-snow-300 max-w-2xl mx-auto mb-10">
              Live data from around the globe. These statistics are aggregated
              from 250+ countries and territories across seven major regions.
            </p>
            <StatTable data={stats} states={{ loading, error }} />
          </div>
        </section>
        {/* World Map + Contient Details */}
        <CountinentData
          continentData={continentData}
          states={{ loading, error }}
        />

        {/* Extra: Fun Facts & Navigation */}
        <section>
          <Heading title="Global Facts" />
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
