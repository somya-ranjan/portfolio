"use client";

import { LOGO_TEXT, OWNER_NAME } from "@/constants";
import { SocialLinks } from "@/components";

export default function Footer() {
  return (
    <footer
      className="border-t px-6 py-6 md:py-8 3xl:px-10 3xl:py-10 4xl:px-16 5xl:px-24"
      style={{ borderColor: "var(--border)" }}
    >
      <div className="container-lg flex flex-col items-center justify-between gap-6 md:flex-row">
        {/* Left */}
        <a href="#home" className="logo-text text-2xl" aria-label="Back to home">
          {LOGO_TEXT}
        </a>

        {/* Center */}
        <p className="text-sm opacity-70 text-center">
          Copyright {new Date().getFullYear()} {OWNER_NAME}. All rights reserved.
        </p>

        {/* Right - Social */}
        <SocialLinks itemClassName="p-2" iconSize={18} />
      </div>
    </footer>
  );
}
