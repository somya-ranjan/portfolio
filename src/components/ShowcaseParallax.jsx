"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef, useState } from "react";

const cards = [
  {
    title: "Performance First",
    text: "Lighthouse-driven frontends with measurable speed and consistency.",
  },
  {
    title: "Pixel Precision",
    text: "Design systems translated into clean, maintainable React architecture.",
  },
  {
    title: "Product Thinking",
    text: "From prototype to production with a focus on outcomes and UX quality.",
  },
];

function FloatingCard({ item, index, progress }) {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const y = useTransform(progress, [0, 1], [index * 22, -index * 26]);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const yVal = e.clientY - rect.top - rect.height / 2;
    setTilt({
      x: -(yVal / rect.height) * 15,
      y: (x / rect.width) * 15,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <motion.article
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        y,
        rotateX: tilt.x,
        rotateY: tilt.y,
        transformPerspective: 1000,
        transformStyle: "preserve-3d",
      }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -120px" }}
      transition={{
        duration: 0.7,
        delay: index * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="glass-panel rounded-3xl p-6 hover:shadow-2xl hover:border-[var(--accent-soft)]/20 transition-all duration-200"
    >
      <h3 className="display-title text-2xl font-semibold md:text-3xl">{item.title}</h3>
      <p className="mt-3 text-sm leading-relaxed opacity-80 md:text-base">{item.text}</p>
    </motion.article>
  );
}

export default function ShowcaseParallax() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  return (
    <section
      id="showcase"
      ref={sectionRef}
      className="section-wrap relative overflow-hidden"
    >
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center 3xl:max-w-[90vw] 3xl:gap-18 4xl:max-w-[91vw] 4xl:gap-24 5xl:max-w-[92vw]">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <p className="tilt-text opacity-70">Premium Experience</p>
          <h2 className="section-title mt-5 text-4xl font-semibold md:text-5xl lg:text-7xl 3xl:text-[6rem] 4xl:text-[7.25rem] 5xl:text-[8.5rem]">
            Crafted Like
            <br />A Product Launch
          </h2>
          <p className="mt-7 max-w-xl text-sm leading-relaxed opacity-80 md:text-base 3xl:max-w-2xl 3xl:text-lg 4xl:max-w-3xl 4xl:text-xl 5xl:text-2xl">
            A modern, motion-driven layout inspired by flagship product pages. Every block
            is intentionally spaced, animated, and optimized to tell your story with
            clarity.
          </p>

          <div className="mt-10 grid gap-4 md:grid-cols-2 4xl:grid-cols-3 4xl:gap-6">
            {cards.map((item, index) => (
              <FloatingCard
                key={item.title}
                item={item}
                index={index}
                progress={scrollYProgress}
              />
            ))}
          </div>
        </motion.div>

        <motion.div
          className="relative z-20 mx-auto w-full max-w-md 3xl:max-w-[34rem] 4xl:max-w-[42rem] 5xl:max-w-[48rem]"
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div
            className="absolute -left-6 top-3 h-28 w-28 rounded-full blur-2xl md:-left-14 md:h-36 md:w-36 md:blur-3xl"
            style={{
              background:
                "radial-gradient(circle, color-mix(in srgb, var(--accent-soft) 38%, transparent), transparent 70%)",
            }}
          />
          <div
            className="absolute -right-5 bottom-5 h-24 w-24 rounded-full blur-2xl md:-right-10 md:h-28 md:w-28 md:blur-3xl"
            style={{
              background:
                "radial-gradient(circle, color-mix(in srgb, var(--accent-solid) 34%, transparent), transparent 70%)",
            }}
          />

          <div
            className="glass-panel rounded-[2.25rem] border p-3"
            style={{
              borderColor: "var(--border)",
              background: "var(--glass)",
              boxShadow: "0 22px 54px rgba(8, 15, 30, 0.22)",
            }}
          >
            <Image
              src="/demo-showcase.svg"
              alt="Premium section visual"
              width={960}
              height={1200}
              className="h-auto w-full rounded-[1.8rem]"
            />
          </div>

          <p className="mt-4 text-center text-xs uppercase tracking-[0.22em] opacity-65">
            Demo visual - replace with your photo later
          </p>
        </motion.div>
      </div>
    </section>
  );
}
