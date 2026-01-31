import React from "react";
import { cleanWikiHtml } from "../../../api/getArticle";

const CountryDetails = ({ country, wikiContent, wikiIntro }) => {
  if (!country) return null;

  return (
    <div className="mt-8">
      {/* 1. Country Name Heading */}
      <h2 className="text-4xl md:text-5xl font-extrabold text-bright-snow-50 mb-10 tracking-tight uppercase">
        {country.name.common}
        <span className="block h-1.5 w-24 bg-azure-blue-500 mt-4 rounded-full"></span>
      </h2>

      {/* 2. Three Column Layout: Intro | Flag | Emblem */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Intro Column */}
        <div className="lg:col-span-8 space-y-6">
          <div className="flex items-center gap-4 mb-2">
            <span className="h-px flex-1 bg-azure-blue-500/30"></span>
            <h3 className="text-lg font-bold text-azure-blue-400 uppercase tracking-[0.2em] whitespace-nowrap">
              Country Intro
            </h3>
            <span className="h-px flex-1 bg-azure-blue-500/30"></span>
          </div>

          <div className="text-bright-snow-200 leading-relaxed text-lg">
            <p className="border-l-4 border-azure-blue-600 pl-6 py-2 leading-[1.8] tracking-wider">
              {cleanWikiHtml(wikiIntro, 2) ||
                `Learn about the geography, culture, and history of ${country.name.common}.`}
            </p>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 border-t border-carbon-black-800">
            <div className="space-y-1">
              <p className="text-[10px] text-azure-blue-400 font-bold uppercase tracking-widest">
                Capital
              </p>
              <p className="text-bright-snow-100 font-semibold">
                {country.capital?.[0] || "N/A"}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] text-azure-blue-400 font-bold uppercase tracking-widest">
                Population
              </p>
              <p className="text-bright-snow-100 font-semibold">
                {country.population.toLocaleString()}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] text-azure-blue-400 font-bold uppercase tracking-widest">
                Region
              </p>
              <p className="text-bright-snow-100 font-semibold">
                {country.region}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] text-azure-blue-400 font-bold uppercase tracking-widest">
                Subregion
              </p>
              <p className="text-bright-snow-100 font-semibold">
                {country.subregion}
              </p>
            </div>
          </div>
        </div>

        {/* Flag Column */}
        <div className="lg:col-span-4">
          <div className="group relative overflow-hidden rounded-2xl aspect-4/3 flex items-center justify-center p-2 shadow-2xl">
            <img
              src={country.flags.svg}
              alt={`${country.name.common} flag`}
              className="w-full h-full object-cover rounded-xl transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-linear-to-t from-carbon-black-950/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-4">
              <span className="text-xs font-bold tracking-widest text-white uppercase">
                National Flag
              </span>
            </div>
          </div>
          <p className="mt-4 text-center text-[10px] text-carbon-black-400 font-bold uppercase tracking-[0.3em]">
            Flag
          </p>
        </div>
      </div>

      {/* 3. Detailed Wiki Sections (Cleaned) */}
      {wikiContent && (
        <div className="mt-20 space-y-16">
          {["Geography", "Economy", "Demographics", "Culture"].map(
            (sectionKey) => {
              const content = wikiContent[sectionKey];
              if (!content) return null;

              return (
                <div key={sectionKey} className="group">
                  <div className="flex items-center gap-6 mb-8">
                    <h3 className="text-3xl font-bold text-bright-snow-50 whitespace-nowrap">
                      {sectionKey}
                    </h3>
                    <div className="h-px flex-1 bg-carbon-black-800 group-hover:bg-azure-blue-500/30 transition-colors"></div>
                  </div>
                  <div
                    className="text-bright-snow-300 leading-relaxed text-lg max-w-4xl space-y-4 [&>p]:mb-6 [&>ul]:list-disc [&>ul]:ml-8 [&>ul]:space-y-2 [&>li]:pl-2"
                    dangerouslySetInnerHTML={{
                      __html: cleanWikiHtml(content, 2),
                    }}
                  />
                </div>
              );
            },
          )}
        </div>
      )}
    </div>
  );
};

export default CountryDetails;
