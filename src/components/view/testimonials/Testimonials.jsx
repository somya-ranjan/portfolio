"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { testimonials } from "@data";
import { handleCardMouseMove } from "@/utils";
import { SectionHeading } from "@/components";

const AVATAR_COLORS = [
  "#e74c3c",
  "#e67e22",
  "#f1c40f",
  "#2ecc71",
  "#1abc9c",
  "#3498db",
  "#9b59b6",
  "#e91e63",
  "#00bcd4",
  "#8bc34a",
  "#ff5722",
  "#607d8b",
];

function getInitials(name) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");
}

function TestimonialCard({ item, index }) {
  const cardRef = useRef(null);
  const [isCoarsePointer, setIsCoarsePointer] = useState(false);
  const linkedinUrl = item.linkedin
    ? item.linkedin.startsWith("http")
      ? item.linkedin
      : `https://${item.linkedin}`
    : null;

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      "(hover: none), (pointer: coarse), (max-width: 768px)",
    );
    const updatePointerType = () => {
      setIsCoarsePointer(mediaQuery.matches);
    };

    updatePointerType();
    mediaQuery.addEventListener("change", updatePointerType);

    return () => {
      mediaQuery.removeEventListener("change", updatePointerType);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  const dissolveOpacity = useTransform(
    scrollYProgress,
    [0, 0.15, 0.5, 0.85, 1],
    [0.82, 1, 1, 0.9, 0.8],
  );
  const dissolveScale = useTransform(
    scrollYProgress,
    [0, 0.15, 0.5, 0.85, 1],
    [0.985, 1, 1, 0.992, 0.985],
  );
  const cubeRotateY = useTransform(scrollYProgress, [0, 0.5, 1], [11, 0, -11]);
  const cubeRotateX = useTransform(scrollYProgress, [0, 0.5, 1], [5, 0, -5]);
  const cubeDepth = useTransform(scrollYProgress, [0, 0.5, 1], [-18, 10, -18]);

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleCardMouseMove}
      initial={{ opacity: 0, x: index % 2 === 0 ? 16 : -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.015, duration: 0.28, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.25 }}
      style={{
        opacity: dissolveOpacity,
        scale: dissolveScale,
        rotateY: isCoarsePointer ? 0 : cubeRotateY,
        rotateX: isCoarsePointer ? 0 : cubeRotateX,
        z: isCoarsePointer ? 0 : cubeDepth,
        transformPerspective: isCoarsePointer ? "none" : 1200,
        transformStyle: isCoarsePointer ? "flat" : "preserve-3d",
      }}
      className="card-md !p-4 sm:!p-6 md:!p-8 border overflow-hidden"
    >
      <div
        className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, color-mix(in srgb, var(--accent-soft) 24%, transparent), transparent 70%)",
        }}
      />

      <div className="relative z-10">
        {/* Mobile top meta bar: Star rating + Verified badge */}
        <div className="flex items-center justify-between gap-2 mb-3 pb-2.5 border-b border-[var(--border)]/40 sm:hidden">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, starIndex) => (
              <span
                key={starIndex}
                className="text-xs leading-none"
                style={{ color: "var(--warning)" }}
              >
                ★
              </span>
            ))}
            <span className="ml-1 text-[9px] font-semibold uppercase tracking-[0.12em] opacity-60">
              Recommendation
            </span>
          </div>
          <span className="shrink-0 rounded-full border border-[var(--border)] px-2 py-0.5 text-[8px] font-bold uppercase tracking-[0.14em] opacity-75">
            Verified
          </span>
        </div>

        {/* Author info */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center sm:items-start gap-3 min-w-0 flex-1">
            <div
              className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-full text-xs sm:text-sm font-bold tracking-wide text-white"
              style={{ background: AVATAR_COLORS[index % AVATAR_COLORS.length] }}
            >
              {getInitials(item.name)}
            </div>

            <div className="min-w-0 flex-1">
              <h4 className="text-sm sm:text-base font-semibold leading-snug font-serif">
                {item.name}
              </h4>
              <p className="mt-0.5 text-[11px] sm:text-xs font-medium uppercase tracking-[0.06em] sm:tracking-[0.14em] opacity-75 leading-tight">
                {item.role}
              </p>
            </div>
          </div>

          <span className="hidden sm:inline-flex shrink-0 rounded-full border px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.18em] opacity-70 md:px-3 md:text-[10px] mt-0.5">
            Verified
          </span>
        </div>

        {/* Desktop stars row */}
        <div className="hidden sm:flex mt-4 flex-wrap items-center gap-2 md:mt-5">
          {[...Array(5)].map((_, starIndex) => (
            <span
              key={starIndex}
              className="text-base leading-none md:text-lg"
              style={{ color: "var(--warning)" }}
            >
              ★
            </span>
          ))}
          <span className="text-[10px] font-semibold uppercase tracking-[0.16em] opacity-60 md:ml-2 md:text-xs md:tracking-[0.18em]">
            LinkedIn Recommendation
          </span>
        </div>

        <p className="mt-4 whitespace-pre-line text-sm leading-relaxed opacity-95 md:mt-5 3xl:text-base 4xl:text-lg">
          &ldquo;{item.review}&rdquo;
        </p>

        <div className="mt-5 md:mt-6">
          {linkedinUrl ? (
            <a
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.12em] opacity-85 hover:opacity-100 md:px-4 md:text-xs md:tracking-[0.14em]"
            >
              View on LinkedIn
              <span aria-hidden="true">↗</span>
            </a>
          ) : (
            <span className="inline-block text-xs font-semibold uppercase tracking-[0.14em] opacity-50">
              LinkedIn URL not available
            </span>
          )}
          <p className="mt-2 text-[11px] uppercase tracking-[0.16em] opacity-45">
            Source: Professional Recommendation
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function Testimonials() {
  return (
    <section id="testimonials" className="relative">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute left-0 top-16 h-44 w-44 rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle, color-mix(in srgb, var(--accent-soft) 22%, transparent), transparent 72%)",
          }}
        />
        <div
          className="absolute bottom-8 right-0 h-52 w-52 rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle, color-mix(in srgb, var(--accent-solid) 18%, transparent), transparent 72%)",
          }}
        />
      </div>

      <div className="container-md">
        <SectionHeading
          subtitle="Peer reviews from engineering managers, team leads, and developers."
          subtitleClassName="mt-4 max-w-3xl leading-relaxed opacity-75 md:mt-5 md:text-base mb-0"
        >
          Testimonials
        </SectionHeading>
      </div>

      <div className="mx-auto mt-8 max-w-6xl columns-1 gap-6 px-0 sm:px-6 pb-10 lg:columns-2 md:gap-8 3xl:columns-3 3xl:max-w-[86vw] 3xl:gap-10 3xl:px-10 4xl:max-w-[88vw] 4xl:gap-12 4xl:px-16 5xl:max-w-[90vw] 5xl:px-24">
        {testimonials.map((item, index) => (
          <div
            key={item.id}
            className={`mb-6 break-inside-avoid py-1 md:mb-8 3xl:mb-10 4xl:mb-12 ${
              index % 5 === 1 ? "md:mt-6" : index % 5 === 3 ? "md:mt-10" : ""
            }`}
          >
            <div className="w-full">
              <TestimonialCard item={item} index={index} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
