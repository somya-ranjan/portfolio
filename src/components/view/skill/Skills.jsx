"use client";

import { useRef } from "react";
import { motion } from "framer-motion";

import { skillsData } from "@data";

const BRAND_COLORS = {
  "JavaScript (ES6+)": "#f7df1e",
  "TypeScript": "#3178c6",
  HTML5: "#e34f26",
  CSS3: "#1572b6",
  "React.js": "#61dafb",
  "Next.js": "#38bdf8",
  "Micro Frontends (MF)": "#8dd6f9",
  "Storybook": "#ff4785",
  "Redux / Redux Toolkit": "#764abc",
  "Saga & Thunk": "#764abc",
  "Tailwind CSS": "#38bdf8",
  "Material UI (MUI)": "#007fff",
  "Bootstrap": "#7952b3",
  "Sass": "#cc6699",
  "REST APIs (Postman)": "#ff6c37",
  "Formik": "#0052cc",
  "Git / GitHub": "#f05032",
  "CI/CD & Webpack": "#8dd6f9",
  "GitHub Actions": "#2088ff",
  "Jira (Agile/Scrum)": "#0052cc",
};

const CATEGORIES = [
  {
    title: "Core & Architecture",
    skills: ["JavaScript (ES6+)", "TypeScript", "React.js", "Next.js", "Micro Frontends (MF)"],
  },
  {
    title: "State & Logic",
    skills: ["Redux / Redux Toolkit", "Saga & Thunk", "Formik", "REST APIs (Postman)"],
  },
  {
    title: "Styling & UI Systems",
    skills: ["Tailwind CSS", "Material UI (MUI)", "Bootstrap", "Sass", "Storybook", "HTML5", "CSS3"],
  },
  {
    title: "Tooling & DevOps",
    skills: ["Git / GitHub", "CI/CD & Webpack", "GitHub Actions", "Jira (Agile/Scrum)"],
  },
];

export default function Skills() {
  const containerRef = useRef(null);

  const handleMouseMove = (e, color) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const yVal = e.clientY - rect.top;
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${yVal}px`);
    if (color) {
      card.style.setProperty("--accent-soft", color);
    }
  };

  return (
    <section id="skills" className="section-wrap" ref={containerRef}>
      <div className="mx-auto max-w-7xl 3xl:max-w-[90vw] 4xl:max-w-[91vw] 5xl:max-w-[92vw]">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          viewport={{ once: true }}
          className="section-title section-heading section-heading-lg mb-4"
        >
          Skills & Expertise
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-center text-sm opacity-75 max-w-xl mx-auto mb-16"
        >
          Centralized tools and frameworks I use to develop scalable frontend product applications.
        </motion.p>

        <div className="space-y-16">
          {CATEGORIES.map((category, catIdx) => (
            <div key={category.title} className="space-y-6">
              <h3 className="text-xl font-bold uppercase tracking-[0.14em] opacity-80 border-b pb-2" style={{ borderColor: "var(--border)" }}>
                {category.title}
              </h3>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7">
                {skillsData
                  .filter((skill) => category.skills.includes(skill.name))
                  .map((skill, index) => {
                    const Icon = skill.icon;
                    const color = BRAND_COLORS[skill.name.trim()] || "var(--accent-soft)";

                    return (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{
                          delay: index * 0.03,
                          duration: 0.4,
                          ease: "easeOut",
                        }}
                        viewport={{ once: true }}
                        whileHover={{ y: -4 }}
                        onMouseMove={(e) => handleMouseMove(e, color)}
                        className="glass-panel glow-card group flex flex-col items-center justify-center rounded-2xl p-5 transition-all duration-300 cursor-default"
                      >
                        <Icon
                          size={32}
                          className="mb-3 transition-transform duration-300 ease-out group-hover:scale-110"
                          style={{ color: color }}
                        />
                        <p className="text-center text-xs font-semibold uppercase tracking-wider opacity-80 group-hover:opacity-100 transition-opacity">
                          {skill.name}
                        </p>
                      </motion.div>
                    );
                  })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
