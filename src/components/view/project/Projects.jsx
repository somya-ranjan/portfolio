"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { FiExternalLink, FiGithub, FiMaximize2, FiX } from "react-icons/fi";
import { Dialog } from "@material-tailwind/react";
import { motion, useScroll, useTransform } from "framer-motion";

import { useTheme } from "@/context/ThemeContext";
import { projects } from "@data";

const BLOCKED_IFRAME_HOSTS = new Set(["npmjs.com", "www.npmjs.com"]);

function canUseExternalIframe(url) {
  if (!url) {
    return false;
  }

  try {
    const parsedUrl = new URL(url);
    const isHttp =
      parsedUrl.protocol === "http:" || parsedUrl.protocol === "https:";

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
    typeof project.image === "string"
      ? project.image
      : project.image?.src || "";
  const isDark = theme === "dark";
  const palette = isDark
    ? {
        text: "#eef4ff",
        muted: "#c1d0f1",
        accent: "#8db7ff",
        chip: "#d8e2ff",
        border: "rgba(255,255,255,0.14)",
        surface: "#0d1628",
        buttonText: "#08111f",
        bg: "radial-gradient(circle at top left, rgba(93,135,255,0.28), transparent 28%),radial-gradient(circle at bottom right, rgba(0,203,184,0.22), transparent 32%),linear-gradient(160deg,#0a1120 0%,#141f35 100%)",
      }
    : {
        text: "#1a2438",
        muted: "#3e4d68",
        accent: "#2e6ef2",
        chip: "#334764",
        border: "rgba(16,21,34,0.16)",
        surface: "#f7faff",
        buttonText: "#ffffff",
        bg: "radial-gradient(circle at top left, rgba(93,135,255,0.18), transparent 28%),radial-gradient(circle at bottom right, rgba(0,203,184,0.16), transparent 32%),linear-gradient(160deg,#edf3ff 0%,#dfe8f4 100%)",
      };

  const techBadges = project.tech
    .map(
      (item) =>
        `<span style="display:inline-flex;border:1px solid ${palette.border};border-radius:999px;padding:8px 12px;font-size:11px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:${palette.chip};">${item}</span>`,
    )
    .join("");
  const liveLink = project.link.liveLink
    ? `<a href="${project.link.liveLink}" target="_blank" rel="noreferrer" style="display:inline-flex;align-items:center;justify-content:center;padding:14px 18px;border-radius:999px;background:linear-gradient(120deg,#5d87ff,#00cbb8);color:${palette.buttonText};text-decoration:none;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;font-size:12px;">Open Live</a>`
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
      <body style="margin:0;font-family:Segoe UI,sans-serif;background:${palette.bg};color:${palette.text};min-height:100vh;">
        <main style="display:grid;grid-template-columns:1.1fr 0.9fr;gap:32px;align-items:center;min-height:100vh;padding:32px;box-sizing:border-box;">
          <section style="position:relative;min-height:340px;border-radius:28px;overflow:hidden;border:1px solid ${palette.border};background:${palette.surface};box-shadow:0 18px 40px rgba(0,0,0,0.28);">
            <img src="${imageSrc}" alt="${project.title}" style="width:100%;height:100%;object-fit:cover;display:block;" />
          </section>
          <section>
            <p style="margin:0 0 10px;font-size:12px;font-weight:700;letter-spacing:0.28em;text-transform:uppercase;color:${palette.accent};">Iframe Preview</p>
            <h1 style="margin:0;font-family:Georgia,serif;font-size:clamp(2rem,4vw,3.5rem);line-height:0.95;">${project.title}</h1>
            <p style="margin:22px 0 0;font-size:16px;line-height:1.8;color:${palette.muted};">This link cannot be embedded by the remote site, so this fallback is still shown inside an iframe.</p>
            <p style="margin:18px 0 0;font-size:15px;line-height:1.9;color:${palette.text};">${project.description}</p>
            <div style="display:flex;flex-wrap:wrap;gap:10px;margin-top:24px;">${techBadges}</div>
            <div style="display:flex;flex-wrap:wrap;gap:12px;margin-top:28px;">${liveLink}${gitHubLink}</div>
          </section>
        </main>
      </body>
    </html>
  `;
}

function ProjectAction({ href, icon: Icon, label, disabled, onClick }) {
  const baseClassName =
    "inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em]";

  if (disabled) {
    return (
      <span
        className={`${baseClassName} cursor-not-allowed opacity-45`}
        style={{ color: "var(--muted)" }}
      >
        <Icon className="text-sm" />
        {label}
      </span>
    );
  }

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={baseClassName}
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
      rel="noreferrer"
      className={baseClassName}
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

  return (
    <motion.div
      ref={itemRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -10, scale: 1.01 }}
      transition={{ delay: index * 0.16, duration: 0.72 }}
      viewport={{ once: true, margin: "0px 0px -100px" }}
      className="glass-panel group overflow-hidden rounded-3xl"
    >
      <motion.div
        className="relative h-72 overflow-hidden md:h-80 lg:h-96"
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
            className="object-contain"
          />
        </motion.div>
      </motion.div>

      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="display-title text-2xl font-semibold leading-tight">
              {project.title}
            </h3>
            {project.isComingSoon ? (
              <span
                className="mt-3 inline-flex rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em]"
                style={{
                  background: "rgba(16, 185, 129, 0.14)",
                  color: "#10b981",
                }}
              >
                Coming Soon
              </span>
            ) : null}
          </div>
        </div>

        <p className="mt-4 text-sm leading-7" style={{ color: "var(--muted)" }}>
          {project.description}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {project.tech.map((item) => (
            <span
              key={item}
              className="rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-widest"
            >
              {item}
            </span>
          ))}
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
  const closeButtonRef = useRef(null);

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

  useEffect(() => {
    if (activeProject) setIframeFailed(false);
  }, [activeProject]);

  const shouldUseExternalIframe =
    canUseExternalIframe(activeProject?.link?.iFrame) && !iframeFailed;

  return (
    <>
      <section id="projects" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="section-title text-center text-4xl font-semibold md:text-6xl"
          >
            Projects
          </motion.h2>

          <div className="mt-16 grid gap-10 md:grid-cols-2">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                onPreview={setActiveProject}
              />
            ))}
          </div>
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
            className="glass-panel relative mx-auto flex h-[85vh] w-full max-w-6xl flex-col overflow-hidden rounded-4xl"
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

            <div
              className="relative flex-1"
              style={{ background: "var(--bg-soft)" }}
            >
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
