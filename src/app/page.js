"use client";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

import {
  Navbar,
  Hero,
  About,
  Projects,
  Skills,
  Journey,
  Testimonials,
  ContactMe,
  Footer,
} from "@/components/view";

import { ShowcaseParallax, ScrollProgress, Reveal } from "@/components";

const Analytics = dynamic(() => import("@/components/view/analytics/Analytics"), {
  ssr: false,
});
export default function Home() {
  return (
    <>
      <ScrollProgress />

      <Navbar />
      <main className="theme-content">
        <Hero />
        <Reveal>
          <About />
        </Reveal>
        <ShowcaseParallax />
        <Reveal>
          <Projects />
        </Reveal>
        <Skills />
        <Journey />
        <Analytics />

        <Testimonials />
        <ContactMe />
        <Footer />
      </main>
    </>
  );
}
