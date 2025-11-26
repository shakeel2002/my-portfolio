import React from "react";
import { motion } from "framer-motion";

const Hero = () => {
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
          <h1 className="text-white text-3xl sm:text-5xl md:text-6xl font-black leading-tight tracking-tight">
            Shakeel Ahamed
          </h1>
          <h2 className="text-white text-sm sm:text-lg md:text-xl font-normal leading-normal">
            Software Engineer |{" "}
            <span className="text-stitch-gold font-bold">AI</span> & Full-Stack
            Developer
          </h2>
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
            href="shakeelahamedresume.pdf"
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
      </div>
    </motion.div>
  );
};

export default Hero;
