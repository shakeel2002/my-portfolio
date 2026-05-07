import React from "react";
import { motion } from "framer-motion";

const Experience = () => {
  return (
    <section
      id="experience"
      className="py-4 section-3d section-path path-experience"
    >
      <h2 className="heading-pop text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
        Experience
      </h2>
      <div className="flex flex-col gap-4 px-4">
        <motion.div
          whileHover={{ scale: 1.01 }}
          className="card-reflect rounded-lg p-6 shadow-sm transition-colors"
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
              NOV 2024 – OCT 2025
            </span>
          </div>

          <ul className="list-disc list-inside space-y-2 text-stitch-black text-sm sm:text-base leading-relaxed">
            <li>
              Developed AI-powered camera monitoring systems for object detection
              using <span className="font-bold">Python, TensorFlow, and YOLOv5</span>.
            </li>
            <li>
              Built AI-based quiz and chatbot applications using{" "}
              <span className="font-bold">Android Studio</span> with Flask
              backend integration.
            </li>
            <li>
              Designed and developed cross-platform{" "}
              <span className="font-bold">Flutter</span> applications with
              real-time analytics features.
            </li>
            <li>
              Worked on AI prompt engineering and workflow optimization using
              tools like{" "}
              <span className="font-bold text-stitch-gold">
                DeepSeek & Cursor
              </span>
              .
            </li>
            <li>
              Provided IT support for internal systems, software
              troubleshooting, user assistance, and technical issue resolution.
            </li>
            <li>
              Assisted in system setup, application maintenance, and day-to-day
              technical operations.
            </li>
            <li>
              Managed project-related documentation, reports, version tracking,
              and technical records.
            </li>
            <li>
              Handled document organization and workflow management for
              development and client deliverables.
            </li>
            <li>
              Created graphic design materials including UI assets, banners,
              presentation visuals, and branding-related content.
            </li>
            <li>
              Collaborated with development and design teams to improve user
              experience and application interfaces.
            </li>
            <li>
              Participated in testing, debugging, deployment support, and
              client requirement handling.
            </li>
          </ul>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
