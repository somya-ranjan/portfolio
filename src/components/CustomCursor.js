"use client";

import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hoverType, setHoverType] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      if (!target) return;

      const interactive = target.closest("a, button, [role='button'], input, textarea, .glass-panel, .glow-card, iframe");
      if (interactive) {
        if (
          interactive.tagName === "A" ||
          interactive.tagName === "BUTTON" ||
          interactive.getAttribute("role") === "button"
        ) {
          setHoverType("link");
        } else {
          setHoverType("card");
        }
      } else {
        setHoverType(null);
      }
    };

    window.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  const cursorStyles = {
    link: {
      width: "56px",
      height: "56px",
      transform: `translate(${pos.x - 28}px, ${pos.y - 28}px)`,
      background: "color-mix(in srgb, var(--accent-soft) 24%, transparent)",
      borderColor: "var(--accent-soft)",
      boxShadow: "0 0 20px color-mix(in srgb, var(--accent-soft) 30%, transparent)",
    },
    card: {
      width: "42px",
      height: "42px",
      transform: `translate(${pos.x - 21}px, ${pos.y - 21}px)`,
      background: "color-mix(in srgb, var(--text) 8%, transparent)",
      borderColor: "var(--border)",
      boxShadow: "none",
    },
    default: {
      width: "28px",
      height: "28px",
      transform: `translate(${pos.x - 14}px, ${pos.y - 14}px)`,
      background: "transparent",
      borderColor: "var(--border)",
      boxShadow: "none",
    },
  };

  const currentStyle = cursorStyles[hoverType] || cursorStyles.default;

  return (
    <div
      className="pointer-events-none fixed left-0 top-0 z-9999 hidden rounded-full border transition-all duration-300 ease-out lg:block"
      style={{
        transform: currentStyle.transform,
        width: currentStyle.width,
        height: currentStyle.height,
        background: currentStyle.background,
        borderColor: currentStyle.borderColor,
        boxShadow: currentStyle.boxShadow,
        backdropFilter: hoverType === "link" ? "none" : "blur(4px)",
        WebkitBackdropFilter: hoverType === "link" ? "none" : "blur(4px)",
      }}
    />
  );
}
