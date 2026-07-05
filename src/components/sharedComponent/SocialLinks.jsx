"use client";

import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { GITHUB_URL, LINKEDIN_URL } from "@/constants";
import { getGmailComposeLink } from "@/utils";

/**
 * Reusable SocialLinks component.
 * @param {object} props
 * @param {string} props.className - Extra CSS classes for the container.
 * @param {string} props.itemClassName - Extra CSS classes for each link item.
 * @param {number} props.iconSize - Icon size in px. Default is 18.
 */
export default function SocialLinks({
  className = "",
  itemClassName = "",
  iconSize = 18,
}) {
  const gmailComposeLink = getGmailComposeLink();

  const links = [
    {
      href: GITHUB_URL,
      icon: FaGithub,
      label: "GitHub",
    },
    {
      href: LINKEDIN_URL,
      icon: FaLinkedinIn,
      label: "LinkedIn",
    },
    {
      href: gmailComposeLink,
      icon: MdEmail,
      label: "Email",
    },
  ];

  return (
    <div className={`flex gap-4 ${className}`}>
      {links.map(({ href, icon: Icon, label }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={`rounded-full border transition-all ${itemClassName}`}
          style={{
            background: "var(--glass)",
            borderColor: "var(--border)",
          }}
          aria-label={label}
        >
          <Icon size={iconSize} />
        </a>
      ))}
    </div>
  );
}
