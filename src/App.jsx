import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Education from "./components/Education";
import Contact from "./components/Contact";
import SocialLinks from "./components/SocialLinks";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedMode = localStorage.getItem("theme");
    if (savedMode === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    if (darkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
    setDarkMode(!darkMode);
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden font-sans group/design-root bg-stitch-bg transition-colors duration-300">
      <Navbar darkMode={darkMode} toggleTheme={toggleTheme} />

      <div className="layout-container flex h-full grow flex-col">
        {/* RESPONSIVE PADDING FIX: px-4 (Mobile) -> md:px-8 (Tablet) -> lg:px-12 (Desktop) */}
        <div className="px-4 md:px-8 lg:px-12 flex flex-1 justify-center py-5">
          {/* MAX WIDTH CONSTRAINT: Prevents site from looking stretched on wide monitors */}
          <div className="layout-content-container flex flex-col w-full max-w-5xl flex-1">
            <Hero />
            <About />
            <Skills />
            <Experience />
            <Projects />
            <Education />
            <Contact />

            <footer className="py-10 text-center border-t border-stitch-pink mt-10">
              <div className="flex justify-center mb-4">
                <SocialLinks />
              </div>
              <p className="text-stitch-textux text-sm">
                © 2025 — Designed & Developed by Shakeel Ahamed <br />
                <span className="text-stitch-gold font-bold">
                  AI • Web • Mobile
                </span>
              </p>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
