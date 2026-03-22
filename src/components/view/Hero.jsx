"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@material-tailwind/react";
import Image from "next/image";
import { useRef } from "react";

export default function Hero() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const contentY = useTransform(scrollYProgress, [0, 1], [0, 130]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.92], [1, 0.22]);
  const auraY = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const cardY = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const cardRotate = useTransform(scrollYProgress, [0, 1], [-2, 4]);

  return (
    <motion.section
      ref={heroRef}
      id="home"
      className="relative min-h-svh overflow-hidden px-6 pb-12 pt-24 md:min-h-screen md:pb-20 md:pt-36"
    >
      <motion.div
        aria-hidden
        style={{ y: auraY }}
        className="pointer-events-none absolute left-1/2 top-8 h-120 w-2xl -translate-x-1/2 rounded-full blur-3xl"
      >
        <div className="h-full w-full rounded-full bg-[radial-gradient(circle_at_center,rgba(93,135,255,0.35),rgba(0,205,188,0.1)_56%,transparent_78%)]" />
      </motion.div>

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative mx-auto grid max-w-7xl items-center gap-10 pt-2 md:gap-12 md:pt-6 lg:grid-cols-[1.05fr_0.95fr]"
      >
        <div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-xs font-semibold uppercase tracking-[0.38em] text-(--muted)"
          >
            Frontend Product Engineer
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.78 }}
            className="section-title mt-6 text-5xl font-semibold leading-[0.9] md:text-8xl"
          >
            Premium
            <br />
            Web Presence
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.16, duration: 0.68 }}
            className="mt-8 max-w-xl text-sm leading-relaxed text-(--muted) md:text-base"
          >
            I build launch-quality React and Next.js experiences inspired by top
            product sites, with fluid motion, parallax storytelling, and a clean
            architecture that scales.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.65 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Button
              size="lg"
              className="rounded-full px-8 py-3 text-xs font-semibold uppercase tracking-[0.22em]"
              style={{ background: "var(--accent)", color: "#081220" }}
            >
              View Projects
            </Button>

            <Button
              size="lg"
              variant="outlined"
              className="rounded-full border px-8 py-3 text-xs font-semibold uppercase tracking-[0.2em]"
              style={{ borderColor: "var(--border)", color: "var(--text)" }}
            >
              Contact Me
            </Button>
          </motion.div>
        </div>

        <motion.div
          style={{ y: cardY, rotate: cardRotate }}
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.78 }}
          className="relative mx-auto w-full max-w-lg"
        >
          <div className="absolute -left-8 top-10 h-24 w-24 rounded-full bg-[radial-gradient(circle,rgba(93,135,255,0.42),transparent_70%)] blur-2xl" />
          <div className="absolute -right-4 bottom-10 h-20 w-20 rounded-full bg-[radial-gradient(circle,rgba(0,203,184,0.38),transparent_70%)] blur-2xl" />

          <div className="glass-panel rounded-4xl p-3">
            <Image
              src="/demo-showcase.svg"
              alt="Demo visual for hero section"
              width={960}
              height={1200}
              className="w-full rounded-[1.6rem]"
            />
          </div>
          <p className="mt-4 text-center text-xs uppercase tracking-[0.2em] text-(--muted)">
            Replace with your personal photo anytime
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.54, duration: 0.8 }}
          className="h-px w-full bg-linear-to-r from-transparent via-(--border) to-transparent lg:col-span-2"
        />
      </motion.div>
    </motion.section>
  );
}
