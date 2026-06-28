"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { Input, Textarea } from "@material-tailwind/react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { CONTACT_EMAIL, GITHUB_URL, LINKEDIN_URL } from "@/constants";

export default function ContactMe() {
  const containerRef = useRef(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("");

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const leftY = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const rightY = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  const validate = () => {
    const errors = {
      name: "",
      email: "",
      message: "",
    };

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.name.trim()) {
      errors.name = "Name is required.";
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required.";
    } else if (!emailPattern.test(formData.email.trim())) {
      errors.email = "Enter a valid email address.";
    }

    if (!formData.message.trim()) {
      errors.message = "Message is required.";
    } else if (formData.message.trim().length < 10) {
      errors.message = "Message should be at least 10 characters.";
    }

    setFormErrors(errors);
    return !errors.name && !errors.email && !errors.message;
  };

  const handleChange = (field) => (event) => {
    const value = event.target.value;

    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (formErrors[field]) {
      setFormErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }

    if (status) {
      setStatus("");
    }
  };

  const handleCardMouseMove = (event) => {
    const card = event.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  };

  const getGmailComposeLink = ({ subject = "", body = "" } = {}) => {
    const composeParams = new URLSearchParams({
      view: "cm",
      fs: "1",
      to: CONTACT_EMAIL,
    });

    composeParams.set("su", `${subject} [Coming From Portfolio]`);
    composeParams.set("body", body);

    return `https://mail.google.com/mail/?${composeParams.toString()}`;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validate()) {
      setStatus("Please fix the highlighted fields.");
      return;
    }

    const subject = `Portfolio Contact: ${formData.name.trim()}`;
    const body = `Name: ${formData.name.trim()}\nEmail: ${formData.email.trim()}\n\nMessage:\n${formData.message.trim()}`;
    const mailtoLink = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
    const gmailComposeLink = getGmailComposeLink({ subject, body });

    setStatus("Opening a Gmail draft...");

    if (typeof window !== "undefined") {
      const composeWindow = window.open(gmailComposeLink, "_blank");

      if (composeWindow) {
        composeWindow.opener = null;
      } else {
        window.location.assign(mailtoLink);
      }
    }
  };

  return (
    <section id="contact" className="section-wrap" ref={containerRef}>
      <div className="relative mx-auto max-w-5xl 3xl:max-w-[84vw] 4xl:max-w-[88vw] 5xl:max-w-[90vw]">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="section-title section-heading section-heading-lg"
        >
          Contact Me
        </motion.h2>

        <div className="mt-16 grid gap-10 md:grid-cols-2 3xl:gap-14 4xl:gap-20">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            style={{ y: leftY }}
            transition={{ duration: 0.7 }}
            onMouseMove={handleCardMouseMove}
            className="glass-panel glow-card relative z-30 rounded-2xl p-8"
          >
            <p className="tilt-text opacity-65">Start A Conversation</p>

            <div className="mt-6 flex items-center gap-4">
              <div className="relative h-24 w-24 overflow-hidden rounded-full border border-[var(--border)] shadow-lg">
                <Image
                  src="/contact-my-pic.png"
                  alt="Contact portrait"
                  fill
                  className="object-cover"
                  sizes="96px"
                  priority
                />
              </div>
              <div>
                <p className="text-sm font-semibold">Let&apos;s connect</p>
                <p className="text-xs leading-relaxed opacity-80">
                  Available for collaborations, freelance work, or a friendly hello.
                </p>
              </div>
            </div>

            <h3 className="display-title mt-4 text-3xl font-semibold leading-tight">
              Let&apos;s build something amazing 🚀
            </h3>

            <p className="mt-5 text-sm leading-relaxed opacity-80">
              Feel free to reach out for collaborations, freelance work, or just a
              friendly hello 👋
            </p>

            <div className="mt-8 flex items-center gap-4">
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border p-3"
                style={{ borderColor: "var(--border)" }}
                aria-label="GitHub"
              >
                <FaGithub size={18} />
              </a>

              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border p-3"
                style={{ borderColor: "var(--border)" }}
                aria-label="LinkedIn"
              >
                <FaLinkedinIn size={18} />
              </a>

              <a
                href={getGmailComposeLink()}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border p-3"
                style={{ borderColor: "var(--border)" }}
                aria-label="Email"
              >
                <MdEmail size={18} />
              </a>
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            style={{ y: rightY }}
            transition={{ duration: 0.7 }}
            onMouseMove={handleCardMouseMove}
            className="glass-panel glow-card relative z-30 space-y-6 rounded-2xl p-8"
            onSubmit={handleSubmit}
            noValidate
          >
            <p className="tilt-text opacity-65">Send Me A Message</p>

            <div>
              <Input
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange("name")}
                error={Boolean(formErrors.name)}
                size="lg"
                className="text-(--text)! placeholder:text-(--muted)! placeholder:opacity-100!"
                suppressHydrationWarning
              />
              {formErrors.name ? (
                <p className="mt-1 text-xs" style={{ color: "var(--danger)" }}>
                  {formErrors.name}
                </p>
              ) : null}
            </div>

            <div>
              <Input
                placeholder="Your Email"
                type="email"
                value={formData.email}
                onChange={handleChange("email")}
                error={Boolean(formErrors.email)}
                size="lg"
                className="text-(--text)! placeholder:text-(--muted)! placeholder:opacity-100!"
                suppressHydrationWarning
              />
              {formErrors.email ? (
                <p className="mt-1 text-xs" style={{ color: "var(--danger)" }}>
                  {formErrors.email}
                </p>
              ) : null}
            </div>

            <div>
              <Textarea
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange("message")}
                error={Boolean(formErrors.message)}
                rows={6}
                className="text-(--text)! placeholder:text-(--muted)! placeholder:opacity-100!"
                suppressHydrationWarning
              />
              {formErrors.message ? (
                <p className="mt-1 text-xs" style={{ color: "var(--danger)" }}>
                  {formErrors.message}
                </p>
              ) : null}
            </div>

            {status ? (
              <p
                className="rounded-lg border px-3 py-2 text-xs opacity-90"
                style={{ borderColor: "var(--border)" }}
                aria-live="polite"
              >
                {status}
              </p>
            ) : null}

            <button
              type="submit"
              className="w-full rounded-full py-3 text-xs font-semibold uppercase tracking-[0.14em]"
              style={{
                background: "var(--accent)",
                color: "var(--accent-contrast)",
                cursor: "pointer",
              }}
            >
              Send Message
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
