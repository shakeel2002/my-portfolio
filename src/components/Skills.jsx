import React, { useState } from "react";
import { motion } from "framer-motion";

const DEFAULT_SKILL_ICON =
  "https://img.icons8.com/fluency/96/maintenance.png";

// --- DATA ---
const skillCategories = [
  {
    title: "Core Stack",
    skills: [
      {
        name: "Next.js",
        icon: "https://cdn.simpleicons.org/nextdotjs",
        special: true,
      },
      {
        name: "React",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
      },
      {
        name: "TypeScript",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
      },
      {
        name: "JavaScript",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
      },
      {
        name: "Tailwind CSS",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
      },
    ],
  },
  {
    title: "Backend & API",
    skills: [
      {
        name: "Node.js",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
      },
      {
        name: "Express.js",
        icon: "https://cdn.simpleicons.org/express",
      },
      {
        name: "REST APIs",
        icon: "https://cdn.simpleicons.org/json",
      },
      {
        name: "Supabase",
        icon: "https://cdn.simpleicons.org/supabase",
      },
      {
        name: "Flask",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg",
      },
    ],
  },
  {
    title: "AI Integration",
    skills: [
      {
        name: "OpenAI API",
        icon: "https://cdn.simpleicons.org/openai",
      },
      {
        name: "Gemini API",
        icon: "https://upload.wikimedia.org/wikipedia/commons/8/8a/Google_Gemini_logo.svg",
      },
      {
        name: "OpenCV",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opencv/opencv-original.svg",
      },
      {
        name: "YOLOv5",
        icon: "https://img.icons8.com/color/96/object.png",
      },
      {
        name: "Prompt Engineering",
        icon: "https://cdn.simpleicons.org/openai",
      },
      {
        name: "Workflow Automation",
        icon: "https://img.icons8.com/color/96/workflow.png",
      },
    ],
  },
  {
    title: "Databases & Delivery",
    skills: [
      {
        name: "PostgreSQL",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
      },
      {
        name: "MySQL",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
      },
      {
        name: "Oracle DB",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/oracle/oracle-original.svg",
      },
      {
        name: "Git & GitHub",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
      },
      {
        name: "Postman",
        icon: "https://www.svgrepo.com/show/354202/postman-icon.svg",
      },
      {
        name: "Vercel / Netlify",
        icon: "https://cdn.simpleicons.org/vercel",
      },
      {
        name: "AWS",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
      },
      {
        name: "Microsoft 365",
        icon: "https://img.icons8.com/color/96/office-365.png",
      },
    ],
  },
  {
    title: "Professional Strengths",
    skills: [
      {
        name: "IT Troubleshooting",
        icon: "https://img.icons8.com/color/96/technical-support.png",
      },
      {
        name: "Excel Reporting",
        icon: "https://img.icons8.com/color/96/microsoft-excel-2019--v1.png",
      },
      {
        name: "Documentation",
        icon: "https://cdn.simpleicons.org/googledocs",
      },
      {
        name: "UI/UX Collaboration",
        icon: "https://cdn.simpleicons.org/figma",
      },
      {
        name: "Client Communication",
        icon: "https://img.icons8.com/color/96/communication.png",
      },
    ],
  },
];

// --- COMPONENT: INDIVIDUAL SKILL ITEM (The 3D Icon) ---
const SkillItem = ({ name, icon, special }) => {
  const [imgSrc, setImgSrc] = useState(icon);

  return (
    <motion.div
      whileHover={{
        y: -5,
        scale: 1.1,
        boxShadow: special
          ? "0px 10px 15px -3px rgba(212, 175, 55, 0.4)" // Gold Glow
          : "0px 10px 15px -3px rgba(0, 0, 0, 0.1)",
      }}
      transition={{ type: "spring", stiffness: 300 }}
      className={`
        flex flex-col items-center justify-center 
        p-3 rounded-lg bg-stitch-input border 
        transition-colors duration-300 cursor-pointer
        ${
          special
            ? "border-stitch-gold/60 bg-yellow-50/10"
            : "border-transparent hover:border-stitch-pink"
        }
      `}
    >
      {/* Icon Animation */}
      <motion.div
        animate={special ? { y: [0, -3, 0] } : {}}
        transition={
          special ? { duration: 2, repeat: Infinity, ease: "easeInOut" } : {}
        }
        className="w-10 h-10 mb-2 flex items-center justify-center"
      >
        <img
          src={imgSrc}
          alt={name}
          className="w-full h-full object-contain drop-shadow-sm"
          onError={(e) => {
            if (imgSrc !== DEFAULT_SKILL_ICON) {
              setImgSrc(DEFAULT_SKILL_ICON);
            } else {
              e.currentTarget.onerror = null;
            }
          }}
        />
      </motion.div>

      <span
        className={`text-xs font-bold text-center ${
          special ? "text-stitch-gold" : "text-stitch-black"
        }`}
      >
        {name}
      </span>
    </motion.div>
  );
};

// --- COMPONENT: CATEGORY CARD (The Container) ---
const CategoryCard = ({ category }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="card-reflect flex flex-col gap-4 p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 h-full"
    >
      <h3 className="text-stitch-black font-bold text-lg border-b border-stitch-pink pb-2">
        {category.title}
      </h3>

      {/* Inner Grid for Skills */}
      <div className="grid grid-cols-3 gap-3">
        {category.skills.map((skill) => (
          <SkillItem
            key={skill.name}
            name={skill.name}
            icon={skill.icon}
            special={skill.special}
          />
        ))}
      </div>
    </motion.div>
  );
};

// --- MAIN SKILLS COMPONENT ---
const Skills = () => {
  return (
    <section id="skills" className="py-8 section-3d section-path path-skills">
      <h2 className="heading-pop text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-6 pt-5">
        Skills & Expertise
      </h2>

      {/* 
         RESPONSIVE GRID LAYOUT:
         - Mobile: 1 Column (grid-cols-1)
         - Tablet: 2 Columns (md:grid-cols-2)
         - Laptop: 3 Columns (lg:grid-cols-3)
         This packs the boxes tightly together.
      */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
        {skillCategories.map((cat, index) => (
          <CategoryCard key={index} category={cat} />
        ))}
      </div>

      {/* Soft Skills - Simple Pill Layout at Bottom */}
      <div className="px-4 mt-8">
        <div className="card-reflect p-5 rounded-xl shadow-sm">
          <h3 className="text-stitch-black font-bold text-lg border-b border-stitch-pink pb-3 mb-4">
            Soft Skills
          </h3>
          <div className="flex flex-wrap gap-3">
            {[
              "Problem-Solving",
              "Ownership",
              "Clear Communication",
              "Team Collaboration",
              "Time Management",
              "Adaptability",
            ].map((soft, i) => (
              <span
                key={i}
                className="px-4 py-2 rounded-full border border-stitch-pink bg-stitch-input text-stitch-black text-sm font-medium hover:bg-stitch-red hover:text-white transition-colors cursor-default shadow-sm"
              >
                {soft}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
