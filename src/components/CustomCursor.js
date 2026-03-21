"use client";

import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const move = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 w-6 h-6 rounded-full pointer-events-none z-[9999] transition-transform duration-75"
      style={{
        transform: `translate(${pos.x}px, ${pos.y}px)`,
        background: "var(--text)",
        opacity: 0.2,
      }}
    />
  );
}
