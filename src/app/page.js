"use client";
import { motion } from "framer-motion";

import CustomCursor from "@/components/CustomCursor";
import ScrollProgress from "@/components/ScrollProgress";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Journey from "@/components/Journey";
import Analytics from "@/components/Analytics";
import Testimonials from "@/components/Testimonials";
import ContactMe from "@/components/ContactMe";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";

export default function Home() {
  return (
    <>
      <CustomCursor />
      <ScrollProgress />

      <Navbar />
      <Hero />
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
