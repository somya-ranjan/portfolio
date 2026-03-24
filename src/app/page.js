"use client";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

import {
  Navbar,
  Hero,
  Projects,
  Skills,
  Journey,
  Testimonials,
  ContactMe,
  Footer,
} from "@/components/view";

import { ShowcaseParallax, CustomCursor, ScrollProgress, Reveal } from "@/components";

const Analytics = dynamic(() => import("@/components/view/analytics/Analytics"), {
  ssr: false,
});

export default function Home() {
  return (
    <>
      <CustomCursor />
      <ScrollProgress />

      <Navbar />
      <Hero />
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
    </>
  );
}
