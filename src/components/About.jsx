import React from "react";
import { motion } from "framer-motion";

const About = () => {
  return (
    <motion.div
      id="about"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.35 }}
      className="flex flex-col gap-10 px-4 py-10 @container section-3d section-path path-about"
    >
      <div className="flex flex-col gap-4">
        <h2 className="heading-pop text-[22px] font-bold leading-tight tracking-[-0.015em]">
          About Me
        </h2>
        <p className="text-stitch-black text-base font-normal leading-normal max-w-[720px]">
          Full Stack Developer focused on production-ready web applications with
          React/Next.js and Node.js, plus practical AI-powered feature
          integration. I build clean, scalable systems with strong delivery
          discipline, documentation, and business-focused execution.
        </p>

        <div className="card-reflect p-5 rounded-lg border-l-4 border-stitch-gold">
          <p className="text-stitch-black font-medium">Currently exploring:</p>
          <p className="text-stitch-textux mt-1">
            Advanced AI agents, LLM integrations, scalable backend
            architectures, and next-generation SaaS products to build smarter
            and more automated systems.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default About;
