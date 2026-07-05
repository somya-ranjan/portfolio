"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
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
import useBodyScrollLock from "@/hooks/useBodyScrollLock";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);

  useBodyScrollLock(openDrawer);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
        <div className="relative mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 3xl:max-w-[110rem] 4xl:max-w-[138rem] 4xl:px-10 5xl:max-w-[176rem] 5xl:px-14">
          <a
            href="#home"
            className="logo-text min-w-0 shrink text-[clamp(1.15rem,5.5vw,1.45rem)] sm:text-3xl xl:text-4xl 3xl:text-5xl 4xl:text-6xl"
            aria-label="Somyaranjan Sethy home"
          >
            {LOGO_TEXT}
          </a>

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

          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
            <div className="lg:hidden">
              <Button
                size="sm"
                onClick={() => setOpenDrawer(true)}
                className="flex h-9 w-9 items-center justify-center rounded-full p-0 cursor-pointer sm:h-10 sm:w-10"
                variant="text"
                style={{
                  color: "var(--text)",
                  border: "1px solid var(--border)",
                  background: "var(--glass)",
                }}
                aria-label="Open navigation menu"
              >
                <FiMenu size={18} />
              </Button>
            </div>

            <Menu placement="bottom-end">
              <MenuHandler>
                <Button
                  size="sm"
                  className="flex h-9 w-9 items-center justify-center rounded-full p-0 cursor-pointer sm:h-10 sm:w-auto sm:px-3 sm:py-2"
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
                className="card-base z-[9999] min-w-[120px] rounded-xl p-1 shadow-xl"
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

      <AnimatePresence>
        {openDrawer ? (
          <motion.button
            type="button"
            aria-label="Close navigation overlay"
            className="fixed inset-0 z-[9998] bg-slate-950/35 backdrop-blur-sm lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeDrawerMenu}
          />
        ) : null}
      </AnimatePresence>

      <Drawer
        open={openDrawer}
        onClose={closeDrawerMenu}
        className="card-base z-[9999] flex h-full flex-col overflow-y-auto overscroll-contain p-4 shadow-2xl bg-(--bg-soft)"
        placement="left"
        overlay={false}
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
            aria-label="Close navigation menu"
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
