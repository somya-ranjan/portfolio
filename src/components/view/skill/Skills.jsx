"use client";

import { useRef } from "react";
import { motion } from "framer-motion";

import { skillsData } from "@data";
import { handleCardMouseMove } from "@/utils";
import { SectionHeading } from "@/components";

const BRAND_COLORS = {
  "JavaScript (ES6+)": "#f7df1e",
  TypeScript: "#3178c6",
  HTML5: "#e34f26",
  CSS3: "#1572b6",
  "React.js": "#61dafb",
  "Next.js": "#0070f3",
  "Node.js": "#5fa04e",
  "Micro Frontends (MF)": "#8dd6f9",
  Storybook: "#ff4785",
  "Redux / Redux Toolkit": "#764abc",
  "Saga & Thunk": "#764abc",
  "Tailwind CSS": "#38bdf8",
  "Material UI (MUI)": "#007fff",
  Bootstrap: "#7952b3",
  "React Bootstrap": "#41e0fd",
  "Shadcn UI": "#7c3aed",
  Sass: "#cc6699",
  "REST APIs (Postman)": "#ff6c37",
  Swagger: "#85ea2d",
  Formik: "#0052cc",
  "React Hook Form": "#ec5990",
  "React Query": "#ff4154",
  "React Testing Library": "#e20477",
  Jest: "#c21325",
  Cypress: "#17202c",
  "Git / GitHub": "#f05032",
  "CI/CD & Webpack": "#8dd6f9",
  "GitHub Actions": "#2088ff",
  "Jira (Agile/Scrum)": "#0052cc",
  Confluence: "#0052cc",
  Vite: "#fcd000",
  NPM: "#cb3837",
  Bun: "#d97706",
};

const CATEGORIES = [
  {
    title: "Core & Architecture",
    skills: [
      "JavaScript (ES6+)",
      "TypeScript",
      "React.js",
      "Next.js",
      "Node.js",
      "Micro Frontends (MF)",
    ],
  },
  {
    title: "State & Logic",
    skills: [
      "Redux / Redux Toolkit",
      "Saga & Thunk",
      "Formik",
      "React Hook Form",
      "React Query",
      "REST APIs (Postman)",
      "Swagger",
    ],
  },
  {
    title: "Styling & UI Systems",
    skills: [
      "Tailwind CSS",
      "Material UI (MUI)",
      "Bootstrap",
      "React Bootstrap",
      "Shadcn UI",
      "Sass",
      "Storybook",
      "HTML5",
      "CSS3",
    ],
  },
  {
    title: "Tooling & DevOps",
    skills: [
      "Git / GitHub",
      "CI/CD & Webpack",
      "GitHub Actions",
      "Jira (Agile/Scrum)",
      "Confluence",
      "React Testing Library",
      "Jest",
      "Cypress",
      "Bun",
      "Vite",
      "NPM",
    ],
  },
];

export default function Skills() {
  const containerRef = useRef(null);

  return (
    <section id="skills" ref={containerRef}>
      <div className="container-lg">
        <SectionHeading subtitle="Centralized tools and frameworks I use to develop scalable frontend product applications.">
          Skills & Expertise
        </SectionHeading>

        <div className="space-y-12 3xl:space-y-16 4xl:space-y-20">
          {CATEGORIES.map((category) => (
            <div key={category.title} className="space-y-6">
              <h3
                className="text-xl font-bold uppercase tracking-[0.14em] opacity-80 border-b pb-2 3xl:text-2xl 4xl:text-3xl"
                style={{ borderColor: "var(--border)" }}
              >
                {category.title}
              </h3>
              <div className="grid-skills">
                {skillsData
                  .filter((skill) => category.skills.includes(skill.name.trim()))
                  .map((skill, index) => {
                    const Icon = skill.icon;
                    const skillName = skill.name.trim();
                    const color = BRAND_COLORS[skillName] || "var(--accent-soft)";

                    return (
                      <motion.div
                        key={skillName}
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{
                          delay: index * 0.03,
                          duration: 0.4,
                          ease: "easeOut",
                        }}
                        viewport={{ once: true }}
                        whileHover={{ y: -4 }}
                        onMouseMove={(e) => handleCardMouseMove(e, color)}
                        className="skill-badge group"
                      >
                        <Icon
                          size={32}
                          className="mb-3 transition-transform duration-300 ease-out group-hover:scale-110"
                          style={{ color: color }}
                        />
                        <p className="text-center text-xs font-semibold uppercase tracking-wider opacity-80 group-hover:opacity-100 transition-opacity 3xl:text-sm 4xl:text-base">
                          {skillName}
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
