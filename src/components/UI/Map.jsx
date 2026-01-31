import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";

const Map = ({ setSelectedContinent, setSelectedCountry }) => {
  const svgRef = useRef();
  const containerRef = useRef();
  const [mapData, setMapData] = useState(null); // new state

  useEffect(() => {
    fetch("/mapData.json") // fetch from public folder
      .then((res) => res.json())
      .then((data) => setMapData(data))
      .catch((err) => console.error("Error loading mapData:", err));
  }, []);

  useEffect(() => {
    if (!mapData) return; // wait until data is loaded

    const continentColors = {
      Asia: "#f59e0b",
      Europe: "#3b82f6",
      Africa: "#22c55e",
      "North America": "#ef4444",
      "South America": "#a855f7",
      Oceania: "#14b8a6",
      Antarctica: "#64748b",
    };
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
        .attr("title", (d) => d.properties.name)
        .attr("stroke-width", 0.5)
        .on("mouseenter", function () {
          d3.select(this)
            .attr("stroke", "#fff")
            .attr("stroke-width", 1.5)
            .raise();
        })
        .on("mouseleave", function () {
          d3.select(this).attr("stroke", "#020e22").attr("stroke-width", 0.5);
        })
        .on("click", (_, d) => {
          setSelectedContinent && setSelectedContinent(d.properties.continent);
          setSelectedCountry && setSelectedCountry(d.properties.name);
        });
    };

    drawMap();
    window.addEventListener("resize", drawMap);
    return () => window.removeEventListener("resize", drawMap);
  }, [mapData, setSelectedContinent, setSelectedCountry]); // added mapData dep

  return (
    <div ref={containerRef} className="w-full max-w-5xl mx-auto relative group">
      <svg
        className="drop-shadow-[0_0_30px_rgba(11,100,244,0.1)]"
        ref={svgRef}
      ></svg>
    </div>
  );
};

export default Map;
