"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";
import { testimonials } from "@data";

function TestimonialCard({ item, index }) {
  const cardRef = useRef(null);
  const [imageSrc, setImageSrc] = useState(item.image || "/globe.svg");
  const linkedinUrl = item.linkedin
    ? item.linkedin.startsWith("http")
      ? item.linkedin
      : `https://${item.linkedin}`
    : null;

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
      initial={{ opacity: 0, x: index % 2 === 0 ? 16 : -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.015, duration: 0.28, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.25 }}
      style={{
        opacity: dissolveOpacity,
        scale: dissolveScale,
        rotateY: cubeRotateY,
        rotateX: cubeRotateX,
        z: cubeDepth,
        transformPerspective: 1200,
        transformStyle: "preserve-3d",
      }}
      className="glass-panel relative overflow-hidden rounded-3xl border p-5 md:p-6"
    >
      <div
        className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, color-mix(in srgb, var(--accent-soft) 24%, transparent), transparent 70%)",
        }}
      />

      <div className="relative z-10">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <Image
              src={imageSrc}
              alt={item.name}
              width={52}
              height={52}
              unoptimized
              onError={() => setImageSrc("/globe.svg")}
              className="h-12 w-12 rounded-full border object-cover"
            />

            <div>
              <h4 className="display-title text-lg leading-none md:text-xl">
                {item.name}
              </h4>
              <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.14em] opacity-80 md:text-[11px]">
                {item.role}
              </p>
            </div>
          </div>

          <span className="rounded-full border px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.18em] opacity-70 md:px-3 md:text-[10px]">
            Verified
          </span>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2 md:mt-5">
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

        <p className="mt-4 whitespace-pre-line text-sm leading-relaxed opacity-95 md:mt-5">
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
    <section
      id="testimonials"
      className="relative px-6 py-20 md:py-24 3xl:px-10 4xl:px-16 5xl:px-24"
    >
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

      <div className="mx-auto max-w-6xl 3xl:max-w-[86vw] 4xl:max-w-[88vw] 5xl:max-w-[90vw]">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="section-title section-heading section-heading-sm"
        >
          Testimonials
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="mx-auto mt-4 max-w-3xl text-center text-sm leading-relaxed opacity-75 md:mt-5 md:text-base"
        >
          Real recommendations from teammates and collaborators across projects, product
          deliveries, and frontend engineering engagements.
        </motion.p>
      </div>

      <div className="mx-auto mt-8 grid max-w-6xl gap-6 pb-10 md:grid-cols-2 md:gap-8 3xl:max-w-[86vw] 3xl:gap-10 4xl:max-w-[88vw] 4xl:grid-cols-3 4xl:gap-12 5xl:max-w-[90vw]">
        {testimonials.map((item, index) => (
          <div key={item.id} className="py-1">
            <div className="w-full">
              <TestimonialCard item={item} index={index} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
