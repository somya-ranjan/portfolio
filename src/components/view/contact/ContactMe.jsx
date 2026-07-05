"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { Input, Textarea } from "@material-tailwind/react";
import { CONTACT_EMAIL } from "@/constants";
import { CONTACT_MY_PIC } from "@/assets/img";
import { handleCardMouseMove, getGmailComposeLink } from "@/utils";
import { SectionHeading, SocialLinks } from "@/components";

/* ============================================================
   Reusable Sub-Components
   ============================================================ */

/** FormField: Reusable wrapper for input/textarea + error display */
const FormField = ({ label, error, children }) => (
  <div className="form-field">
    {children}
    {error && <p className="form-error">{error}</p>}
  </div>
);

/** FormInput: Consistent text input with standard styling */
const FormInput = ({ placeholder, value, onChange, error, type = "text" }) => (
  <Input
    placeholder={placeholder}
    type={type}
    value={value}
    onChange={onChange}
    error={Boolean(error)}
    size="lg"
    className="form-input"
    suppressHydrationWarning
  />
);

/** FormTextarea: Consistent textarea with standard styling */
const FormTextarea = ({ placeholder, value, onChange, error, rows = 6 }) => (
  <Textarea
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    error={Boolean(error)}
    rows={rows}
    className="form-input"
    suppressHydrationWarning
  />
);

/** ContactPanel: Left side info panel with motion */
const ContactPanel = ({ leftY }) => (
  <motion.div
    initial={{ opacity: 0, x: -40 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    style={{ y: leftY }}
    transition={{ duration: 0.7 }}
    onMouseMove={handleCardMouseMove}
    className="glass-panel glow-card contact-panel"
  >
    <p className="tilt-text opacity-65">Get In Touch</p>

    <div className="mt-6 flex items-center gap-4">
      <div className="contact-profile-pic">
        <Image
          src={CONTACT_MY_PIC}
          alt="Somyaranjan Sethy contact portrait"
          fill
          className="object-cover"
          sizes="96px"
          priority
        />
      </div>
      <div>
        <p className="text-sm font-semibold">Let&apos;s work together</p>
        <p className="text-xs leading-relaxed opacity-80">
          Open for senior roles, architecture challenges, or technical partnerships.
        </p>
      </div>
    </div>

    <h3 className="display-title mt-4 text-2xl sm:text-3xl font-semibold leading-tight 3xl:text-4xl 4xl:text-5xl">
      Ready to solve complex problems at scale
    </h3>

    <p className="mt-5 text-sm leading-relaxed opacity-80 3xl:text-base 4xl:text-lg">
      Looking for opportunities to build high-performance systems, mentor teams, or
      collaborate on architecture challenges that matter.
    </p>

    <SocialLinks
      className="mt-8 flex items-center gap-4"
      itemClassName="p-3 inline-flex items-center justify-center"
      iconSize={18}
    />
  </motion.div>
);

/** ContactForm: Right side contact form with motion */
const ContactForm = ({
  formData,
  formErrors,
  status,
  rightY,
  onFieldChange,
  onSubmit,
}) => (
  <motion.form
    initial={{ opacity: 0, x: 40 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    style={{ y: rightY }}
    transition={{ duration: 0.7 }}
    onMouseMove={handleCardMouseMove}
    className="glass-panel glow-card contact-panel space-y-5 sm:space-y-6 3xl:space-y-8"
    onSubmit={onSubmit}
    noValidate
  >
    <p className="tilt-text opacity-65">Send Me A Message</p>

    {/* Name Field */}
    <FormField label="Name" error={formErrors.name}>
      <FormInput
        placeholder="Your Name"
        value={formData.name}
        onChange={onFieldChange("name")}
        error={formErrors.name}
      />
    </FormField>

    {/* Email Field */}
    <FormField label="Email" error={formErrors.email}>
      <FormInput
        placeholder="Your Email"
        type="email"
        value={formData.email}
        onChange={onFieldChange("email")}
        error={formErrors.email}
      />
    </FormField>

    {/* Message Field */}
    <FormField label="Message" error={formErrors.message}>
      <FormTextarea
        placeholder="Your Message"
        value={formData.message}
        onChange={onFieldChange("message")}
        error={formErrors.message}
      />
    </FormField>

    {/* Status Message */}
    {status && (
      <p className="form-status" aria-live="polite">
        {status}
      </p>
    )}

    {/* Submit Button */}
    <button type="submit" className="form-submit-btn">
      Send Message
    </button>
  </motion.form>
);

/* ============================================================
   Main Component
   ============================================================ */

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

    // Clear error on change
    if (formErrors[field]) {
      setFormErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }

    // Clear status on change
    if (status) {
      setStatus("");
    }
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
    <section id="contact" ref={containerRef}>
      <div className="relative container-md">
        <SectionHeading>Contact Me</SectionHeading>

        <div className="contact-grid">
          <ContactPanel leftY={leftY} />
          <ContactForm
            formData={formData}
            formErrors={formErrors}
            status={status}
            rightY={rightY}
            onFieldChange={handleChange}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    </section>
  );
}
