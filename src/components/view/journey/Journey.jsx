"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll } from "framer-motion";
import { journeyData } from "@data";
import { CONTACT_MY_PIC } from "@/assets/img";

export default function Journey() {
  const containerRef = useRef(null);

  useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const yVal = e.clientY - rect.top;
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${yVal}px`);
  };

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
          {/* Background image shadow */}
          <div className="pointer-events-none absolute inset-x-0 top-0 bottom-0 flex justify-center">
            <div
              className="sticky top-[30vh] h-80 w-80 opacity-25 overflow-hidden rounded-full"
              style={{ zIndex: -10 }}
            >
              <Image
                src={CONTACT_MY_PIC}
                alt=""
                fill
                className="object-cover"
                style={{ filter: "brightness(0.28) saturate(0.85) blur(0.7px)" }}
                aria-hidden="true"
              />
            </div>
          </div>

          <div className="absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 transform bg-gradient-to-b from-[var(--accent-solid)] via-[var(--accent-soft)] to-transparent" />

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
                  <div
                    onMouseMove={handleMouseMove}
                    className="glass-panel glow-card w-full rounded-2xl p-6 shadow-md md:w-[45%] 3xl:p-8 4xl:w-[42%] 4xl:p-10 cursor-default"
                  >
                    <p className="text-sm opacity-60 font-medium">{item.year}</p>

                    <h3 className="text-xl font-semibold mt-2">{item.title}</h3>

                    <div className="text-sm mt-1 opacity-70 font-medium flex flex-wrap items-center gap-2">
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
                    </div>

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

                  <div
                    className="absolute left-1/2 h-4 w-4 -translate-x-1/2 transform rounded-full bg-[var(--accent-solid)] border-4 border-[var(--bg)] hidden md:block"
                    style={{
                      boxShadow:
                        "0 0 0 6px color-mix(in srgb, var(--accent-solid) 15%, transparent)",
                    }}
                  />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
