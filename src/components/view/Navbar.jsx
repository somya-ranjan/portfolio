"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Button,
  Drawer,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import { FiMenu, FiX } from "react-icons/fi";
import { MdLightMode, MdDarkMode } from "react-icons/md";
import { BsGrid3X3GapFill } from "react-icons/bs";

import { useTheme } from "@/context/ThemeContext";
import { allMenuItems } from "@data";
import { LOGO_TEXT, THEME_CYCLE } from "@/constants";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);

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

  const getThemeIcon = () => {
    if (theme === "light") {
      return <MdLightMode size={18} />;
    }

    if (theme === "dark") {
      return <MdDarkMode size={18} />;
    }

    return <BsGrid3X3GapFill size={14} />;
  };

  const getThemeOptionIcon = (t) => {
    if (t === "light") {
      return <MdLightMode size={16} />;
    }

    if (t === "dark") {
      return <MdDarkMode size={16} />;
    }

    return <BsGrid3X3GapFill size={12} />;
  };

  const getThemeLabel = () => {
    if (theme === "light") {
      return "Light";
    }

    if (theme === "dark") {
      return "Dark";
    }

    return "Minimal";
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
          background: scrolled ? "var(--glass)" : "transparent",
          borderBottom: scrolled ? "1px solid var(--border)" : "none",
          boxShadow: scrolled ? "0 12px 36px rgba(8, 15, 30, 0.16)" : "none",
        }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled ? "backdrop-blur-2xl" : ""
        }`}
        aria-label="Main navigation"
      >
        <div className="relative mx-auto flex max-w-7xl items-center justify-between px-6 py-4 3xl:max-w-[110rem] 4xl:max-w-[138rem] 4xl:px-10 5xl:max-w-[176rem] 5xl:px-14">
          <h1 className="logo-text shrink-0 text-2xl sm:text-3xl xl:text-4xl 3xl:text-5xl 4xl:text-6xl">
            {LOGO_TEXT}
          </h1>

          <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center gap-5 text-[10px] font-semibold uppercase tracking-[0.13em] xl:gap-8 xl:text-xs xl:tracking-[0.18em] 3xl:text-sm 3xl:gap-10 4xl:text-base 4xl:gap-12">
            {allMenuItems.map((item) => (
              <motion.a
                key={item.name}
                href={item.href}
                whileHover={{ y: -2, opacity: 0.7 }}
                transition={{ duration: 0.18 }}
                className="whitespace-nowrap hover:opacity-70 hover:-translate-y-0.5"
              >
                {item.name}
              </motion.a>
            ))}
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <div className="lg:hidden">
              <Button
                size="sm"
                onClick={() => setOpenDrawer(true)}
                className="rounded-full p-2 cursor-pointer"
                variant="text"
                style={{
                  color: "var(--text)",
                  border: "1px solid var(--border)",
                  background: "var(--glass)",
                }}
              >
                <FiMenu size={18} />
              </Button>
            </div>

            <Menu placement="bottom-end">
              <MenuHandler>
                <Button
                  size="sm"
                  className="rounded-full px-3 py-2 cursor-pointer"
                  title={`Theme: ${theme}`}
                  aria-label={`Switch theme. Current theme is ${theme}`}
                  style={{
                    color: "var(--text)",
                    border: "1px solid var(--border)",
                    background: "var(--glass)",
                  }}
                >
                  <span className="flex items-center gap-2">
                    {getThemeIcon()}
                    <span className="hidden text-[10px] font-semibold uppercase tracking-[0.12em] sm:inline">
                      {getThemeLabel()}
                    </span>
                  </span>
                </Button>
              </MenuHandler>
              <MenuList
                className="card-base rounded-xl p-1 z-9999 min-w-[120px] shadow-xl"
                style={{
                  background: "var(--glass)",
                  borderColor: "var(--border)",
                  color: "var(--text)",
                }}
              >
                {THEME_CYCLE.map((t) => (
                  <MenuItem
                    key={t}
                    onClick={() => setTheme(t)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider cursor-pointer hover:bg-slate-500/10 focus:bg-slate-500/10 outline-none ${
                      theme === t ? "text-[var(--accent-solid)] bg-slate-500/5" : ""
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      {getThemeOptionIcon(t)}
                      <span>{t}</span>
                    </span>
                  </MenuItem>
                ))}
              </MenuList>
            </Menu>
          </div>
        </div>
      </motion.nav>

      <Drawer
        open={openDrawer}
        onClose={closeDrawerMenu}
        className="card-base p-4 shadow-2xl z-9999 bg-(--bg-soft)"
        placement="left"
        overlayProps={{
          className: "bg-slate-950/30 backdrop-blur-sm z-9998!",
          onClick: closeDrawerMenu,
        }}
        dismiss={{
          enabled: true,
          outsidePress: true,
          escapeKey: true,
        }}
      >
        <div className="mb-6 flex items-center justify-between">
          <h2 className="logo-text text-2xl font-semibold tracking-[0.12em]">
            Somyaranjan
          </h2>
          <button
            onClick={closeDrawerMenu}
            className="p-1 hover:opacity-70 transition-opacity"
          >
            <FiX size={24} />
          </button>
        </div>

        <nav className="flex flex-col gap-4">
          {allMenuItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={closeDrawerMenu}
              className="text-base font-semibold uppercase tracking-[0.14em] hover:opacity-70 transition-opacity"
            >
              {item.name}
            </a>
          ))}
        </nav>
      </Drawer>
    </>
  );
}
