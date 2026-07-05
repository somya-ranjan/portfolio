"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { FiExternalLink, FiGithub, FiMaximize2 } from "react-icons/fi";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";

import { useTheme } from "@/context/ThemeContext";
import { projects } from "@data";
import { handleCardMouseMove, canUseExternalIframe, getProjectPreviewDoc } from "@/utils";
import { ReusableDialog, SectionHeading } from "@/components";

function ProjectAction({ href, icon: Icon, label, disabled, onClick }) {
  if (disabled) {
    return null;
  }

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className="inline-flex items-center gap-2 rounded-lg px-4 py-2 sm:px-5 sm:py-2.5 text-[11px] sm:text-xs font-bold uppercase tracking-wider transition-all duration-300 hover:bg-slate-500/10"
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
      className="inline-flex items-center gap-2 rounded-lg px-4 py-2 sm:px-5 sm:py-2.5 text-[11px] sm:text-xs font-bold uppercase tracking-wider transition-all duration-300 hover:bg-slate-500/10"
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
      onMouseMove={handleCardMouseMove}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -10, scale: 1.01 }}
      transition={{ duration: 0.72 }}
      viewport={{ once: true }}
      className="card-base rounded-3xl h-full flex flex-col"
    >
      <motion.div
        className="img-container-hero rounded-t-3xl"
        style={{ background: "var(--bg-soft)" }}
      >
        <motion.div
          className="absolute inset-0 transition duration-700"
          style={{ y, opacity, scale, rotate }}
          whileHover={{ scale: 1.08, rotate: -1 }}
        >
          <Image
            src={project.image}
            alt={`${project.title} project case study by Somyaranjan Sethy`}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </motion.div>
      </motion.div>

      <div className="p-std flex flex-col flex-1 justify-between">
        <div>
          <div className="flex-between gap-4">
            <div>
              {project.company && (
                <span className="text-caption block mb-1">{project.company}</span>
              )}
              <h3 className="title-lg">{project.title}</h3>
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
              className="text-sm leading-7 line-clamp-3 cursor-help 3xl:text-base 4xl:text-lg"
              style={{ color: "var(--muted)" }}
            >
              {project.description}
            </p>

            {/* Elegant Glass Tooltip */}
            <div className="absolute left-0 bottom-full mb-3 w-full z-30 opacity-0 pointer-events-none group-hover/desc:opacity-100 group-hover/desc:pointer-events-auto transition-all duration-300 transform translate-y-2 group-hover/desc:translate-y-0">
              <div
                className="card-sm rounded-2xl border text-xs md:text-sm shadow-2xl"
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

  const openPreview = (project) => {
    setIframeFailed(false);
    setActiveProject(project);
  };

  const closeModal = () => setActiveProject(null);

  const shouldUseExternalIframe =
    canUseExternalIframe(activeProject?.link?.iFrame) && !iframeFailed;

  const filteredProjects = projects.filter((project) => project.category === activeTab);

  return (
    <>
      <section id="projects">
        <div className="container-lg">
          <SectionHeading>Projects</SectionHeading>

          {/* Category Tabs */}
          <div className="mt-8 flex justify-center">
            <div
              onMouseMove={handleCardMouseMove}
              className="card-base rounded-full p-1.5 flex gap-1 relative"
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
          <motion.div layout className="mt-16 grid-3col">
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

      <ReusableDialog
        open={Boolean(activeProject)}
        onClose={closeModal}
        title={activeProject?.title || "Project Preview"}
        description={
          shouldUseExternalIframe
            ? "Interactive project preview"
            : "Iframe preview with project fallback"
        }
        closeButtonLabel="Close project preview"
      >
        {activeProject ? (
          shouldUseExternalIframe ? (
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
          )
        ) : null}
      </ReusableDialog>
    </>
  );
}
