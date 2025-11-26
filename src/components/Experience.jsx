import React from "react";
import { motion } from "framer-motion";

const Experience = () => {
  return (
    <section id="experience" className="py-4">
      <h2 className="text-stitch-black text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
        Experience
      </h2>
      <div className="flex flex-col gap-4 px-4">
        <motion.div
          whileHover={{ scale: 1.01 }}
          className="rounded-lg border border-stitch-pink bg-stitch-card p-6 shadow-sm transition-colors"
        >
          {/* Flex-Col on Mobile, Flex-Row on Desktop */}
          <div className="flex flex-col md:flex-row md:justify-between mb-4 gap-2">
            <div>
              <h3 className="text-lg sm:text-xl font-black text-stitch-black">
                AI & Application Developer
              </h3>
              <p className="text-stitch-red font-bold text-sm sm:text-base">
                Omsevvel Software, Chennai
              </p>
            </div>
            {/* Date moves below on mobile */}
            <span className="text-stitch-textux font-medium text-sm">
              Sep 2024 – Sep 2025
            </span>
          </div>

          <ul className="list-disc list-inside space-y-2 text-stitch-black text-sm sm:text-base leading-relaxed">
            <li>
              Developed AI-powered camera monitoring systems for object
              detection using{" "}
              <span className="font-bold">Python, TensorFlow, YOLOv5</span>.
            </li>
            <li>
              Built AI-based quiz and chat applications using{" "}
              <span className="font-bold">Android Studio</span> with a Flask
              backend.
            </li>
            <li>
              Designed cross-platform applications in{" "}
              <span className="font-bold">Flutter</span> for real-time
              analytics.
            </li>
            <li>
              Applied prompt engineering techniques using AI tools like{" "}
              <span className="font-bold text-stitch-gold">
                DeepSeek & Cursor
              </span>
              .
            </li>
          </ul>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
