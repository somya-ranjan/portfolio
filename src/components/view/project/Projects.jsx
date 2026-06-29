"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { FiExternalLink, FiGithub, FiMaximize2, FiX } from "react-icons/fi";
import { Dialog } from "@material-tailwind/react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";

import { useTheme } from "@/context/ThemeContext";
import { projects } from "@data";

const BLOCKED_IFRAME_HOSTS = new Set(["npmjs.com", "www.npmjs.com"]);

function canUseExternalIframe(url) {
  if (!url) {
    return false;
  }

  try {
    const parsedUrl = new URL(url);
    const isHttp = parsedUrl.protocol === "http:" || parsedUrl.protocol === "https:";

    if (!isHttp) {
      return false;
    }

    return !BLOCKED_IFRAME_HOSTS.has(parsedUrl.hostname);
  } catch {
    return false;
  }
}

function getProjectPreviewDoc(project, theme) {
  const imageSrc =
    typeof project.image === "string" ? project.image : project.image?.src || "";
  const isMinimal = theme === "minimal";
  const isDark = theme === "dark";
  const palette = isMinimal
    ? {
        text: "#101010",
        muted: "#444444",
        accent: "#111111",
        chip: "#222222",
        border: "rgba(16,16,16,0.26)",
        surface: "#ffffff",
        buttonText: "#f7f7f7",
        buttonGradient: "linear-gradient(120deg,#0f0f0f,#2b2b2b 50%,#565656)",
        bg: "radial-gradient(circle at top left, rgba(0,0,0,0.06), transparent 28%),radial-gradient(circle at bottom right, rgba(0,0,0,0.07), transparent 32%),linear-gradient(160deg,#f0f0f0 0%,#fafafa 100%)",
      }
    : isDark
      ? {
          text: "#e0e0e0",
          muted: "#b0b8c6",
          accent: "#7dd3fc",
          chip: "#c8d0de",
          border: "rgba(224,224,224,0.18)",
          surface: "#242424",
          buttonText: "#062133",
          buttonGradient: "linear-gradient(120deg,#1f7ea4,#2d9ccc 50%,#38bdf8)",
          bg: "radial-gradient(circle at top left, rgba(56,189,248,0.2), transparent 28%),radial-gradient(circle at bottom right, rgba(14,165,233,0.16), transparent 32%),linear-gradient(160deg,#121212 0%,#1e1e1e 100%)",
        }
      : {
          text: "#1f2937",
          muted: "#4b5563",
          accent: "#0284c7",
          chip: "#374151",
          border: "rgba(31,41,55,0.14)",
          surface: "#ffffff",
          buttonText: "#f8fbff",
          buttonGradient: "linear-gradient(120deg,#0284c7,#0ea5e9 52%,#38bdf8)",
          bg: "radial-gradient(circle at top left, rgba(56,189,248,0.2), transparent 28%),radial-gradient(circle at bottom right, rgba(2,132,199,0.16), transparent 32%),linear-gradient(160deg,#f8f9fa 0%,#ffffff 100%)",
        };

  const techBadges = project.tech
    .map(
      (item) =>
        `<span style="display:inline-flex;border:1px solid ${palette.border};border-radius:999px;padding:8px 12px;font-size:11px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:${palette.chip};">${item}</span>`,
    )
    .join("");
  const liveLink = project.link.liveLink
    ? `<a href="${project.link.liveLink}" target="_blank" rel="noreferrer" style="display:inline-flex;align-items:center;justify-content:center;padding:14px 18px;border-radius:999px;background:${palette.buttonGradient};color:${palette.buttonText};text-decoration:none;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;font-size:12px;">Open Live</a>`
    : "";
  const gitHubLink = project.link.gitHub
    ? `<a href="${project.link.gitHub}" target="_blank" rel="noreferrer" style="display:inline-flex;align-items:center;justify-content:center;padding:14px 18px;border-radius:999px;border:1px solid ${palette.border};color:${palette.text};text-decoration:none;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;font-size:12px;">Open GitHub</a>`
    : "";

  return `
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>${project.title} Preview</title>
      </head>
      <body style="margin:0;font-family:Segoe UI,sans-serif;background:${palette.bg};color:${palette.text};min-height:100vh;${isMinimal ? "filter:grayscale(100%);" : ""}">
        <main style="display:grid;grid-template-columns:1.1fr 0.9fr;gap:32px;align-items:center;min-height:100vh;padding:32px;box-sizing:border-box;">
          <section style="position:relative;min-height:340px;border-radius:28px;overflow:hidden;border:1px solid ${palette.border};background:${palette.surface};box-shadow:0 18px 40px rgba(0,0,0,0.28);">
            <img src="${imageSrc}" alt="${project.title}" style="width:100%;height:100%;object-fit:cover;display:block;" />
          </section>
          <section>
            ${project.company ? `<span style="font-size:11px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;opacity:0.6;display:block;margin-bottom:8px;">${project.company}</span>` : ""}
            <h1 style="margin:0 0 16px;font-size:32px;font-weight:700;letter-spacing:-0.02em;">${project.title}</h1>
            <p style="margin:0 0 24px;font-size:15px;line-height:1.75;opacity:0.8;">${project.description}</p>
            <h2 style="margin:0 0 12px;font-size:13px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;opacity:0.65;">Tech Stack</h2>
            <div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:32px;">${techBadges}</div>
            <div style="display:flex;flex-wrap:wrap;gap:12px;">
              ${liveLink}
              ${gitHubLink}
            </div>
          </section>
        </main>
      </body>
    </html>
  `;
}

