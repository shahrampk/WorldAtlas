import React from "react";

function Heading({ title }) {
  return (
    <div className="text-center mb-12">
      <h2 className="text-2xl md:text-3xl font-bold text-bright-snow-50">
        {title}
      </h2>
      <div className="h-1 w-20 bg-azure-blue-500 mx-auto mt-4 rounded-full"></div>
    </div>
  );
}

export default Heading;
