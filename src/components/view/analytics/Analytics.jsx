"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { analyticsData } from "@data";

const projectsByCompany = analyticsData.reduce((acc, companyRecord) => {
  acc[companyRecord.company] = companyRecord;
  return acc;
}, {});

const maxProjects = Math.max(
  ...analyticsData.map((companyRecord) => companyRecord.project.length),
);

const candleColors = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
];

const chartData = analyticsData.map((companyRecord) => {
  const candleData = {
    company: companyRecord.company,
    projectCount: companyRecord.project.length,
    duration: companyRecord.year,
  };

  for (let i = 0; i < maxProjects; i += 1) {
    candleData[`p${i + 1}`] = companyRecord.project[i] ? 1 : null;
  }

  return candleData;
});

function CustomTooltip({ active, payload, label, colors }) {
  if (!active || !payload?.length) {
    return null;
  }

  const companyRecord = projectsByCompany[label];
  const totalProjects = companyRecord?.project.length ?? 0;
  const duration = companyRecord?.year;
  const role = companyRecord?.role;
  const experienceHighlights = companyRecord?.experienceHighlights ?? [];
  const companyProjects = companyRecord?.project ?? [];

  return (
    <div
      className="w-[min(90vw,22rem)] wrap-break-word rounded-xl border px-4 py-3 text-sm shadow-xl backdrop-blur"
      style={{
        background: "var(--glass)",
        borderColor: "var(--border)",
        color: "var(--text)",
      }}
    >
      <p className="font-semibold">{label}</p>
      <p className="mt-1 font-medium opacity-90">Project count: {totalProjects}</p>
      {duration ? <p className="opacity-85">Duration: {duration}</p> : null}
      {role ? <p className="opacity-85">Role: {role}</p> : null}

      {experienceHighlights.length > 0 ? (
        <div className="mt-3 border-t pt-3" style={{ borderColor: "var(--border)" }}>
          <p className="text-xs font-semibold opacity-90">Experience Highlights</p>
          <ul className="mt-1 list-disc space-y-0.5 pl-4 text-xs opacity-80">
            {experienceHighlights.slice(0, 3).map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </div>
      ) : null}

      {companyProjects.length > 0 ? (
        <div
          className="mt-3 space-y-2 border-t pt-3"
          style={{ borderColor: "var(--border)" }}
        >
          {companyProjects.map((project, index) => (
            <div key={project.name} className="space-y-1">
              <div className="flex items-center gap-2">
                <span
                  className="inline-block h-2 w-2 rounded-full"
                  style={{
                    backgroundColor: colors[index % colors.length],
                  }}
                />
                <p className="font-medium opacity-95">{project.name}</p>
              </div>
              <p className="text-xs opacity-80">{project.description}</p>
              {project.achievements?.length ? (
                <ul className="list-disc space-y-0.5 pl-4 text-xs opacity-70">
                  {project.achievements.slice(0, 2).map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : null}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default function Analytics() {
  const containerRef = useRef(null);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const mediaQuery = window.matchMedia("(max-width: 767px)");

    const updateScreen = () => {
      setIsSmallScreen(mediaQuery.matches);
    };

    updateScreen();
    mediaQuery.addEventListener("change", updateScreen);

    return () => mediaQuery.removeEventListener("change", updateScreen);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const chartY = useTransform(scrollYProgress, [0, 1], [70, -70]);
  const chartOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.6, 1, 0.6]);

  return (
    <section id="analytics" className="section-wrap overflow-x-hidden" ref={containerRef}>
      <div className="mx-auto max-w-6xl 3xl:max-w-[86vw] 4xl:max-w-[88vw] 5xl:max-w-[90vw]">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center text-3xl font-bold md:text-4xl 3xl:text-6xl 4xl:text-7xl 5xl:text-[5.5rem]"
        >
          Growth Analytics
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
          viewport={{ once: true }}
          className="mt-3 text-center text-sm opacity-80 md:text-base"
        >
          Each company has one candle, split into color sections based on total projects.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            y: chartY,
            opacity: chartOpacity,
            borderColor: "var(--border)",
            background:
              "linear-gradient(135deg, color-mix(in srgb, var(--accent-solid) 20%, transparent), color-mix(in srgb, var(--accent-soft) 18%, transparent), color-mix(in srgb, var(--bg) 72%, transparent))",
          }}
          transition={{ duration: 0.7 }}
          className="mt-16 rounded-2xl border p-6 shadow-2xl md:p-8"
        >
          <div className="mb-5 flex flex-wrap items-center justify-between gap-2">
            <h3 className="text-lg font-semibold md:text-xl">
              Company Delivery Distribution
            </h3>
            <span className="text-xs opacity-80 md:text-sm">
              X: Company | Y: Project count
            </span>
          </div>

          <div className="relative w-full h-[350px] md:h-[400px] 3xl:h-[500px] 4xl:h-[600px] 5xl:h-[700px]">
            {mounted ? (
              <ResponsiveContainer width="100%" height={isSmallScreen ? 350 : 400}>
                <BarChart
                  data={chartData}
                  margin={{
                    top: 16,
                    right: isSmallScreen ? 4 : 10,
                    left: isSmallScreen ? -8 : 0,
                    bottom: isSmallScreen ? 2 : 8,
                  }}
                  barCategoryGap={isSmallScreen ? "35%" : "45%"}
                  barGap={2}
                >
                  <defs>
                    {candleColors.map((color, idx) => (
                      <linearGradient
                        key={idx}
                        id={`colorP${idx + 1}`}
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop offset="0%" stopColor={color} stopOpacity={0.95} />
                        <stop offset="100%" stopColor={color} stopOpacity={0.25} />
                      </linearGradient>
                    ))}
                  </defs>
                  <CartesianGrid
                    strokeDasharray="4 4"
                    stroke="var(--border)"
                    strokeOpacity={0.5}
                  />
                  <XAxis
                    dataKey="company"
                    interval={isSmallScreen ? "preserveStartEnd" : 0}
                    tick={{
                      fill: "currentColor",
                      fontSize: isSmallScreen ? 10 : 11,
                    }}
                    tickFormatter={(value) => {
                      const normalized = value.replace(" Pvt. Ltd", "");
                      if (!isSmallScreen) {
                        return normalized;
                      }
                      const compact = normalized
                        .replace("Mercedes-Benz Research & Development India", "MBRDI")
                        .replace("TechneAI", "TechneAI")
                        .replace("SoluLab", "SoluLab");
                      return compact;
                    }}
                  />
                  <YAxis
                    allowDecimals={false}
                    width={isSmallScreen ? 26 : 32}
                    tick={{
                      fill: "currentColor",
                      fontSize: isSmallScreen ? 10 : 12,
                    }}
                  />
                  <Tooltip
                    content={<CustomTooltip colors={candleColors} />}
                    cursor={{
                      fill: "color-mix(in srgb, var(--accent-soft) 8%, transparent)",
                    }}
                    wrapperStyle={{ zIndex: 50 }}
                  />

                  {Array.from({ length: maxProjects }, (_, index) => {
                    const key = `p${index + 1}`;
                    return (
                      <Bar
                        key={key}
                        dataKey={key}
                        name={`Project ${index + 1}`}
                        stackId="projects"
                        fill={`url(#colorP${(index % candleColors.length) + 1})`}
                        barSize={isSmallScreen ? 26 : 34}
                        maxBarSize={isSmallScreen ? 30 : 38}
                      >
                        {chartData.map((entry) => {
                          const isTopSegment =
                            entry[key] && index === entry.projectCount - 1;
                          return (
                            <Cell
                              key={`${entry.company}-${key}`}
                              radius={isTopSegment ? [10, 10, 0, 0] : [0, 0, 0, 0]}
                            />
                          );
                        })}
                      </Bar>
                    );
                  })}
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="w-full h-full rounded-xl bg-slate-800/10 dark:bg-slate-200/5 animate-pulse" />
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
