import React from "react";
import { motion } from "framer-motion";

const ProjectCard = ({ title, desc, tech, img, link }) => {
  return (
    <motion.a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ y: -5 }}
      /* 
         RESPONSIVE SIZING LOGIC:
         1. w-[85vw]: On Mobile (Phone), the card takes up 85% of the screen width. 
            This creates a "peek" effect where you can see the next card coming.
         2. sm:w-[320px]: On Tablet and Laptop (screens larger than 640px), 
            the card locks to a fixed 320px width so it doesn't get too huge.
         3. flex-col h-full: Ensures all cards are the same height.
      */
      className="flex flex-col w-[85vw] sm:w-[320px] h-full rounded-xl border border-stitch-pink bg-stitch-card p-4 shadow-sm cursor-pointer hover:border-stitch-red transition-all duration-300 group"
    >
      {/* Image Container */}
      <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-gray-200">
        <img
          src={img}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Dark overlay on hover for effect */}
        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-all" />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-2 mt-4 grow">
        <h3 className="text-stitch-black text-lg font-bold leading-tight group-hover:text-stitch-red transition-colors">
          {title}
        </h3>
        <p className="text-stitch-textux text-sm font-normal leading-relaxed line-clamp-3">
          {desc}
        </p>

        {/* Tech Badge - Pushed to bottom */}
        <div className="mt-auto pt-3 border-t border-stitch-pink">
          <span className="inline-block text-xs font-bold text-stitch-red bg-stitch-input px-2 py-1 rounded">
            {tech}
          </span>
        </div>
      </div>
    </motion.a>
  );
};

export default ProjectCard;
