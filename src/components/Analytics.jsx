"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const data = [
  { year: "2021", projects: 2, impact: 0 },
  { year: "2022", projects: 5, impact: 25 },
  { year: "2023", projects: 10, impact: 41 },
  { year: "2024", projects: 18, impact: 49 },
];

// Project breakdown
const projectsData = [
  {
    name: "Access Management Web App",
    company: "Mercedes-Benz R&D",
    impact: "65% Performance boost",
    tech: "React.js, Git submodules",
    year: 2021,
  },
  {
    name: "E-Commerce Platform",
    company: "TechneAl",
    impact: "51% Speed improvement",
    tech: "React.js, Webpack",
    year: 2022,
  },
  {
    name: "Ticketing SaaS",
    company: "SoluLab",
    impact: "25% Dev time reduction",
    tech: "React.js, Redux",
    year: 2023,
  },
  {
    name: "SL Lab Headless CMS",
    company: "SoluLab",
    impact: "15% Faster page loads + 40% user growth",
    tech: "React.js, Google Analytics",
    year: 2023,
  },
  {
    name: "Mighty Jaxx NFT Trading",
    company: "SoluLab",
    impact: "40% Trading volume increase",
    tech: "React.js, Blockchain",
    year: 2024,
  },
  {
    name: "Etabibo Healthcare",
    company: "SoluLab",
    impact: "30% Booking increase + 35% Prescription growth",
    tech: "React.js, Formik",
    year: 2024,
  },
];

export default function Analytics() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const chartY = useTransform(scrollYProgress, [0, 1], [70, -70]);
  const chartOpacity = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0.6, 1, 0.6],
  );

  return (
    <section id="analytics" className="py-24 px-6" ref={containerRef}>
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center"
        >
          Growth Analytics 📈
        </motion.h2>

        {/* Chart Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ y: chartY, opacity: chartOpacity }}
          transition={{ duration: 0.7 }}
          className="mt-16 p-6 rounded-2xl"
          // style={{
          //   background: "rgba(0,0,0,0.03)",
          // }}
        >
          <div className="w-full h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <XAxis dataKey="year" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />

                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="projects"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  dot={{ r: 5 }}
                  name="Projects Completed"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="impact"
                  stroke="#10b981"
                  strokeWidth={3}
                  dot={{ r: 5 }}
                  name="Avg Impact %"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
