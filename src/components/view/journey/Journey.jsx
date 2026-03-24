"use client";

import { useRef } from "react";
import { motion, useScroll } from "framer-motion";
import { journeyData } from "@data";

export default function Journey() {
  const containerRef = useRef(null);

  useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  return (
    <section id="journey" className="section-wrap" ref={containerRef}>
      <div className="mx-auto max-w-5xl 3xl:max-w-[82vw] 4xl:max-w-[86vw] 5xl:max-w-[88vw]">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="section-title section-heading section-heading-lg"
        >
          My Journey
        </motion.h2>

        <div className="relative mt-16">
          <div className="absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 transform bg-(--border)" />

          <div className="flex flex-col gap-12">
            {journeyData.map((item, index) => {
              const isLeft = index % 2 === 0;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className={`flex items-center w-full ${
                    isLeft ? "justify-start" : "justify-end"
                  }`}
                >
                  <div className="glass-panel w-full rounded-2xl p-6 shadow-md md:w-[45%] 3xl:p-8 4xl:w-[42%] 4xl:p-10">
                    <p className="text-sm opacity-60 font-medium">{item.year}</p>

                    <h3 className="text-xl font-semibold mt-2">{item.title}</h3>

                    <p className="text-sm mt-1 opacity-70 font-medium flex flex-wrap items-center gap-2">
                      {item.clientHighlight ? (
                        <>
                          <span>{item.company}</span>
                          <span
                            className="rounded-full px-2.5 py-1 text-xs font-semibold shrink-0"
                            style={{
                              background:
                                "color-mix(in srgb, var(--success) 18%, transparent)",
                              color: "var(--success)",
                            }}
                          >
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
                          <span className="shrink-0" style={{ color: "var(--success)" }}>
                            •
                          </span>
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="absolute left-1/2 h-4 w-4 -translate-x-1/2 transform rounded-full bg-(--text)" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
