import { useState, useEffect } from "react";
import { NavLink } from "react-router";
import Logo from "../Logo";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Handle scroll effect for glassmorphism intensity
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu when resizing to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Countries", path: "/country" },
    { name: "Region", path: "/region" },
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

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden p-2 text-white cursor-pointer z-50"
          aria-label="Toggle Menu"
        >
          <svg
            className="w-6 h-6 transition-transform duration-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        {/* Mobile Navigation Overlay */}
        <div
          className={`fixed inset-0 bg-carbon-black-950/60 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
            isMenuOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
          onClick={() => setIsMenuOpen(false)}
        />

        <nav
          className={`fixed top-0 right-0 h-screen w-72 bg-carbon-black-900 border-l border-carbon-black-800 shadow-2xl transition-transform duration-300 transform lg:hidden ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex flex-col pt-24 px-8 gap-4">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  `px-6 py-4 rounded-xl text-lg font-medium tracking-wider transition-all duration-300 ${
                    isActive
                      ? "text-azure-blue-400 bg-azure-blue-900/30 border-l-4 border-azure-blue-400"
                      : "text-carbon-black-200 hover:text-carbon-black-100 hover:bg-carbon-black-800/50"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
