import React, { useState } from "react";
import { motion } from "framer-motion";

const DEFAULT_SKILL_ICON =
  "https://img.icons8.com/fluency/96/maintenance.png";

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
        name: "Next.js",
        icon: "https://cdn.simpleicons.org/nextdotjs",
      },
      {
        name: "React.js",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
      },
      {
        name: "TypeScript",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
      },
      {
        name: "Tailwind",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
      },
      {
        name: "UI/UX Design",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
      },
      {
        name: "Responsive Web Design",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
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
        name: "REST API Development",
        icon: "https://cdn.simpleicons.org/json",
      },
      {
        name: "FastAPI",
        icon: "https://cdn.simpleicons.org/fastapi",
      },
      {
        name: "PHP",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg",
      },
      {
        name: "Supabase",
        icon: "https://cdn.simpleicons.org/supabase",
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
        icon: "https://cdn.simpleicons.org/xml",
      },
      {
        name: "Firebase",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
      },
      {
        name: "Flutter",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg",
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
      {
        name: "YOLOv5",
        icon: "https://img.icons8.com/color/96/object.png",
      },
      {
        name: "Prompt Engineering",
        icon: "https://cdn.simpleicons.org/openai",
      },
      {
        name: "RAG",
        icon: "https://img.icons8.com/color/96/knowledge-sharing.png",
      },
    ],
  },
  {
    title: "Automation & Integrations",
    skills: [
      {
        name: "WhatsApp Automation",
        icon: "https://cdn.simpleicons.org/whatsapp",
      },
      {
        name: "Email Automation",
        icon: "https://img.icons8.com/color/96/new-post.png",
      },
    ],
  },
  {
    title: "Database Management",
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
    title: "IT Support & Systems",
    skills: [
      {
        name: "Technical Support",
        icon: "https://img.icons8.com/color/96/technical-support.png",
      },
      {
        name: "Software Installation",
        icon: "https://img.icons8.com/color/96/installing-updates.png",
      },
      {
        name: "System Maintenance",
        icon: "https://cdn.simpleicons.org/keepassxc",
      },
      {
        name: "User Support",
        icon: "https://img.icons8.com/color/96/customer-support.png",
      },
      {
        name: "Windows Environment",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/windows8/windows8-original.svg",
      },
      {
        name: "Basic Networking",
        icon: "https://cdn.simpleicons.org/cisco",
      },
      {
        name: "Hardware Setup",
        icon: "https://cdn.simpleicons.org/amd",
      },
      {
        name: "IT Operations",
        icon: "https://cdn.simpleicons.org/opsgenie",
      },
    ],
  },
  {
    title: "Networking & Cloud",
    skills: [
      {
        name: "Network Basics",
        icon: "https://cdn.simpleicons.org/cisco",
      },
      {
        name: "IP Configuration",
        icon: "https://cdn.simpleicons.org/internetarchive",
      },
      {
        name: "Cloud App Basics",
        icon: "https://cdn.simpleicons.org/googlecloud",
      },
      {
        name: "Firebase Cloud Services",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
      },
      {
        name: "Hosting & Deployment",
        icon: "https://cdn.simpleicons.org/vercel",
      },
    ],
  },
  {
    title: "Document Control & Administration",
    skills: [
      {
        name: "Document Management",
        icon: "https://cdn.simpleicons.org/googledocs",
      },
      {
        name: "Version Control",
        icon: "https://cdn.simpleicons.org/git",
      },
      {
        name: "Excel Reporting",
        icon: "https://img.icons8.com/color/96/microsoft-excel-2019--v1.png",
      },
      {
        name: "File Organization",
        icon: "https://cdn.simpleicons.org/googledrive",
      },
      {
        name: "Technical Documentation",
        icon: "https://cdn.simpleicons.org/notion",
      },
      {
        name: "Workflow Documentation",
        icon: "https://cdn.simpleicons.org/confluence",
      },
      {
        name: "Data Entry & Reporting",
        icon: "https://img.icons8.com/color/96/combo-chart--v1.png",
      },
    ],
  },
  {
    title: "Graphic Design & Creative",
    skills: [
      {
        name: "Graphic Design",
        icon: "https://img.icons8.com/color/96/design.png",
      },
      {
        name: "Banner & Poster Design",
        icon: "https://img.icons8.com/color/96/banner.png",
      },
      {
        name: "Social Media Creatives",
        icon: "https://cdn.simpleicons.org/instagram",
      },
      {
        name: "UI Assets & Branding",
        icon: "https://cdn.simpleicons.org/figma",
      },
      {
        name: "Presentation Design",
        icon: "https://img.icons8.com/color/96/microsoft-powerpoint-2019--v1.png",
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
        name: "Netlify",
        icon: "https://cdn.simpleicons.org/netlify",
      },
      {
        name: "Vercel",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg",
      },
      {
        name: "Android Studio",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/androidstudio/androidstudio-original.svg",
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
              "Logical Thinking",
              "Team Collaboration",
              "Communication",
              "Time Management",
              "Adaptability",
              "Fast Learning",
              "Client Handling",
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
