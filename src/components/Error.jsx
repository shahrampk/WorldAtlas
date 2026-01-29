import React from "react";

function Error({error}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-carbon-black-950 px-6">
      <div className="max-w-md p-8 bg-carbon-black-900 rounded-3xl border border-red-500/30 text-center">
        <div className="text-4xl mb-4">⚠️</div>
        <h2 className="text-2xl font-bold text-bright-snow-50 mb-4">Error</h2>
        <p className="text-bright-snow-300 mb-8">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-8 py-3 bg-azure-blue-600 text-bright-snow-50 rounded-xl font-bold hover:bg-azure-blue-500 transition-all"
        >
          Retry Connection
        </button>
      </div>
    </div>
  );
}

export default Error;
