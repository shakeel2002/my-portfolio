import React, { useEffect, useRef } from "react";
import ProjectCard from "./ProjectCard";

const Projects = () => {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  const scrollCards = (direction) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: direction * 320, behavior: "smooth" });
  };

  useEffect(() => {
    const el = trackRef.current;
    const sectionEl = sectionRef.current;
    if (!el || !sectionEl) return;

    // Ensure rail starts from first card.
    el.scrollLeft = 0;

    // Keep mobile/tablet touch scrolling fully native and simple.
    const enableWheelLock =
      window.matchMedia("(min-width: 768px) and (pointer: fine)").matches;
    if (!enableWheelLock) return;

    const moveHorizontally = (event) => {
      const hasHorizontalOverflow = el.scrollWidth > el.clientWidth + 2;
      if (!hasHorizontalOverflow) return;

      if (Math.abs(event.deltaY) < 2) return;

      const atStart = el.scrollLeft <= 0;
      const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 2;
      const goingForward = event.deltaY > 0;
      const shouldCapture =
        (goingForward && !atEnd) || (!goingForward && !atStart);

      if (shouldCapture) {
        event.preventDefault();
        el.scrollLeft += event.deltaY * 0.75;
      }
    };

    // Capture page wheel while projects section is active in viewport.
    const onWindowWheel = (event) => {
      const rect = sectionEl.getBoundingClientRect();
      const sectionActive =
        rect.top < window.innerHeight * 0.58 &&
        rect.bottom > window.innerHeight * 0.42;

      if (!sectionActive) return;
      moveHorizontally(event);
    };

    window.addEventListener("wheel", onWindowWheel, { passive: false });
    return () => {
      window.removeEventListener("wheel", onWindowWheel);
    };
  }, []);

  const projects = [
    {
      title: "Smart CRM System",
      desc: "Modern CRM and workflow platform managing the full journey from enquiry to project completion with automation, dashboards, and AI-assisted operations.",
      tech: "Next.js, Node.js, Express, PostgreSQL, Supabase",
      link: "https://github.com/shakeel2002/my-portfolio",
      // Image: Modern dashboard / CRM workflow visualization
      img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2069&auto=format&fit=crop",
    },
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
    <section
      id="projects"
      ref={sectionRef}
      className="py-8 section-3d section-path path-projects"
    >
      <div className="flex justify-between items-end px-4 pb-4 gap-3">
        <h2 className="heading-pop text-[22px] font-bold leading-tight tracking-[-0.015em]">
          Projects
        </h2>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => scrollCards(-1)}
            className="h-8 w-8 rounded-full border border-stitch-pink text-stitch-red hover:bg-stitch-input transition-colors"
            aria-label="Scroll projects left"
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => scrollCards(1)}
            className="h-8 w-8 rounded-full border border-stitch-pink text-stitch-red hover:bg-stitch-input transition-colors"
            aria-label="Scroll projects right"
          >
            →
          </button>
        </div>
      </div>

      <div
        ref={trackRef}
        className="overflow-x-auto no-scrollbar px-4 pb-8 scroll-smooth snap-x snap-proximity [scrollbar-gutter:stable] touch-pan-x overscroll-x-contain"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        <div className="flex gap-4 items-stretch w-max">
          {projects.map((proj, i) => (
            <div key={i} className="shrink-0 h-full snap-center">
              <ProjectCard {...proj} />
            </div>
          ))}
          <div className="w-2 shrink-0" />
        </div>
      </div>
    </section>
  );
};

export default Projects;
