import React from "react";

const FunFact = ({ icon, title, fact }) => (
  <div className="p-6 rounded-xl border border-carbon-black-800 bg-carbon-black-900/30 flex gap-6 items-start">
    <div className="text-4xl">{icon}</div>
    <div>
      <h4 className="text-bright-snow-100 font-bold mb-2">{title}</h4>
      <p className="text-bright-snow-300 leading-relaxed italic">“{fact}”</p>
    </div>
  </div>
);

export default FunFact;
