"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { journeyData } from "@data";
import { CONTACT_MY_PIC } from "@/assets/img";
import { handleCardMouseMove } from "@/utils";
import { SectionHeading } from "@/components";

export default function Journey() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });
  const spotlightOpacity = useTransform(
    scrollYProgress,
    [0, 0.08, 0.92, 1],
    [0, 1, 1, 0],
  );

  return (
    <section id="journey" ref={containerRef} className="relative isolate">
      {/* Background spotlight */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 flex items-center justify-center"
        style={{ opacity: spotlightOpacity }}
      >
        <div className="relative h-[min(26rem,88vw)] w-[min(26rem,88vw)]">
          <div
            className="absolute inset-[-18%] rounded-full blur-3xl"
            style={{
              background:
                "radial-gradient(circle, color-mix(in srgb, var(--accent-solid) 36%, transparent) 0%, color-mix(in srgb, var(--accent-soft) 18%, transparent) 34%, transparent 70%)",
              opacity: 0.72,
            }}
          />

          <div
            className="absolute inset-0 overflow-hidden rounded-full"
            style={{
              maskImage:
                "radial-gradient(circle, black 0%, black 42%, rgba(0, 0, 0, 0.62) 58%, transparent 76%)",
              WebkitMaskImage:
                "radial-gradient(circle, black 0%, black 42%, rgba(0, 0, 0, 0.62) 58%, transparent 76%)",
            }}
          >
            <Image
              src={CONTACT_MY_PIC}
              alt=""
              fill
              className="object-cover opacity-45"
              style={{
                filter: "brightness(0.42) contrast(1.08) saturate(0.9) blur(0.5px)",
              }}
              aria-hidden="true"
            />
          </div>

          <div
            className="absolute inset-0 rounded-full"
            style={{
              background:
                "radial-gradient(circle at 50% 42%, transparent 0%, transparent 34%, rgba(0, 0, 0, 0.72) 74%)",
            }}
          />
        </div>
      </motion.div>

      <div className="container-sm relative z-10">
        <SectionHeading>My Journey</SectionHeading>

        <div className="relative mt-16">
          <div className="absolute left-4 md:left-1/2 top-0 h-full w-0.5 md:-translate-x-1/2 transform bg-gradient-to-b from-[var(--accent-solid)] via-[var(--accent-soft)] to-transparent" />

          <div className="flex flex-col gap-12">
            {journeyData.map((item, index) => {
              const isLeft = index % 2 === 0;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className={`flex items-center w-full ${
                    isLeft ? "md:justify-start" : "md:justify-end"
                  }`}
                >
                  <div
                    onMouseMove={handleCardMouseMove}
                    className="card-sm w-[calc(100%-2rem)] ml-8 md:ml-0 md:w-[45%] 4xl:w-[42%]"
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
                            &bull;
                          </span>
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div
                    className="absolute left-4 md:left-1/2 h-3 w-3 md:h-4 md:w-4 -translate-x-1/2 transform rounded-full bg-[var(--accent-solid)] border-[3px] md:border-4 border-[var(--bg)]"
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
