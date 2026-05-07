import React from "react";
import { motion } from "framer-motion";

const Education = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      whileHover={{ y: -4 }}
      className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4 py-6 section-3d section-path path-education"
    >
      {/* Education */}
      <div className="flex flex-col gap-4 h-full">
        <h2 className="heading-pop text-[22px] font-bold leading-tight">
          Education
        </h2>
        <div className="card-reflect p-6 rounded-lg h-full shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-lg text-stitch-black">
              B.Tech Information Technology
            </h3>
            <p className="text-stitch-textux mb-2">
              Aalim Muhammed Salegh College of Engineering Afflicated Anna
              University
            </p>
          </div>
          <div className="flex justify-between mt-4 pt-4 border-t border-stitch-pink text-sm text-stitch-black">
            <span>CGPA: 8.04</span>
            <span className="font-bold text-stitch-gold">2024</span>
          </div>
        </div>
      </div>

      {/* Certifications */}
      <div className="flex flex-col gap-4 h-full">
        <h2 className="heading-pop text-[22px] font-bold leading-tight">
          Certifications
        </h2>
        <div className="card-reflect p-6 rounded-lg h-full shadow-sm">
          <ul className="space-y-3 text-stitch-black text-sm">
            <li className="flex items-center gap-3">
              <span className="text-stitch-red font-bold">✓</span> Foundation of
              Python
            </li>
            <li className="flex items-center gap-3">
              <span className="text-stitch-red font-bold">✓</span> Oracle DBA
            </li>
            <li className="flex items-center gap-3">
              <span className="text-stitch-red font-bold">✓</span> Full Stack
              Web Development
            </li>
            <li className="flex items-center gap-3">
              <span className="text-stitch-red font-bold">✓</span> ChatGPT
              Prompt Engineering
            </li>
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

export default Education;
