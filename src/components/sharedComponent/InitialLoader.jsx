"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import useBodyScrollLock from "@/hooks/useBodyScrollLock";

const GREETINGS = ["Hello", "Namaskar", "Namaste", "Hola", "Bonjour", "Ciao"];
const GREETING_DELAY_MS = 1200;
const REDUCED_MOTION_GREETING_DELAY_MS = 1400;

export default function InitialLoader() {
  const shouldReduceMotion = useReducedMotion();
  const [isVisible, setIsVisible] = useState(true);
  const [activeGreeting, setActiveGreeting] = useState(0);
  const greetingDelay = shouldReduceMotion
    ? REDUCED_MOTION_GREETING_DELAY_MS
    : GREETING_DELAY_MS;
  const visibleDuration = greetingDelay * GREETINGS.length;
  const visibleDurationInSeconds = visibleDuration / 1000;

  useBodyScrollLock(isVisible);

  useEffect(() => {
    const greetingTimer = window.setInterval(() => {
      setActiveGreeting((current) => (current + 1) % GREETINGS.length);
    }, greetingDelay);

    const exitTimer = window.setTimeout(() => {
      setIsVisible(false);
    }, visibleDuration);

    return () => {
      window.clearInterval(greetingTimer);
      window.clearTimeout(exitTimer);
    };
  }, [greetingDelay, visibleDuration]);

  return (
    <AnimatePresence>
      {isVisible ? (
        <motion.div
          className="initial-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.55, ease: "easeInOut" } }}
          aria-live="polite"
          aria-label="Welcome to my portfolio"
        >
          <div className="initial-loader__halo" aria-hidden="true" />

          <motion.div
            className="initial-loader__content"
            initial={{ y: 18, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="initial-loader__greeting-wrap">
              <AnimatePresence mode="wait">
                <motion.p
                  key={GREETINGS[activeGreeting]}
                  className="initial-loader__greeting"
                  initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
                  transition={{ duration: shouldReduceMotion ? 0.16 : 0.46 }}
                >
                  {GREETINGS[activeGreeting]}
                </motion.p>
              </AnimatePresence>
            </div>

            <motion.p
              className="initial-loader__welcome"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.45 }}
            >
              Welcome to my portfolio
            </motion.p>

            <div className="initial-loader__bar" aria-hidden="true">
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{
                  duration: visibleDurationInSeconds,
                  ease: "linear",
                }}
              />
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
