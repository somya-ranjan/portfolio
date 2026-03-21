"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button, Drawer } from "@material-tailwind/react";
import { Moon, Sun, Menu, X } from "lucide-react";

import { useTheme } from "@/context/ThemeContext";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);

  const allMenuItems = [
    { name: "Home", href: "#home" },
    { name: "Projects", href: "#projects" },
    { name: "Skills", href: "#skills" },
    { name: "Journey", href: "#journey" },
    { name: "Analytics", href: "#analytics" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "Contact", href: "#contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (openDrawer) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [openDrawer]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const closeDrawerMenu = () => {
    setOpenDrawer(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        style={{
          background: scrolled
            ? theme === "light"
              ? "rgba(255,255,255,0.7)"
              : "rgba(0,0,0,0.6)"
            : "transparent",
        }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled ? "backdrop-blur-lg shadow-md" : ""
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          {/* Logo */}
          <h1 className="text-xl font-bold tracking-wide">DevPortfolio</h1>

          {/* Desktop Menu */}
          <div className="hidden lg:flex gap-8 text-sm font-medium">
            {allMenuItems.map((item) => (
              <a key={item.name} href={item.href} className="hover:opacity-70">
                {item.name}
              </a>
            ))}
          </div>

          {/* Mobile Menu Button & Theme Toggle */}
          <div className="flex items-center gap-2">
            {/* Hamburger Menu for Mobile */}
            <Button
              size="sm"
              onClick={() => setOpenDrawer(true)}
              className="lg:hidden rounded-full p-2 cursor-pointer"
              variant="text"
            >
              <Menu size={18} />
            </Button>

            {/* Theme Toggle */}
            <Button
              size="sm"
              onClick={toggleTheme}
              className="rounded-full p-2 cursor-pointer"
            >
              {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
            </Button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Drawer Menu */}
      <Drawer
        open={openDrawer}
        onClose={closeDrawerMenu}
        className="p-4"
        placement="left"
        overlayProps={{
          className: "bg-black/30 backdrop-blur-sm z-9999",
          onClick: closeDrawerMenu,
        }}
        dismiss={{
          enabled: true,
          outsidePress: true,
          escapeKey: true,
        }}
      >
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold">Menu</h2>
          <button
            onClick={closeDrawerMenu}
            className="p-1 hover:opacity-70 transition-opacity"
          >
            <X size={24} />
          </button>
        </div>

        {/* Mobile Menu Items */}
        <nav className="flex flex-col gap-4">
          {allMenuItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={closeDrawerMenu}
              className="text-base font-medium hover:opacity-70 transition-opacity"
            >
              {item.name}
            </a>
          ))}
        </nav>
      </Drawer>
    </>
  );
}
