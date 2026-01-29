import { useState, useEffect } from "react";
import { NavLink } from "react-router";
import Logo from "../logo";

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
    { name: "Region", path: "/region" },
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
        <Logo />

        {/* Navigation Links (Desktop) */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg text-sm md:text-base 3xl:text-xl font-medium tracking-wider transition-all duration-300 ${
                  isActive
                    ? "text-azure-blue-400 bg-azure-blue-900/30"
                    : "text-carbon-black-200 hover:text-carbon-black-100 hover:bg-carbon-black-800/50"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
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
