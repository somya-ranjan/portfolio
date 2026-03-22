"use client";

import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

export default function Footer() {
  return (
    <footer className="px-6 py-10 mt-20 border-t border-black/10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left */}
        <h2 className="text-lg font-semibold">DevPortfolio</h2>

        {/* Center */}
        <p className="text-sm opacity-70 text-center">
          © {new Date().getFullYear()} All rights reserved.
        </p>

        {/* Right - Social */}
        <div className="flex gap-4">
          <a
            href="https://github.com/yourusername"
            target="_blank"
            rel="noreferrer"
            className="p-2 rounded-full"
            style={{ background: "rgba(0,0,0,0.08)" }}
            aria-label="GitHub"
          >
            <FaGithub size={18} />
          </a>

          <a
            href="https://linkedin.com/in/yourusername"
            target="_blank"
            rel="noreferrer"
            className="p-2 rounded-full"
            style={{ background: "rgba(0,0,0,0.08)" }}
            aria-label="LinkedIn"
          >
            <FaLinkedinIn size={18} />
          </a>

          <a
            href="mailto:youremail@gmail.com"
            className="p-2 rounded-full"
            style={{ background: "rgba(0,0,0,0.08)" }}
            aria-label="Email"
          >
            <MdEmail size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
}
