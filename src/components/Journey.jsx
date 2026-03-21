"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const journeyData = [
  {
    year: "Oct 2024 – Present",
    title: "Consultant",
    company: "Mercedes-Benz R&D India",
    companySecondary: (
      <>
        <div className="flex flex-col gap-1 mt-2 ml-0 text-xs">
          <div className="flex items-center justify-between gap-3">
            <p className="font-medium text-black/80">Capgemini</p>
            <span className="text-black/50 whitespace-nowrap">
              Jan 2026 – Present
            </span>
          </div>
          <div className="flex items-center justify-between gap-3">
            <p className="font-medium text-black/80">
              Allegis Services (India) Pvt. Ltd
            </p>
            <span className="text-black/50 whitespace-nowrap">
              Oct 2024 - Jan 2026
            </span>
          </div>
        </div>
      </>
    ),
    clientHighlight: true,
    achievements: [
      "Developing a global Access Management app for enterprise security.",
      "Building responsive UIs and integrating complex APIs.",
      "Optimizing performance to meet high stakeholder standards.",
    ],
  },
  {
    year: "March 2024 – Sep 2024",
    title: "Software Developer",
    company: "TechneAl Pvt. Ltd",
    achievements: [
      "Boosted system performance by 51% using code splitting and multithreading.",
      "Speeded up development cycles by 40% through better API coordination.",
      "Mentored junior developers to increase team productivity.",
    ],
  },
  {
    year: "Dec 2021 – Feb 2024",
    title: "React.js Developer",
    company: "SoluLab Pvt. Ltd",
    achievements: [
      "Launched healthcare and NFT platforms, improving client-side speed by 45%.",
      "Achieved perfect Lighthouse scores for SEO and Accessibility.",
      "Worked on scalable real estate and headless CMS projects.",
    ],
  },
];

export default function Journey() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  return (
    <section id="journey" className="py-24 px-6" ref={containerRef}>
      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center"
        >
          My Journey
        </motion.h2>

        <div className="relative mt-16">
          {/* Vertical Line */}
          <div className="absolute left-1/2 top-0 w-[2px] h-full bg-black/10 transform -translate-x-1/2" />

          {/* Items */}
          <div className="flex flex-col gap-12">
            {journeyData.map((item, index) => {
              const isLeft = index % 2 === 0;
              const itemRef = useRef(null);
              const { scrollYProgress: itemProgress } = useScroll({
                target: itemRef,
                offset: ["start center", "end center"],
              });
              const x = useTransform(
                itemProgress,
                [0, 1],
                [isLeft ? -50 : 50, 0],
              );
              const opacity = useTransform(
                itemProgress,
                [0, 0.5, 1],
                [0, 1, 1],
              );

              return (
                <motion.div
                  key={index}
                  ref={itemRef}
                  initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  style={{ x, opacity }}
                  className={`flex items-center w-full ${
                    isLeft ? "justify-start" : "justify-end"
                  }`}
                >
                  {/* Card */}
                  <div
                    className="w-full md:w-[45%] p-6 rounded-2xl shadow-md"
                    style={{
                      background: "rgba(0,0,0,0.03)",
                    }}
                  >
                    <p className="text-sm opacity-60 font-medium">
                      {item.year}
                    </p>

                    <h3 className="text-xl font-semibold mt-2">{item.title}</h3>

                    <p className="text-sm mt-1 opacity-70 font-medium flex flex-wrap items-center gap-2">
                      {item.clientHighlight ? (
                        <>
                          <span>{item.company}</span>
                          <span className="bg-blue-500 text-white px-2.5 py-1 rounded-full text-xs font-semibold flex-shrink-0">
                            Client
                          </span>
                          <span className="ml-1">{item.companySecondary}</span>
                        </>
                      ) : (
                        item.company
                      )}
                    </p>

                    <ul className="mt-4 space-y-2">
                      {item.achievements.map((achievement, idx) => (
                        <li key={idx} className="text-sm opacity-80 flex gap-2">
                          <span className="text-blue-500 flex-shrink-0">•</span>
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-black" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
