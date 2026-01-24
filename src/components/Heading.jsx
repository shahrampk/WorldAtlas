import React from "react";

function Heading({ title, subtitle }) {
  return (
    <div className="text-center">
      <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
        {title}
        <span className="block mt-2 leading-snug text-transparent bg-clip-text bg-linear-to-r from-azure-blue-400 to-azure-blue-200">
          {subtitle}
        </span>
      </h2>
    </div>
  );
}

export default Heading;
