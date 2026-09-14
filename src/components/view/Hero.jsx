"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@material-tailwind/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  FiCode,
  FiDownload,
  FiFileText,
  FiGrid,
  FiMail,
  FiMaximize2,
  FiTarget,
  FiX,
  FiZap,
} from "react-icons/fi";
import { HiMiniSparkles } from "react-icons/hi2";
import { HERO_MY_PIC } from "@/assets/img";
import { handleCardMouseMove } from "@/utils";
import { ReusableDialog } from "@/components";

const valueCards = [
  {
    icon: <FiZap size={22} />,
    title: "Performance",
    text: "Cut bundle sizes and optimized runtime execution. Delivered 65% faster render cycles.",
  },
  {
    icon: <FiGrid size={22} />,
    title: "Architecture",
    text: "Designed scalable frontend state machines. Maintained zero downtime across compliance workflows.",
  },
  {
    icon: <FiTarget size={22} />,
    title: "Team Delivery",
    text: "Shipped reusable component libraries. Reduced development cycle times by 35%.",
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
  const [isResumePreviewOpen, setIsResumePreviewOpen] = useState(false);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const resumePath = "/Somyaranjan_Sethy_Resume.pdf";

  const contentY = useTransform(scrollYProgress, [0, 1], [0, 130]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.92], [1, 0.22]);
  const auraY = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const cardY = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const cardRotate = useTransform(scrollYProgress, [0, 1], [-2, 4]);

  const effectiveCardY = isCoarsePointer ? 0 : cardY;
  const effectiveCardRotate = isCoarsePointer ? 0 : cardRotate;

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

  const heroGridBreakpointClass = isCoarsePointer
    ? "xl:grid-cols-[1.1fr_0.9fr]"
    : "lg:grid-cols-[1.1fr_0.9fr]";

  return (
    <>
      <motion.section
        ref={heroRef}
        onMouseMove={handleCardMouseMove}
        id="home"
        className="section-wrap pt-18 pb-12 sm:pt-20 sm:pb-16 md:py-20 relative min-h-svh overflow-hidden md:min-h-screen 3xl:min-h-[72rem] 4xl:min-h-[78rem] 5xl:min-h-[84rem]"
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
          className={`relative grid container-lg items-center gap-10 pt-2 md:gap-12 md:pt-6 ${heroGridBreakpointClass}`}
        >
          {/* ── Left Column ── */}
          <div>
            {/* Premium badge + dot grid row */}
            <div className="flex items-center gap-3 sm:gap-5 mb-5 sm:mb-7">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="tilt-text hero-eyebrow flex items-center gap-2 text-[0.68rem] sm:text-xs"
                style={{ transform: "rotate(-1.5deg)" }}
              >
                <HiMiniSparkles
                  size={14}
                  aria-hidden
                  style={{ color: "var(--accent-solid)" }}
                />
                <span className="min-w-0">Frontend Full Stack Ai Engineer</span>
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
              className="hero-name flex flex-col gap-6 sm:gap-6 md:gap-7 lg:gap-8 3xl:gap-10 4xl:gap-14 text-[clamp(1.5rem,7vw,2.25rem)] sm:text-3xl md:text-6xl lg:text-[50px] 3xl:text-[70px] !leading-[1.1] sm:!leading-[1.15]"
              style={{
                fontFamily: "var(--font-hero), cursive",
                fontWeight: 400,
                letterSpacing: "0.02em",
              }}
            >
              <span className="block tracking-normal whitespace-nowrap">Somyaranjan</span>
              <span className="block tracking-normal whitespace-nowrap">Sethy</span>
            </motion.h1>

            {/* Tech stack subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12, duration: 0.6 }}
              className="mt-6 sm:mt-8 md:mt-10 text-xs font-semibold tracking-wide sm:text-sm md:text-base 3xl:text-lg 4xl:text-xl"
              style={{ color: "var(--accent-solid)" }}
            >
              Frontend Full Stack Ai Engineer &bull; React &bull; Next.js &bull;
              TypeScript &bull; Node.js
            </motion.p>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.16, duration: 0.68 }}
              className="mt-3.5 sm:mt-5 max-w-xl text-xs leading-relaxed text-(--muted) sm:text-sm md:text-base 3xl:max-w-2xl"
            >
              I build frontend systems for high-traffic web applications. Production
              stacks include React, Next.js, TypeScript, and Node.js.
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.65 }}
              className="mt-7 sm:mt-9 grid grid-cols-2 gap-2.5 sm:flex sm:flex-row sm:items-center sm:gap-4 3xl:mt-12 3xl:gap-5 4xl:mt-14 4xl:gap-6"
            >
              <Button
                type="button"
                size="lg"
                onClick={() => setIsResumePreviewOpen(true)}
                className="w-full sm:w-auto rounded-full px-3 py-2.5 sm:px-8 sm:py-3 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.12em] sm:tracking-[0.22em] 3xl:px-10 3xl:py-4 3xl:text-sm 4xl:px-12 4xl:text-base cursor-pointer hover:shadow-lg hover:shadow-[var(--accent-soft)]/20 flex items-center justify-center gap-1.5 sm:gap-2 whitespace-nowrap"
                style={{
                  background: "var(--accent)",
                  color: "var(--accent-contrast)",
                }}
              >
                <FiFileText size={14} aria-hidden />
                View Resume
              </Button>

              <Link href="#contact" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  variant="outlined"
                  className="w-full sm:w-auto rounded-full border px-3 py-2.5 sm:px-8 sm:py-3 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.12em] sm:tracking-[0.2em] 3xl:px-10 3xl:py-4 3xl:text-sm 4xl:px-12 4xl:text-base cursor-pointer hover:bg-slate-500/5 flex items-center justify-center gap-1.5 sm:gap-2 whitespace-nowrap"
                  style={{ borderColor: "var(--border)", color: "var(--text)" }}
                >
                  <FiMail size={13} aria-hidden />
                  Contact Me
                </Button>
              </Link>
            </motion.div>

            {/* ── Value Prop Cards ── */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.7 }}
              className="mt-8 sm:mt-10 grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-2.5 md:gap-3 3xl:mt-14 3xl:gap-4 4xl:gap-5"
            >
              {valueCards.map((card, index) => (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.55 + index * 0.1, duration: 0.5 }}
                  onMouseMove={handleCardMouseMove}
                  className="card-sm !p-3.5 sm:!p-3 md:!p-3.5 lg:!p-3 xl:!p-4 3xl:!p-6 flex flex-row sm:flex-col items-start gap-3 sm:gap-0"
                >
                  <div
                    className="shrink-0 flex h-8 w-8 sm:h-8 sm:w-8 md:h-9 md:w-9 sm:mb-2.5 items-center justify-center rounded-lg sm:rounded-xl 3xl:h-11 3xl:w-11 4xl:h-12 4xl:w-12"
                    style={{
                      background:
                        "color-mix(in srgb, var(--accent-solid) 12%, transparent)",
                      color: "var(--accent-solid)",
                    }}
                  >
                    {card.icon}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-xs sm:text-xs font-bold md:text-[0.88rem] xl:text-[0.92rem] 3xl:text-base 4xl:text-lg">
                      {card.title}
                    </h3>
                    <p className="mt-0.5 sm:mt-1 text-[11px] sm:text-[11px] md:text-xs leading-relaxed text-(--muted) 3xl:text-sm 4xl:text-base">
                      {card.text}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* ── Right Column — Photo + Floating Badge ── */}
          <motion.div
            style={{ y: effectiveCardY, rotate: effectiveCardRotate }}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.78 }}
            className="relative mx-auto w-full max-w-md sm:max-w-lg lg:max-w-full xl:max-w-[34rem] 2xl:max-w-[38rem] self-center overflow-visible"
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
              className="card-base rounded-4xl p-3 hover:shadow-3xl hover:border-[var(--accent-soft)]/30 duration-500"
            >
              <Image
                src={HERO_MY_PIC}
                alt="Somyaranjan Sethy - AI Frontend Developer and React engineer"
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
                className="glass-panel flex-center gap-3 rounded-2xl px-4 py-3 shadow-xl sm:px-5 sm:py-3.5 3xl:px-6 3xl:py-4"
                style={{ background: "var(--glass)" }}
              >
                <div
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg 3xl:h-10 3xl:w-10"
                  style={{
                    background:
                      "color-mix(in srgb, var(--accent-solid) 15%, transparent)",
                    color: "var(--accent-solid)",
                  }}
                >
                  <FiCode size={16} aria-hidden />
                </div>
                <p
                  className="text-xs font-medium leading-snug sm:text-sm 3xl:text-base"
                  style={{ color: "var(--text)" }}
                >
                  Shipping production code
                  <br />
                  daily.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.section>

      <ReusableDialog
        open={isResumePreviewOpen}
        onClose={() => setIsResumePreviewOpen(false)}
        title="Resume Preview"
        description="Preview and download my latest resume."
        headerActions={
          <>
            <a
              href={resumePath}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] transition-all duration-300 hover:bg-slate-500/10"
              style={{ borderColor: "var(--border)", color: "var(--text)" }}
              aria-label="View resume in full screen"
            >
              <FiMaximize2 size={14} aria-hidden />
              Full Screen
            </a>

            <a
              href={resumePath}
              download
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] transition-all duration-300 hover:opacity-90"
              style={{
                background: "var(--accent)",
                color: "var(--accent-contrast)",
              }}
              aria-label="Download resume"
            >
              <FiDownload size={14} aria-hidden />
              Download
            </a>
          </>
        }
      >
        <iframe src={resumePath} title="Resume preview" className="h-full w-full" />
      </ReusableDialog>
    </>
  );
}
