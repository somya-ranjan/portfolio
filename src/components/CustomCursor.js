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
      className="pointer-events-none fixed left-0 top-0 z-9999 hidden h-7 w-7 rounded-full border transition-transform duration-75 lg:block"
      style={{
        transform: `translate(${pos.x - 14}px, ${pos.y - 14}px)`,
        background: "rgba(255,255,255,0.06)",
        borderColor: "var(--border)",
        backdropFilter: "blur(5px)",
      }}
    />
  );
}
