"use client";

import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { LOGO_TEXT, GITHUB_URL, LINKEDIN_URL, CONTACT_EMAIL } from "@/constants";

export default function Footer() {
  const composeParams = new URLSearchParams({
    view: "cm",
    fs: "1",
    to: CONTACT_EMAIL,
    su: "[Coming From Portfolio]",
  });
  const gmailComposeLink = `https://mail.google.com/mail/?${composeParams.toString()}`;

  return (
    <footer
      className="border-t px-6 py-3 3xl:px-10 4xl:px-16 5xl:px-24"
      style={{ borderColor: "var(--border)" }}
    >
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 md:flex-row 3xl:max-w-[90vw] 4xl:max-w-[91vw] 5xl:max-w-[92vw]">
        {/* Left */}
        <h2 className="logo-text text-2xl">{LOGO_TEXT}</h2>

        {/* Center */}
        <p className="text-sm opacity-70 text-center">
          © {new Date().getFullYear()} All rights reserved.
        </p>

        {/* Right - Social */}
        <div className="flex gap-4">
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border p-2"
            style={{
              background: "var(--glass)",
              borderColor: "var(--border)",
            }}
            aria-label="GitHub"
          >
            <FaGithub size={18} />
          </a>

          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border p-2"
            style={{
              background: "var(--glass)",
              borderColor: "var(--border)",
            }}
            aria-label="LinkedIn"
          >
            <FaLinkedinIn size={18} />
          </a>

          <a
            href={gmailComposeLink}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border p-2"
            style={{
              background: "var(--glass)",
              borderColor: "var(--border)",
            }}
            aria-label="Email"
          >
            <MdEmail size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
}
