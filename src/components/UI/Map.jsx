import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";
import { mapData } from "../../data/mapData";

const Map = () => {
  const svgRef = useRef();
  const containerRef = useRef();
  const [selectedCountry, setSelectedCountry] = useState(null);

  // Continent → color mapping
  const continentColors = {
    Asia: "#f59e0b",
    Europe: "#3b82f6",
    Africa: "#22c55e",
    "North America": "#ef4444",
    "South America": "#a855f7",
    Oceania: "#14b8a6",
    Antarctica: "#64748b",
  };

  // number formatter
  const formatNumber = (num, type) => {
    if (!num) return "-";

    if (type === "population") {
      if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + " Million";
      if (num >= 1_000) return (num / 1_000).toFixed(1) + "K";
      return num;
    }

    if (type === "gdp") {
      if (num >= 1_000_000) return (num / 1_000_000).toFixed(2) + " Trillion";
      if (num >= 1_000) return (num / 1_000).toFixed(1) + " Billion";
      return num + " Million";
    }

    return num;
  };

  useEffect(() => {
    const svg = d3.select(svgRef.current);

    const drawMap = () => {
      const width = containerRef.current.clientWidth;
      const height = width * 0.6;

      svg.attr("width", width).attr("height", height);

      const projection = d3.geoMercator().fitSize([width, height], mapData);

      const path = d3.geoPath().projection(projection);

      svg.selectAll("path").remove();

      svg
        .selectAll("path")
        .data(mapData.features)
        .join("path")
        .attr("d", path)
        .attr("fill", (d) => {
          const continent = d.properties.continent || d.properties.region_un;
          return continentColors[continent] || "#94a3b8";
        })
        .attr("stroke", "#000")
        .attr("stroke-width", 0.5)
        .on("mouseenter", function () {
          d3.select(this).attr("stroke", "#fff");
        })
        .on("mouseleave", function () {
          d3.select(this).attr("stroke", "#000");
        })
        .on("click", (_, d) => {
          setSelectedCountry(d.properties);
        });
    };

    drawMap();
    window.addEventListener("resize", drawMap);
    return () => window.removeEventListener("resize", drawMap);
  }, []);

  return (
    <div ref={containerRef} className="w-full max-w-5xl mx-auto relative">
      <svg ref={svgRef}></svg>

      {selectedCountry && (
        <div className="absolute top-5 left-5 w-64 bg-slate-800 text-white p-4 rounded-xl shadow-xl border border-blue-500">
          <h3 className="font-bold text-lg mb-2">
            {selectedCountry.name?.common || selectedCountry.name}
          </h3>

          <p className="text-sm">
            <span className="text-blue-400 font-semibold">Region:</span>{" "}
            {selectedCountry.region_un}
          </p>

          <p className="text-sm">
            <span className="text-blue-400 font-semibold">Population:</span>{" "}
            {formatNumber(selectedCountry.pop_est, "population")}
          </p>

          <p className="text-sm">
            <span className="text-blue-400 font-semibold">GDP:</span>{" "}
            {formatNumber(selectedCountry.gdp_md, "gdp")}
          </p>

          <button
            className="mt-3 w-full bg-blue-500 hover:bg-blue-600 rounded-lg py-1 font-semibold cursor-pointer"
            onClick={() => setSelectedCountry(null)}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default Map;
