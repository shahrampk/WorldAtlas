import React from "react";

const CountriesSearch = ({ searchTerm, onSearchChange, count }) => {
  return (
    <section className="max-w-4xl mx-auto px-6 mb-16">
      <div className="relative group">
        <div className="absolute -inset-1 bg-linear-to-r from-azure-blue-600 to-azure-blue-400 rounded-2xl blur opacity-20 group-focus-within:opacity-40 transition duration-1000"></div>
        <input
          type="text"
          placeholder="Search Nation..."
          className="relative w-full bg-carbon-black-900 border-2 border-carbon-black-800 rounded-2xl px-8 py-5 text-xl text-bright-snow-50 focus:outline-none focus:border-azure-blue-500 transition-all shadow-inner"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        <div className="absolute right-6 top-1/2 -translate-y-1/2 flex items-center gap-2">
          <span className="text-xs text-carbon-black-500 font-bold uppercase tracking-widest">
            {count} Found
          </span>
        </div>
      </div>
    </section>
  );
};

export default CountriesSearch;
