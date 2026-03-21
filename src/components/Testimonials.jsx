"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const testimonials = [
  {
    id: 1,
    name: "John Doe",
    role: "Product Manager",
    image: "/assets/images/testimonial1.jpg",
    review:
      "Amazing developer! Delivered high-quality work with great performance optimization.",
  },
  {
    id: 2,
    name: "Sarah Smith",
    role: "Startup Founder",
    image: "/assets/images/testimonial1.jpg",
    review:
      "Very professional and detail-oriented. Highly recommended for modern web apps.",
  },
];

export default function Testimonials() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  return (
    <section id="testimonials" className="py-24 px-6" ref={containerRef}>
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center"
        >
          Testimonials
        </motion.h2>

        {/* Grid */}
        <div className="mt-16 grid md:grid-cols-2 gap-8">
          {testimonials.map((item, index) => {
            const itemRef = useRef(null);
            const { scrollYProgress: itemProgress } = useScroll({
              target: itemRef,
              offset: ["start center", "end center"],
            });
            const y = useTransform(itemProgress, [0, 1], [-60, 60]);
            const opacity = useTransform(
              itemProgress,
              [0, 0.5, 1],
              [0.5, 1, 0.5],
            );

            return (
              <motion.div
                key={item.id}
                ref={itemRef}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.7 }}
                viewport={{ once: true }}
                style={{ y, opacity }}
                className="p-6 rounded-2xl transition-all duration-300 hover:scale-[1.02]"
                // style={{
                //   background: "rgba(0,0,0,0.03)",
                // }}
              >
                {/* User */}
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />

                  <div>
                    <h4 className="font-semibold">{item.name}</h4>
                    <p className="text-sm opacity-60">{item.role}</p>
                  </div>
                </div>

                {/* Review */}
                <p className="mt-6 text-sm leading-relaxed opacity-80">
                  "{item.review}"
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
