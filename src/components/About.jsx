import React from "react";
import { motion } from "framer-motion";

const About = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      className="flex flex-col gap-10 px-4 py-10 @container"
    >
      <div className="flex flex-col gap-4">
        <h2 className="text-stitch-black text-[22px] font-bold leading-tight tracking-[-0.015em]">
          About Me
        </h2>
        <p className="text-stitch-black text-base font-normal leading-normal max-w-[720px]">
          I’m an <span className="font-bold text-stitch-red">IT graduate</span>{" "}
          specializing in AI-powered applications, Android development, and
          full-stack engineering. I enjoy turning ideas into working
          products—whether it's a smart Android app, a responsive web platform,
          or an AI agent that interacts with users.
        </p>

        <div className="bg-stitch-pink p-5 rounded-lg border-l-4 border-stitch-gold">
          <p className="text-stitch-black font-medium">Currently exploring:</p>
          <p className="text-stitch-textux mt-1">
            AI agents, LLM integrations, and scalable backend systems.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default About;
