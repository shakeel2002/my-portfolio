import React from "react";
import { motion } from "framer-motion";

// --- DATA ---
const skillCategories = [
  {
    title: "Programming Languages",
    skills: [
      {
        name: "Python",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
        special: true,
      },
      {
        name: "JavaScript",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
      },
      {
        name: "SQL",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
      },
      {
        name: "HTML5",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
      },
      {
        name: "CSS3",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
      },
    ],
  },
  // --- NEW CATEGORY ADDED HERE ---
  {
    title: "AI Tools & Integration",
    skills: [
      {
        name: "ChatGPT",
        icon: "https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg",
      },
      {
        name: "DeepSeek",
        icon: "https://cdn-icons-png.flaticon.com/512/25/25383.png",
      },
      {
        name: "Google Studio (Gemini)",
        icon: "https://upload.wikimedia.org/wikipedia/commons/8/8a/Google_Gemini_logo.svg",
      },
      {
        name: "Copilot",
        icon: "https://cdn.simpleicons.org/githubcopilot",
      },
      {
        name: "Cursor",
        icon: "https://cdn.simpleicons.org/cursor",
      },
      {
        name: "Claude",
        icon: "https://cdn.simpleicons.org/anthropic",
      },
      {
        name: "Blackbox",
        icon: "https://cdn-icons-png.flaticon.com/512/4712/4712100.png",
      },
      {
        name: "Stitch",
        icon: "https://cdn-icons-png.flaticon.com/512/857/857681.png",
      },
    ],
  },

  {
    title: "Frontend Development",
    skills: [
      {
        name: "React.js",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
      },
      {
        name: "Tailwind",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
      },
      {
        name: "UI Design",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
      },
    ],
  },
  {
    title: "Backend & API",
    skills: [
      {
        name: "Flask",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg",
      },
      {
        name: "Node.js",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
      },
      {
        name: "REST API",
        icon: "https://cdn.simpleicons.org/json/000",
      },
    ],
  },
  {
    title: "Mobile Development",
    skills: [
      {
        name: "Android (Java)",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/android/android-original.svg",
      },
      {
        name: "XML",
        icon: "https://cdn.simpleicons.org/xml/000",
      },
      {
        name: "Firebase",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
      },
    ],
  },
  {
    title: "AI & Machine Learning",
    skills: [
      {
        name: "TensorFlow",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg",
      },
      {
        name: "OpenCV",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opencv/opencv-original.svg",
      },
    ],
  },
  {
    title: "Databases",
    skills: [
      {
        name: "MySQL",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
      },
      {
        name: "PostgreSQL",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
      },
      {
        name: "MongoDB",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
      },
      {
        name: "Oracle SQL",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/oracle/oracle-original.svg",
      },
    ],
  },
  {
    title: "Tools & Hosting",
    skills: [
      {
        name: "Git & GitHub",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
      },
      {
        name: "VS Code",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg",
      },
      {
        name: "Postman",
        icon: "https://www.svgrepo.com/show/354202/postman-icon.svg",
      },
      {
        name: "Netlify/Vercel",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg",
      },
    ],
  },
  {
    title: "Languages",
    skills: [
      {
        name: "Tamil",
        icon: "https://upload.wikimedia.org/wikipedia/commons/9/9e/ISO_639_Icon_ta.svg",
      },
      {
        name: "English",
        icon: "https://upload.wikimedia.org/wikipedia/commons/e/ef/ISO_639_Icon_en.svg",
      },
    ],
  },
];

// --- COMPONENT: INDIVIDUAL SKILL ITEM (The 3D Icon) ---
const SkillItem = ({ name, icon, special }) => {
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
          src={icon}
          alt={name}
          className="w-full h-full object-contain drop-shadow-sm"
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
      className="flex flex-col gap-4 p-5 rounded-xl border border-stitch-pink bg-stitch-card shadow-sm hover:shadow-md transition-shadow duration-300 h-full"
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
    <section id="skills" className="py-8">
      <h2 className="text-stitch-black text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-6 pt-5">
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
        <div className="p-5 rounded-xl border border-stitch-pink bg-stitch-card shadow-sm">
          <h3 className="text-stitch-black font-bold text-lg border-b border-stitch-pink pb-3 mb-4">
            Soft Skills
          </h3>
          <div className="flex flex-wrap gap-3">
            {[
              "Problem-Solving",
              "Logical Thinking",
              "Team Collaboration",
              "Communication",
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
