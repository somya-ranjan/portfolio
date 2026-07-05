"use client";
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

import { InitialLoader, ScrollProgress, Reveal } from "@/components";

const Analytics = dynamic(() => import("@/components/view/analytics/Analytics"), {
  ssr: false,
});
export default function Home() {
  return (
    <>
      <InitialLoader />
      <ScrollProgress />

      <Navbar />
      <main id="main-content" className="theme-content" aria-label="Portfolio content">
        <Hero />
        <div className="sections-stack">
          <Reveal>
            <About />
          </Reveal>
          <Reveal>
            <Projects />
          </Reveal>
          <Skills />
          <Journey />
          <Analytics />
          <Testimonials />
          <ContactMe />
        </div>
        <Footer />
      </main>
    </>
  );
}
