import React from 'react'
import { NavLink } from 'react-router';

function Logo() {
  return (
    <NavLink to="/" className="flex items-end text-lg md:text-2xl">
      <p className="">🌐</p>
      <p className=" font-bold tracking-tight text-bright-snow-50">
        WorldAtlas
      </p>
    </NavLink>
  );
}

export default Logo