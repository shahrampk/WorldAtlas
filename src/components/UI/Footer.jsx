import React from "react";
import Logo from "../logo";
import { Link } from "react-router-dom";
import {
  MapPin,
  Mail,
  Phone,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";

function FooterLinkGroup({ title, links }) {
  return (
    <div className="flex flex-col gap-6">
      <h3 className="font-bold text-bright-snow-100 text-lg tracking-tight">
        {title}
      </h3>
      <ul className="flex flex-col gap-3.5 text-carbon-black-300">
        {links.map((link) => (
          <li key={link.name}>
            <Link
              to={link.path}
              className="transition-colors duration-200 hover:text-azure-blue-400 text-sm md:text-base"
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Footer() {
  const QuickLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Countries", path: "/country" },
    { name: "Region", path: "/region" },
    { name: "World Facts", path: "/worldfacts" },
  ];

  const exploreLinks = [
    { name: "How It Works", path: "/#how-it-works" },
    { name: "Regions", path: "/region#regions-details" },
    { name: "Monuments", path: "/#monuments" },
    { name: "FAQs", path: "/#faqs-section" },
  ];

  return (
    <footer className="bg-carbon-black-950 border-t border-carbon-black-800/50 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-12 md:gap-8 mb-20">
        {/* Brand Section */}
        <div className="flex flex-col sm:col-span-2 lg:col-span-4 lg:col-start-1 row-start-1 gap-8">
          <Logo />
          <p className="text-carbon-black-400 text-sm sm:text-base leading-relaxed max-w-md">
            Transforming the way you explore the world with innovative digital
            solutions since 2025. We help you discover global insights
            efficiently.
          </p>
          <div className="flex gap-5">
            <a
              href="#"
              className="p-2 text-carbon-black-400 hover:text-azure-blue-400 hover:bg-bright-snow-100/5 hover:-translate-y-1 rounded-full transition-all"
            >
              <Facebook size={20} />
            </a>
            <a
              href="#"
              className="p-2 text-carbon-black-400 hover:text-azure-blue-400 hover:bg-bright-snow-100/5 hover:-translate-y-1 rounded-full transition-all"
            >
              <Twitter size={20} />
            </a>
            <a
              href="#"
              className="p-2 text-carbon-black-400 hover:text-azure-blue-400 hover:bg-bright-snow-100/5 hover:-translate-y-1 rounded-full transition-all"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="#"
              className="p-2 text-carbon-black-400 hover:text-azure-blue-400 hover:bg-bright-snow-100/5 hover:-translate-y-1 rounded-full transition-all"
            >
              <Instagram size={20} />
            </a>
          </div>
        </div>

        {/* Quicklinks */}
        <div className="md:row-start-2 lg:row-start-1 lg:col-span-2 lg:col-start-7">
          <FooterLinkGroup title="Quick Links" links={QuickLinks} />
        </div>

        {/* Contact Us Section */}
        <div className="md:row-start-2 lg:row-start-1 lg:col-span-4 lg:col-start-9 flex flex-col gap-6">
          <h3 className="font-bold text-bright-snow-100 text-lg tracking-tight">
            Contact Us
          </h3>
          <ul className="flex flex-col gap-6">
            <li className="flex gap-4 items-start text-carbon-black-300">
              <MapPin className="text-azure-blue-400 shrink-0 mt-1" size={18} />
              <span className="text-sm md:text-base">
                123 World Avenue, Globe Center
              </span>
            </li>
            <li className="flex gap-4 items-center text-carbon-black-300">
              <Mail className="text-azure-blue-400 shrink-0" size={18} />
              <a
                href="mailto:info@worldatlas.com"
                className="text-sm md:text-base hover:text-azure-blue-400 transition-colors"
              >
                info@worldatlas.com
              </a>
            </li>
            <li className="flex gap-4 items-center text-carbon-black-300">
              <Phone className="text-azure-blue-400 shrink-0" size={18} />
              <span className="text-sm md:text-base">+1 (212) 555-1234</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-6 pt-10 border-t border-carbon-black-800/30 text-xs md:text-sm text-carbon-black-500 font-medium text-center">
        <p>© {new Date().getFullYear()} WorldAtlas. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
