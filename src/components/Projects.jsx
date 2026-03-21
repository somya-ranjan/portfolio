"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const projects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    image: "/assets/images/project1.jpg",
    tech: ["React", "Next.js", "Tailwind"],
  },
  {
    id: 2,
    title: "Cloud Kitchen App",
    image: "/assets/images/project2.jpg",
    tech: ["React", "MUI", "Node.js"],
  },
];

export default function Projects() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  return (
    <section id="projects" className="py-24 px-6" ref={containerRef}>
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center"
        >
          Projects
        </motion.h2>

        {/* Grid */}
        <div className="mt-16 grid md:grid-cols-2 gap-10">
          {projects.map((project, index) => {
            const itemRef = useRef(null);
            const { scrollYProgress: itemProgress } = useScroll({
              target: itemRef,
              offset: ["start center", "end center"],
            });
            const y = useTransform(itemProgress, [0, 1], [80, -80]);
            const opacity = useTransform(
              itemProgress,
              [0, 0.5, 1],
              [0.5, 1, 0.5],
            );

            return (
              <motion.div
                key={project.id}
                ref={itemRef}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.7 }}
                viewport={{ once: true, margin: "0px 0px -100px" }}
                className="group rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
              >
                {/* Image with Parallax */}
                <motion.div
                  className="overflow-hidden h-60 relative"
                  style={{ y: y }}
                >
                  <motion.img
                    src={project.image}
                    alt={project.title}
                    style={{ opacity }}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                  />
                </motion.div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold">{project.title}</h3>

                  <div className="flex flex-wrap gap-2 mt-4">
                    {project.tech.map((item, i) => (
                      <span
                        key={i}
                        className="text-xs px-3 py-1 rounded-full bg-black/10"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
