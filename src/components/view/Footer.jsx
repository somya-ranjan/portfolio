"use client";

import { LOGO_TEXT } from "@/constants";
import { SocialLinks } from "@/components";

export default function Footer() {
  return (
    <footer
      className="border-t px-6 py-3 3xl:px-10 4xl:px-16 5xl:px-24"
      style={{ borderColor: "var(--border)" }}
    >
      <div className="container-lg flex flex-col items-center justify-between gap-6 md:flex-row">
        {/* Left */}
        <h2 className="logo-text text-2xl">{LOGO_TEXT}</h2>

        {/* Center */}
        <p className="text-sm opacity-70 text-center">
          © {new Date().getFullYear()} All rights reserved.
        </p>

        {/* Right - Social */}
        <SocialLinks itemClassName="p-2" iconSize={18} />
      </div>
    </footer>
  );
}
