"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@material-tailwind/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const valueCards = [
  {
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
    title: "Performance First",
    text: "Fast, scalable interfaces built for real users.",
  },
  {
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="3" width="7" height="7" />
        <rect x="14" y="3" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" />
      </svg>
    ),
    title: "Pixel Precision",
    text: "Clean UI systems crafted with attention to detail.",
  },
  {
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="6" />
        <circle cx="12" cy="12" r="2" />
      </svg>
    ),
    title: "Product Thinking",
    text: "Design and code aligned with business goals.",
  },
];

/* Small decorative dot grid */
function DotGrid() {
  return (
    <div className="hidden md:grid grid-cols-6 gap-[6px] opacity-30" aria-hidden>
      {Array.from({ length: 30 }).map((_, i) => (
        <motion.div
          key={i}
          className="h-[5px] w-[5px] rounded-full"
          style={{ background: "var(--accent-solid)" }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 + i * 0.02, duration: 0.3 }}
        />
      ))}
    </div>
  );
}

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

  const handleCardMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  };

  const heroGridBreakpointClass = isCoarsePointer
    ? "xl:grid-cols-[1.1fr_0.9fr]"
    : "lg:grid-cols-[1.1fr_0.9fr]";
  const heroHeadingBreakpointClass = isCoarsePointer ? "xl:text-8xl" : "lg:text-8xl";

  return (
    <motion.section
      ref={heroRef}
      onMouseMove={handleMouseMove}
      id="home"
      className="section-wrap relative min-h-svh overflow-hidden md:min-h-screen 3xl:min-h-[72rem] 4xl:min-h-[78rem] 5xl:min-h-[84rem]"
    >
      {/* Background Grid Pattern */}
      <div
        className="absolute inset-0 -z-10 pointer-events-none opacity-[0.03] dark:opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--text) 1px, transparent 1px), linear-gradient(to bottom, var(--text) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Floating aura glow */}
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
        className={`relative mx-auto grid max-w-7xl items-start gap-10 pt-2 md:gap-12 md:pt-6 ${heroGridBreakpointClass} 3xl:max-w-[90vw] 3xl:gap-20 4xl:max-w-[91vw] 4xl:gap-28 5xl:max-w-[92vw]`}
      >
        {/* ── Left Column ── */}
        <div>
          {/* Premium badge + dot grid row */}
          <div className="flex items-center gap-5 mb-7">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="tilt-text flex items-center gap-2"
              style={{ transform: "rotate(-1.5deg)" }}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="var(--accent-solid)"
                stroke="none"
              >
                <path d="M12 2l2.09 6.26L20.18 9.27l-5.09 3.9L16.18 20 12 16.77 7.82 20l1.09-6.83L3.82 9.27l6.09-1.01z" />
              </svg>
              <span>Premium Developer Portfolio</span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <DotGrid />
            </motion.div>
          </div>

          {/* Name heading */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.78 }}
            className={`section-title text-5xl font-semibold leading-[0.92] md:text-7xl ${heroHeadingBreakpointClass} 3xl:text-[clamp(7rem,7vw,10rem)] 4xl:text-[clamp(8rem,7.5vw,11rem)] 5xl:text-[clamp(9rem,8vw,12rem)]`}
          >
            Somyaranjan
            <br />
            Sethy
          </motion.h1>

          {/* Tech stack subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12, duration: 0.6 }}
            className="mt-10 text-sm font-semibold tracking-wide md:text-base 3xl:text-lg 4xl:text-xl"
            style={{ color: "var(--accent-solid)" }}
          >
            Ai Frontend Developer &bull; React &bull; Next.js &bull; Product-Focused UI
          </motion.p>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.16, duration: 0.68 }}
            className="mt-5 max-w-xl text-sm leading-relaxed text-(--muted) md:text-base 3xl:max-w-[44rem] 3xl:text-xl 4xl:max-w-[52rem] 4xl:text-2xl 5xl:max-w-[60rem] 5xl:text-[1.75rem]"
          >
            I build modern, motion-rich web experiences with clean architecture,
            thoughtful UX, and premium visual polish.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.65 }}
            className="mt-9 flex flex-wrap items-center gap-4 3xl:mt-12 3xl:gap-5 4xl:mt-14 4xl:gap-6"
          >
            <Link href="#projects">
              <Button
                size="lg"
                className="rounded-full px-8 py-3 text-xs font-semibold uppercase tracking-[0.22em] 3xl:px-10 3xl:py-4 3xl:text-sm 4xl:px-12 4xl:text-base cursor-pointer hover:shadow-lg hover:shadow-[var(--accent-soft)]/20 flex items-center gap-2.5"
                style={{
                  background: "var(--accent)",
                  color: "var(--accent-contrast)",
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
                View Projects
              </Button>
            </Link>

            <Link href="#contact" className="relative inline-flex items-center gap-3">
              <Button
                size="lg"
                variant="outlined"
                className="rounded-full border px-8 py-3 text-xs font-semibold uppercase tracking-[0.2em] 3xl:px-10 3xl:py-4 3xl:text-sm 4xl:px-12 4xl:text-base cursor-pointer hover:bg-slate-500/5 flex items-center gap-2.5"
                style={{ borderColor: "var(--border)", color: "var(--text)" }}
              >
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="M22 7l-10 7L2 7" />
                </svg>
                Contact Me
              </Button>
              <motion.div
                className="hidden items-center gap-2 rounded-full border border-[var(--border)] bg-[rgba(255,255,255,0.08)] px-3 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-(--muted) transition hover:bg-[rgba(255,255,255,0.14)] sm:inline-flex"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.6 }}
              >
                <span className="relative flex h-7 w-7 items-center justify-center rounded-full border border-[var(--border)] bg-[rgba(255,255,255,0.12)]">
                  <motion.span
                    className="absolute h-2 w-2 rounded-full bg-[var(--accent-solid)]"
                    animate={{ y: [0, 6, 0] }}
                    transition={{ duration: 1.4, ease: "easeInOut", repeat: Infinity }}
                  />
                </span>
                Scroll Down
              </motion.div>
            </Link>
          </motion.div>

          {/* ── Value Prop Cards (merged from Showcase) ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.7 }}
            className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-3 3xl:mt-14 3xl:gap-4 4xl:gap-5"
          >
            {valueCards.map((card, index) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55 + index * 0.1, duration: 0.5 }}
                onMouseMove={handleCardMouseMove}
                className="glass-panel glow-card rounded-2xl p-4 hover:shadow-xl hover:border-[var(--accent-soft)]/25 hover:-translate-y-0.5 transition-all duration-300 cursor-default 3xl:p-5 4xl:p-6"
              >
                <div
                  className="mb-2.5 flex h-9 w-9 items-center justify-center rounded-xl 3xl:h-11 3xl:w-11 4xl:h-12 4xl:w-12"
                  style={{
                    background:
                      "color-mix(in srgb, var(--accent-solid) 12%, transparent)",
                    color: "var(--accent-solid)",
                  }}
                >
                  {card.icon}
                </div>
                <h3 className="text-sm font-bold md:text-[0.92rem] 3xl:text-base 4xl:text-lg">
                  {card.title}
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-(--muted) 3xl:text-sm 4xl:text-base">
                  {card.text}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* ── Right Column — Photo + Floating Badge ── */}
        <motion.div
          style={{ y: cardY, rotate: cardRotate }}
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.78 }}
          className="relative mx-auto w-full max-w-lg self-center overflow-visible 3xl:max-w-[34rem] 4xl:max-w-[42rem] 5xl:max-w-[48rem]"
        >
          {/* Ambient glows */}
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

          {/* Main photo */}
          <div
            onMouseMove={handleCardMouseMove}
            className="glass-panel glow-card rounded-4xl p-3 hover:shadow-3xl hover:border-[var(--accent-soft)]/30 duration-500"
          >
            <Image
              src="/hero-my-pic.png"
              alt="Somya Ranjan Sanu — Frontend Developer"
              width={960}
              height={1200}
              priority
              className="w-full rounded-[1.6rem]"
            />
          </div>

          {/* Floating badge overlay */}
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.65, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="absolute bottom-6 left-4 right-4 sm:left-auto sm:right-auto sm:bottom-8 sm:left-6 z-10"
          >
            <div
              className="glass-panel flex items-center gap-3 rounded-2xl px-4 py-3 shadow-xl sm:px-5 sm:py-3.5 3xl:px-6 3xl:py-4"
              style={{ background: "var(--glass)" }}
            >
              <div
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg 3xl:h-10 3xl:w-10"
                style={{
                  background: "color-mix(in srgb, var(--accent-solid) 15%, transparent)",
                  color: "var(--accent-solid)",
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="16 18 22 12 16 6" />
                  <polyline points="8 6 2 12 8 18" />
                </svg>
              </div>
              <p
                className="text-xs font-medium leading-snug sm:text-sm 3xl:text-base"
                style={{ color: "var(--text)" }}
              >
                Building elegant interfaces
                <br />
                that users love.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
