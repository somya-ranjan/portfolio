"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@material-tailwind/react";

export default function Hero() {
  const { scrollY } = useScroll();

  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0.3]);

  return (
    <section
      style={{ y, opacity }}
      id="home"
      className="min-h-screen flex items-center justify-center text-center px-6 bg-linear-to-b from-transparent to-black/5 dark:to-white/5"
    >
      <div className="max-w-3xl">
        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-bold leading-tight"
        >
          Building Modern <br />
          Web Experiences 🚀
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-6 text-lg opacity-80"
        >
          I design and develop high-performance web applications using React,
          Next.js, and modern UI technologies.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-8 flex justify-center gap-4 flex-wrap"
        >
          <Button size="lg" className="rounded-full">
            View Projects
          </Button>

          <Button size="lg" variant="outlined" className="rounded-full">
            Contact Me
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
