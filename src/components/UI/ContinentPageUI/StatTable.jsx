import React from "react";
import Loader from "../../Loader";
import Error from "../../Error";

const StatTable = ({ data, states }) => {
  console.log(states);
  if (!data || data.length === 0) return null;

  return (
    <div className="overflow-x-auto rounded-xl border border-carbon-black-800 bg-carbon-black-900/50">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-carbon-black-800 bg-carbon-black-800/50">
            <th className="px-6 py-4 font-semibold text-bright-snow-100 whitespace-nowrap">
              Rank
            </th>
            <th className="px-6 py-4 font-semibold text-bright-snow-100 whitespace-nowrap">
              Continent
            </th>
            <th className="px-6 py-4 font-semibold text-bright-snow-100 text-right whitespace-nowrap">
              Area (km²)
            </th>
            <th className="px-6 py-4 font-semibold text-bright-snow-100 text-right whitespace-nowrap">
              Population (Approx)
            </th>
            <th className="px-6 py-4 font-semibold text-bright-snow-100 text-right whitespace-nowrap">
              Density (pop/km²)
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-carbon-black-800">
          {states.loading ? (
            <Loader />
          ) : states.error ? (
            <Error error={states.error} />
          ) : (
            data.map((c, i) => (
              <tr
                key={c.name}
                className="hover:bg-carbon-black-800/30 transition-colors"
              >
                <td className="px-6 py-4 text-bright-snow-300">{i + 1}</td>
                <td className="px-6 py-4 font-medium text-azure-blue-400">
                  {c.name}
                </td>
                <td className="px-6 py-4 text-bright-snow-300 text-right">
                  {c.area.toLocaleString()}
                </td>
                <td className="px-6 py-4 text-bright-snow-300 text-right">
                  {c.population.toLocaleString()}
                </td>
                <td className="px-6 py-4 text-bright-snow-300 text-right">
                  {c.density.toFixed(1)}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default StatTable;
