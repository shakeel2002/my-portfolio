import React, { useState } from "react";
import { motion } from "framer-motion";

const Navbar = ({ darkMode, toggleTheme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const links = ["About", "Skills", "Experience", "Projects", "Contact"];

  return (
    <nav className="sticky top-0 z-50 w-full bg-stitch-bg/95 backdrop-blur-md border-b border-stitch-pink transition-colors duration-300">
      <div className="max-w-[960px] mx-auto px-4 md:px-10 py-4 flex justify-between items-center">
        {/* Logo */}
        <a
          href="#"
          className="text-xl font-black tracking-tight text-stitch-black hover:text-stitch-red transition-colors"
        >
          Shakeel<span className="text-stitch-gold">.</span>
        </a>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-sm font-bold text-stitch-black hover:text-stitch-red transition-colors"
            >
              {link}
            </a>
          ))}

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-stitch-pink text-stitch-black hover:bg-stitch-red hover:text-white transition-all"
            title="Toggle Theme"
          >
            {darkMode ? "☀️" : "🌙"}
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-4">
          <button onClick={toggleTheme} className="text-lg">
            {darkMode ? "☀️" : "🌙"}
          </button>
          <button
            className="text-stitch-black"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-stitch-card border-b border-stitch-pink p-4 flex flex-col gap-4 shadow-lg"
        >
          {links.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              onClick={() => setIsOpen(false)}
              className="text-base font-bold text-stitch-black hover:text-stitch-red"
            >
              {link}
            </a>
          ))}
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
