import React, { useState, useEffect } from "react";
import { NavLink } from "react-router";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect for glassmorphism intensity
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Countries", path: "/country" },
    { name: "Continents", path: "/continent" },
    { name: "World Facts", path: "/worldfacts" },
    { name: "About", path: "/about" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b border-transparent ${
        isScrolled
          ? "bg-carbon-black-900/80 backdrop-blur-md border-carbon-black-800 py-3 shadow-lg"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo Section */}
        <NavLink to="/" className="flex items-center gap-2 group">
          {/* Custom SVG Logo */}
          <div className="w-10 h-10 relative flex items-center justify-center">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full text-azure-blue-500 transition-transform duration-500 group-hover:rotate-12"
            >
              <path
                d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                d="M2.5 12H21.5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M12 2C14.5013 4.73835 15.9228 8.29203 16 12C15.9228 15.708 14.5013 19.2616 12 22C9.49872 19.2616 8.07725 15.708 8 12C8.07725 8.29203 9.49872 4.73835 12 2Z"
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-azure-blue-500/20 blur-md rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>

          <span className="text-2xl font-bold tracking-tight text-white group-hover:text-azure-blue-300 transition-colors">
            WorldAtlas
          </span>
        </NavLink>

        {/* Navigation Links (Desktop) */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? "text-azure-blue-400 bg-azure-blue-900/30"
                    : "text-carbon-black-200 hover:text-white hover:bg-carbon-black-800/50"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}

          {/* GitHub / External Link Icon (Optional decorator) */}
          <div className="w-px h-6 bg-carbon-black-700 mx-2"></div>
          <button className="p-2 rounded-full text-carbon-black-300 hover:text-white hover:bg-carbon-black-800 transition-colors cursor-pointer">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </button>
        </nav>

        {/* Mobile Menu Button (Placeholder) */}
        <button className="lg:hidden p-2 text-white cursor-pointer">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Header;