function ProjectAction({ href, icon: Icon, label, disabled, onClick }) {
  if (disabled) {
    return null;
  }

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition-all duration-300 hover:bg-slate-500/10"
        style={{ color: "var(--text)" }}
      >
        <Icon className="text-sm" />
        {label}
      </button>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition-all duration-300 hover:bg-slate-500/10"
      style={{ color: "var(--text)" }}
    >
      <Icon className="text-sm" />
      {label}
    </a>
  );
}

function ProjectCard({ project, index, onPreview }) {
  const itemRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: itemRef,
    offset: ["start center", "end center"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [16, -16]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.9]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.08, 1]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-0.6, 0.6]);

  const handleMouseMove = (e) => {
    const card = itemRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const yVal = e.clientY - rect.top;
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${yVal}px`);
  };

  return (
    <motion.div
      ref={itemRef}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -10, scale: 1.01 }}
      transition={{ duration: 0.72 }}
      viewport={{ once: true, margin: "0px 0px -100px" }}
      className="glass-panel glow-card group overflow-hidden rounded-3xl h-full flex flex-col"
    >
      <motion.div
        className="relative h-56 overflow-hidden md:h-60 lg:h-64 shrink-0"
        style={{ background: "var(--bg-soft)" }}
      >
        <motion.div
          className="absolute inset-0 transition duration-700 group-hover:scale-[1.08] group-hover:-rotate-1"
          style={{ y, opacity, scale, rotate }}
        >
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </motion.div>
      </motion.div>

      <div className="p-6 flex flex-col flex-1 justify-between">
        <div>
          <div className="flex items-start justify-between gap-4">
            <div>
              {project.company && (
                <span className="text-xs uppercase tracking-[0.14em] opacity-60 block mb-1">
                  {project.company}
                </span>
              )}
              <h3 className="display-title text-2xl font-semibold leading-tight">
                {project.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.metrics && (
                  <span
                    className="mt-3 inline-flex rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em]"
                    style={{
                      background:
                        "color-mix(in srgb, var(--accent-soft) 16%, transparent)",
                      color: "var(--accent-soft)",
                    }}
                  >
                    {project.metrics}
                  </span>
                )}
                {project.isComingSoon ? (
                  <span
                    className="mt-3 inline-flex rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em]"
                    style={{
                      background: "color-mix(in srgb, var(--success) 16%, transparent)",
                      color: "var(--success)",
                    }}
                  >
                    Coming Soon
                  </span>
                ) : null}
              </div>
            </div>
          </div>

          {/* Truncated Description with Hover Tooltip */}
          <div className="relative group/desc mt-4">
            <p
              className="text-sm leading-7 line-clamp-3 cursor-help"
              style={{ color: "var(--muted)" }}
            >
              {project.description}
            </p>

            {/* Elegant Glass Tooltip */}
            <div className="absolute left-0 bottom-full mb-3 w-full z-30 opacity-0 pointer-events-none group-hover/desc:opacity-100 group-hover/desc:pointer-events-auto transition-all duration-300 transform translate-y-2 group-hover/desc:translate-y-0">
              <div
                className="glass-panel p-4 rounded-2xl text-xs md:text-sm leading-relaxed border shadow-2xl backdrop-blur-xl"
                style={{
                  borderColor: "var(--border)",
                  background: "var(--bg-soft)",
                  color: "var(--text)",
                }}
              >
                {project.description}
              </div>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {project.tech.map((item) => (
              <span
                key={item}
                className="rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-widest"
                style={{
                  border: "1px solid var(--border)",
                  color: "var(--muted-strong)",
                  background: "color-mix(in srgb, var(--surface) 88%, transparent)",
                }}
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <ProjectAction
            href={project.link.liveLink}
            icon={FiExternalLink}
            label="Live Link"
            disabled={!project.link.liveLink}
          />
          <ProjectAction
            href={project.link.gitHub}
            icon={FiGithub}
            label="GitHub"
            disabled={!project.link.gitHub}
          />
          <ProjectAction
            icon={FiMaximize2}
            label="Preview"
            onClick={() => onPreview(project)}
          />
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const { theme } = useTheme();
  const [activeProject, setActiveProject] = useState(null);
  const [iframeFailed, setIframeFailed] = useState(false);
  const [activeTab, setActiveTab] = useState("corporate");
  const closeButtonRef = useRef(null);

  const handleFilterMouseMove = (event) => {
    const card = event.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  };

  const openPreview = (project) => {
    setIframeFailed(false);
    setActiveProject(project);
  };

  const closeModal = () => setActiveProject(null);

  useEffect(() => {
    if (!activeProject) {
      return undefined;
    }

    requestAnimationFrame(() => {
      closeButtonRef.current?.focus();
    });

    return undefined;
  }, [activeProject]);

  const shouldUseExternalIframe =
    canUseExternalIframe(activeProject?.link?.iFrame) && !iframeFailed;

  const filteredProjects = projects.filter((project) => project.category === activeTab);

  return (
    <>
      <section id="projects" className="section-wrap">
        <div className="mx-auto max-w-7xl 3xl:max-w-[90vw] 4xl:max-w-[91vw] 5xl:max-w-[92vw]">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="section-title section-heading section-heading-lg"
          >
            Projects
          </motion.h2>

          {/* Category Tabs */}
          <div className="mt-8 flex justify-center">
            <div
              onMouseMove={handleFilterMouseMove}
              className="glass-panel glow-card p-1.5 rounded-full flex gap-1 relative border"
              style={{ borderColor: "var(--border)" }}
            >
              {/* Tab: Corporate */}
              <motion.button
                type="button"
                onClick={() => setActiveTab("corporate")}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                className={`group relative px-6 py-2.5 rounded-full text-xs md:text-sm font-semibold tracking-wider uppercase transition-all duration-300 z-10 cursor-pointer ${
                  activeTab === "corporate"
                    ? "text-[var(--bg)]"
                    : "text-[var(--text)] opacity-75 hover:opacity-100"
                }`}
              >
                {activeTab !== "corporate" ? (
                  <span className="absolute inset-0 -z-10 rounded-full bg-[var(--text)]/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                ) : null}
                {activeTab === "corporate" && (
                  <motion.div
                    layoutId="activeTabIndicator"
                    className="absolute inset-0 bg-[var(--text)] rounded-full -z-10 shadow-lg"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                Corporate Projects
              </motion.button>

              {/* Tab: Personal */}
              <motion.button
                type="button"
                onClick={() => setActiveTab("personal")}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                className={`group relative px-6 py-2.5 rounded-full text-xs md:text-sm font-semibold tracking-wider uppercase transition-all duration-300 z-10 cursor-pointer ${
                  activeTab === "personal"
                    ? "text-[var(--bg)]"
                    : "text-[var(--text)] opacity-75 hover:opacity-100"
                }`}
              >
                {activeTab !== "personal" ? (
                  <span className="absolute inset-0 -z-10 rounded-full bg-[var(--text)]/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                ) : null}
                {activeTab === "personal" && (
                  <motion.div
                    layoutId="activeTabIndicator"
                    className="absolute inset-0 bg-[var(--text)] rounded-full -z-10 shadow-lg"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                Personal Projects
              </motion.button>
            </div>
          </div>

          {/* Projects Grid */}
          <motion.div layout className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="h-full"
                >
                  <ProjectCard project={project} index={index} onPreview={openPreview} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      <Dialog
        open={Boolean(activeProject)}
        handler={closeModal}
        size="xxl"
        className="bg-transparent p-2 shadow-none transition-colors md:p-6"
      >
        {activeProject ? (
          <div
            className="glass-panel relative mx-auto flex h-[85vh] w-full max-w-6xl flex-col overflow-hidden rounded-4xl 3xl:max-w-[90vw] 4xl:max-w-[91vw] 5xl:max-w-[92vw]"
            style={{ color: "var(--text)" }}
          >
            <div className="flex items-center justify-between gap-4 px-5 py-4">
              <div>
                <h3 className="display-title text-2xl font-semibold">
                  {activeProject.title}
                </h3>
                <p className="mt-1 text-sm" style={{ color: "var(--muted)" }}>
                  {shouldUseExternalIframe
                    ? "Interactive project preview"
                    : "Iframe preview with project fallback"}
                </p>
              </div>

              <button
                ref={closeButtonRef}
                type="button"
                onClick={closeModal}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full"
                style={{ color: "var(--text)" }}
                aria-label="Close project preview"
              >
                <FiX className="text-lg" />
              </button>
            </div>

            <div className="relative flex-1" style={{ background: "var(--bg-soft)" }}>
              {shouldUseExternalIframe ? (
                <iframe
                  src={activeProject.link.iFrame}
                  title={`${activeProject.title} preview`}
                  className="h-full w-full"
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  onError={() => setIframeFailed(true)}
                />
              ) : (
                <iframe
                  srcDoc={getProjectPreviewDoc(activeProject, theme)}
                  title={`${activeProject.title} preview fallback`}
                  className="h-full w-full"
                />
              )}
            </div>
          </div>
        ) : null}
      </Dialog>
    </>
  );
}
