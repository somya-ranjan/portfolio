"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Input, Textarea, Button } from "@material-tailwind/react";
import { useRef } from "react";
// import { Github, Linkedin, Mail } from "lucide-react";

export default function ContactMe() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const leftY = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const rightY = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  return (
    <section id="contact" className="py-24 px-6" ref={containerRef}>
      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center"
        >
          Contact Me
        </motion.h2>

        <div className="mt-16 grid md:grid-cols-2 gap-10">
          {/* LEFT - Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            style={{ y: leftY }}
            transition={{ duration: 0.7 }}
          >
            <h3 className="text-xl font-semibold">
              Let’s build something amazing 🚀
            </h3>

            <p className="mt-4 opacity-80">
              Feel free to reach out for collaborations, freelance work, or just
              a friendly hello 👋
            </p>

            {/* Social */}
            <div className="flex gap-4 mt-6">
              <a href="#" className="p-3 rounded-full bg-black/10">
                {/* <Github size={18} /> */}Git
              </a>

              <a href="#" className="p-3 rounded-full bg-black/10">
                {/* <Linkedin size={18} /> */}
                LinkedIn
              </a>

              <a href="#" className="p-3 rounded-full bg-black/10">
                {/* <Mail size={18} /> */}
                Mail
              </a>
            </div>
          </motion.div>

          {/* RIGHT - Form */}
          <motion.form
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            style={{ y: rightY }}
            transition={{ duration: 0.7 }}
            className="space-y-6"
          >
            <Input label="Your Name" />
            <Input label="Your Email" type="email" />
            <Textarea label="Message" />

            <Button className="rounded-full w-full">Send Message</Button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
