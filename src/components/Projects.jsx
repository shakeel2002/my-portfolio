import React from "react";
import ProjectCard from "./ProjectCard";

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
      <h2 className="text-stitch-black text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-4">
        Projects
      </h2>

      {/* 
         RESPONSIVE EXPLANATION:
         1. flex overflow-x-auto: Enables horizontal scrolling.
         2. gap-6: Adds space between cards.
         3. snap-x snap-mandatory: Makes it snap to the center of the card when scrolling on mobile.
         4. no-scrollbar: Hides the ugly scrollbar bar.
      */}
      <div className="flex overflow-x-auto gap-6 px-4 pb-8 no-scrollbar snap-x snap-mandatory items-stretch">
        {projects.map((proj, i) => (
          <div key={i} className="snap-center shrink-0 h-full">
            <ProjectCard {...proj} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
