import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";
import { mapData } from "../../data/mapData";

const Map = ({ onCountrySelect }) => {
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
          return continentColors[continent] || "#1e293b";
        })
        .attr("stroke", "#020e22")
        .attr("stroke-width", 0.5)
        .on("mouseenter", function () {
          d3.select(this)
            .attr("stroke", "#3c83f6")
            .attr("stroke-width", 1.5)
            .raise(); // Bring to front
        })
        .on("mouseleave", function () {
          d3.select(this).attr("stroke", "#020e22").attr("stroke-width", 0.5);
        })
        .on("click", (_, d) => {
          setSelectedCountry(d.properties);
          // Also notify parent if needed
          if (onCountrySelect) {
            onCountrySelect(d.properties);
          }
        });
    };

    drawMap();
    window.addEventListener("resize", drawMap);
    return () => window.removeEventListener("resize", drawMap);
  }, [onCountrySelect]); // Added onCountrySelect to deps

  return (
    <div ref={containerRef} className="w-full max-w-5xl mx-auto relative group">
      <svg
        ref={svgRef}
        className="drop-shadow-[0_0_30px_rgba(11,100,244,0.1)]"
      ></svg>

      {/* Subtle indicator that map is interactive */}
      <div className="absolute top-4 right-4 text-[10px] font-bold text-azure-blue-400 uppercase tracking-widest opacity-40 group-hover:opacity-100 transition-opacity">
        Interactive Selection Mode
      </div>
    </div>
  );
};

export default Map;
