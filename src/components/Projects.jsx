import React from "react";
import ProjectCard from "./ProjectCard";
import { motion } from "framer-motion";

const Projects = () => {
  const projects = [
    {
      title: "AI-Powered Quiz & Chat App",
      desc: "Interactive Quiz App with AI chat integration. Features intelligent response generation using Flask & Node.js.",
      tech: "Java, XML, Flask",
      link: "https://github.com/shakeel2002/OSA",
      // Image: Clean UI/App
      img: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070&auto=format&fit=crop",
    },
    {
      title: "Scobby Alert System",
      desc: "Computer Vision system for real-time object detection and load counting. Displays bounding boxes for safety monitoring.",
      tech: "Python, YOLOv5, OpenCV",
      link: "https://github.com/shakeel2002",
      // Image: Object Detection / Bounding Boxes / Computer Vision Analysis
      img: "https://images.unsplash.com/photo-1555255707-c07966088b7b?q=80&w=2070&auto=format&fit=crop",
    },
    {
      title: "Trading Learning Platform",
      desc: "Comprehensive trading education platform featuring real-time candlestick charts, dashboards, and lessons.",
      tech: "React, Flask, MySQL",
      link: "https://github.com/shakeel2002",
      // Image: Clear Candlestick Chart / Trading Graph
      img: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=2070&auto=format&fit=crop",
    },
    {
      title: "AI Voice Agent",
      desc: "Conversational AI agent capable of real-time speech interaction using Google Studio APIs.",
      tech: "React, Google API",
      link: "https://github.com/shakeel2002/ai-voicebot",
      // Image: Audio Waveform / Voice Tech
      img: "https://images.unsplash.com/photo-1589254065878-42c9da997008?q=80&w=2070&auto=format&fit=crop",
    },
  ];

  return (
    <section id="projects" className="py-8">
      <div className="flex justify-between items-end px-4 pb-4">
        <h2 className="text-stitch-black text-[22px] font-bold leading-tight tracking-[-0.015em]">
          Projects
        </h2>

        {/* SWIPE HINT (Visible only on Mobile) */}
        <motion.div
          initial={{ opacity: 0.6, x: 0 }}
          animate={{ opacity: 1, x: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-xs font-medium text-stitch-red md:hidden flex items-center gap-1"
        >
          Swipe to explore <span>→</span>
        </motion.div>
      </div>

      {/* Horizontal Scroll Container */}
      <div className="flex overflow-x-auto gap-4 px-4 pb-8 no-scrollbar snap-x snap-mandatory items-stretch">
        {projects.map((proj, i) => (
          <div key={i} className="snap-center shrink-0 h-full">
            <ProjectCard {...proj} />
          </div>
        ))}

        {/* Padding div to ensure the last card isn't flush against the edge */}
        <div className="w-2 shrink-0" />
      </div>
    </section>
  );
};

export default Projects;
