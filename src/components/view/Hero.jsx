"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@material-tailwind/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function Hero() {
  const heroRef = useRef(null);
  const [isCoarsePointer, setIsCoarsePointer] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const contentY = useTransform(scrollYProgress, [0, 1], [0, 130]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.92], [1, 0.22]);
  const auraY = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const cardY = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const cardRotate = useTransform(scrollYProgress, [0, 1], [-2, 4]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(hover: none), (pointer: coarse)");
    const updatePointerType = () => {
      setIsCoarsePointer(mediaQuery.matches);
    };

    updatePointerType();
    mediaQuery.addEventListener("change", updatePointerType);

    return () => {
      mediaQuery.removeEventListener("change", updatePointerType);
    };
  }, []);

  const handleMouseMove = (e) => {
    if (isCoarsePointer) return;
    const { clientX, clientY } = e;
    const moveX = (clientX - window.innerWidth / 2) / 32;
    const moveY = (clientY - window.innerHeight / 2) / 32;
    setMousePos({ x: moveX, y: moveY });
  };

  const heroGridBreakpointClass = isCoarsePointer
    ? "xl:grid-cols-[1.05fr_0.95fr]"
    : "lg:grid-cols-[1.05fr_0.95fr]";
  const heroHeadingBreakpointClass = isCoarsePointer ? "xl:text-8xl" : "lg:text-8xl";
  const dividerSpanBreakpointClass = isCoarsePointer ? "xl:col-span-2" : "lg:col-span-2";

  return (
    <motion.section
      ref={heroRef}
      onMouseMove={handleMouseMove}
      id="home"
      className="section-wrap relative min-h-svh overflow-hidden  md:min-h-screen 3xl:min-h-[72rem] 4xl:min-h-[78rem] 5xl:min-h-[84rem]"
    >
      {/* Background Grid Pattern inside Hero */}
      <div
        className="absolute inset-0 -z-10 pointer-events-none opacity-[0.03] dark:opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--text) 1px, transparent 1px), linear-gradient(to bottom, var(--text) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <motion.div
        aria-hidden
        style={{
          y: auraY,
          x: mousePos.x,
          translateY: mousePos.y,
        }}
        className="pointer-events-none absolute left-1/2 top-8 h-120 w-2xl -translate-x-1/2 rounded-full blur-3xl transition-transform duration-300 ease-out"
      >
        <div
          className="h-full w-full rounded-full"
          style={{
            background:
              "radial-gradient(circle at center, color-mix(in srgb, var(--accent-soft) 40%, transparent), color-mix(in srgb, var(--accent-solid) 12%, transparent) 56%, transparent 78%)",
          }}
        />
      </motion.div>

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className={`relative mx-auto grid max-w-7xl items-center gap-10 pt-2 md:gap-12 md:pt-6 ${heroGridBreakpointClass} 3xl:max-w-[90vw] 3xl:gap-20 4xl:max-w-[91vw] 4xl:gap-28 5xl:max-w-[92vw]`}
      >
        <div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{ rotate: -2 }}
            className="tilt-text"
          >
            Frontend Product Engineer
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.78 }}
            className={`section-title mt-6 text-5xl font-semibold leading-[0.9] md:text-7xl ${heroHeadingBreakpointClass} 3xl:text-[clamp(7rem,7vw,10rem)] 4xl:text-[clamp(8rem,7.5vw,11rem)] 5xl:text-[clamp(9rem,8vw,12rem)]`}
          >
            Premium
            <br />
            <span className="bg-gradient-to-r from-[var(--accent-solid)] via-[var(--accent-soft)] to-[var(--success)] bg-clip-text text-transparent">
              Web Presence
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.16, duration: 0.68 }}
            className="mt-8 max-w-xl text-sm leading-relaxed text-(--muted) md:text-base 3xl:max-w-[44rem] 3xl:text-xl 4xl:max-w-[52rem] 4xl:text-2xl 5xl:max-w-[60rem] 5xl:text-[1.75rem]"
          >
            I build launch-quality React and Next.js experiences inspired by top product
            sites, with fluid motion, parallax storytelling, and a clean architecture that
            scales.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.65 }}
            className="mt-10 flex flex-wrap items-center gap-4 3xl:mt-12 3xl:gap-5 4xl:mt-14 4xl:gap-6"
          >
            <Button
              size="lg"
              className="rounded-full px-8 py-3 text-xs font-semibold uppercase tracking-[0.22em] 3xl:px-10 3xl:py-4 3xl:text-sm 4xl:px-12 4xl:text-base cursor-pointer hover:shadow-lg hover:shadow-[var(--accent-soft)]/20"
              style={{
                background: "var(--accent)",
                color: "var(--accent-contrast)",
              }}
            >
              View Projects
            </Button>

            <Button
              size="lg"
              variant="outlined"
              className="rounded-full border px-8 py-3 text-xs font-semibold uppercase tracking-[0.2em] 3xl:px-10 3xl:py-4 3xl:text-sm 4xl:px-12 4xl:text-base cursor-pointer hover:bg-slate-500/5"
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
          className="relative mx-auto w-full max-w-lg 3xl:max-w-[34rem] 4xl:max-w-[42rem] 5xl:max-w-[48rem]"
        >
          <div
            className="absolute -left-8 top-10 h-24 w-24 rounded-full blur-2xl"
            style={{
              background:
                "radial-gradient(circle, color-mix(in srgb, var(--accent-soft) 52%, transparent), transparent 70%)",
            }}
          />
          <div
            className="absolute -right-4 bottom-10 h-20 w-20 rounded-full blur-2xl"
            style={{
              background:
                "radial-gradient(circle, color-mix(in srgb, var(--accent-solid) 42%, transparent), transparent 70%)",
            }}
          />

          <div className="glass-panel rounded-4xl p-3 hover:-translate-y-1 hover:shadow-3xl hover:border-[var(--accent-soft)]/30 duration-500">
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
          className={`h-px w-full bg-linear-to-r from-transparent via-(--border) to-transparent ${dividerSpanBreakpointClass}`}
        />
      </motion.div>

      {/* Mouse scroll effect indicator */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.6 }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-1.5 cursor-pointer z-40"
        onClick={() => {
          document.getElementById("showcase")?.scrollIntoView({ behavior: "smooth" });
        }}
      >
        <span className="text-[9px] uppercase tracking-[0.25em] opacity-50">
          Scroll Down
        </span>
        <div className="w-5 h-8 border-2 border-[var(--text)] rounded-full flex justify-center p-1 opacity-50">
          <motion.div
            animate={{
              y: [0, 8, 0],
            }}
            transition={{
              duration: 1.6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-1 h-1 bg-[var(--text)] rounded-full"
          />
        </div>
      </motion.div>
    </motion.section>
  );
}
