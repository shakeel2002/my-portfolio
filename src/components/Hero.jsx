import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const Hero = () => {
  const pitchLines = [
    "Building production-ready full stack products",
    "Turning business workflows into smart automation",
    "Designing clean UI with measurable business impact",
  ];
  const [pitchIndex, setPitchIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPitchIndex((prev) => (prev + 1) % pitchLines.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [pitchLines.length]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="w-full py-4"
    >
      <div
        className="
          flex flex-col justify-end items-start
          w-full
          min-h-[400px] sm:min-h-[480px] md:min-h-[550px] /* Responsive Height */
          gap-6 sm:gap-8 
          bg-cover bg-center bg-no-repeat 
          rounded-xl sm:rounded-2xl
          p-6 sm:p-10
          shadow-lg
        "
        style={{
          backgroundImage:
            'linear-gradient(rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.7) 100%), url("https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop")',
        }}
      >
        <div className="flex flex-col gap-2 text-left max-w-2xl">
          {/* Responsive Text Size */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black leading-tight tracking-tight bg-linear-to-r from-[#d4af37] via-[#f4e2a1] to-white bg-clip-text text-transparent drop-shadow-[0_6px_16px_rgba(212,175,55,0.34)]">
            Shakeel Ahamed
          </h1>
          <h2 className="text-white text-sm sm:text-lg md:text-xl font-normal leading-normal">
            Software Engineer |{" "}
            <span className="text-stitch-gold font-bold">AI</span> & Full-Stack
            Developer
          </h2>

          <div className="min-h-7 mt-2">
            <AnimatePresence mode="wait">
              <motion.p
                key={pitchLines[pitchIndex]}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35 }}
                className="text-white/90 text-xs sm:text-sm md:text-base"
              >
                {pitchLines[pitchIndex]}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center rounded-lg h-10 px-5 sm:h-12 sm:px-6 bg-stitch-red text-[#fcf8f9] text-sm sm:text-base font-bold tracking-wide shadow-md hover:bg-[#b00f2e] transition-colors"
          >
            Hire Me
          </motion.a>

          <motion.a
            href="shakeelad-resume-2025.pdf"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="
                flex items-center justify-center rounded-lg h-10 px-5 sm:h-12 sm:px-6 
                bg-transparent border-2 border-white text-white 
                text-sm sm:text-base font-bold tracking-wide 
                hover:text-stitch-gold hover:border-stitch-gold hover:shadow-[0_0_20px_rgba(212,175,55,0.6)]
                transition-all duration-300
              "
          >
            View Resume
          </motion.a>
        </div>

        <motion.div
          animate={{ y: [0, 6, 0], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 1.6, repeat: Infinity }}
          className="text-white/80 text-xs mt-2"
        >
          Scroll to explore
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Hero;
