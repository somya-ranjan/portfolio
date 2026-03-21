"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  SiJavascript,
  SiTypescript,
  SiHtml5,
  SiReact,
  SiNextdotjs,
  SiWebpack,
  SiStorybook,
  SiRedux,
  SiTailwindcss,
  SiBootstrap,
  SiSass,
  SiPostman,
  SiGithub,
  SiJira,
  SiFormik,
  SiGithubactions,
} from "react-icons/si";
import { FiBox } from "react-icons/fi";
import { FaCss3 } from "react-icons/fa6";

const skillsData = [
  { name: "JavaScript (ES6+)", icon: SiJavascript },
  { name: "TypeScript", icon: SiTypescript },
  { name: "HTML5 ", icon: SiHtml5 },
  { name: "CSS3 ", icon: FaCss3 },
  { name: "React.js", icon: SiReact },
  { name: "Next.js", icon: SiNextdotjs },
  { name: "Micro Frontends (MF)", icon: SiWebpack },
  { name: "Storybook", icon: SiStorybook },
  { name: "Redux / Redux Toolkit", icon: SiRedux },
  { name: "Saga & Thunk", icon: SiRedux },
  { name: "Tailwind CSS", icon: SiTailwindcss },
  { name: "Material UI (MUI)", icon: FiBox },
  { name: "Bootstrap", icon: SiBootstrap },
  { name: "Sass", icon: SiSass },
  { name: "REST APIs (Postman)", icon: SiPostman },
  { name: "Formik", icon: SiFormik },
  { name: "Git / GitHub", icon: SiGithub },
  { name: "CI/CD & Webpack", icon: SiWebpack },
  { name: "GitHub Actions", icon: SiGithubactions },
  { name: "Jira (Agile/Scrum)", icon: SiJira },
];

export default function Skills() {
  const containerRef = useRef(null);
  const itemRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const { scrollYProgress: itemProgress } = useScroll({
    target: itemRef,
    offset: ["start center", "end center"],
  });
  const y = useTransform(itemProgress, [0, 1], [60, -60]);
  const rotate = useTransform(itemProgress, [0, 1], [0, 10]);

  return (
    <section id="skills" className="py-24 px-6" ref={containerRef}>
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center mb-4"
        >
          Skills & Expertise
        </motion.h2>

        {/* Skills Grid */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {skillsData.map((skill, index) => {
            const Icon = skill.icon;

            return (
              <motion.div
                key={skill.name}
                ref={itemRef}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.6 }}
                viewport={{ once: true }}
                style={{ y, rotate }}
                className="group flex flex-col items-center justify-center p-6 rounded-2xl transition-all duration-300 hover:scale-105"
              >
                {/* Icon */}
                <Icon
                  size={36}
                  className="mb-4 group-hover:scale-110 transition"
                />

                {/* Name */}
                <p className="text-sm font-medium text-center">{skill.name}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
