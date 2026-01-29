import React from "react";

function Loader() {
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

export default Loader;
