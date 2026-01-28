import React from "react";

const ContentBlock = ({ title, children, className = "" }) => (
  <div className={`mb-16 md:mb-24 last:mb-0 ${className}`}>
    {title && (
      <h2 className="text-xl md:text-3xl font-bold mb-8 flex items-center gap-4 text-bright-snow-100">
        {title}
      </h2>
    )}
    <div className="text-bright-snow-200 3xl:text-lg leading-relaxed tracking-wide space-y-6">
      {children}
    </div>
  </div>
);

export default ContentBlock;
