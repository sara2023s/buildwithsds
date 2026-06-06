"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 1.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-[#0A0A0A]/90 backdrop-blur-md border-b border-white/5" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        <a
          href="#"
          className="font-mono text-sm text-[#CCFF00] tracking-widest uppercase"
        >
          Build With SDS
        </a>
        <a
          href="mailto:hello@buildwithsds.com"
          className="font-mono text-xs text-[#6B6B6B] hover:text-[#CCFF00] transition-colors duration-200 tracking-wide"
        >
          hello@buildwithsds.com
        </a>
      </div>
    </motion.nav>
  );
}
