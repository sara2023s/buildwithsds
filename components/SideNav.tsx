"use client";
import { useState, useEffect } from "react";

const SECTIONS = [
  { label: "00 / HOME", id: "opener" },
  { label: "01 / WORK", id: "work" },
  { label: "02 / STACK", id: "stack" },
  { label: "03 / HOMELAB", id: "homelab" },
  { label: "04 / CERTS", id: "certs" },
  { label: "05 / ACTIVITY", id: "activity" },
  { label: "06 / CONTACT", id: "contact" },
];

export default function SideNav() {
  const [activeId, setActiveId] = useState<string>("opener");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveId(id);
        },
        { threshold: 0.4 }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <nav className="fixed left-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-6">
      {SECTIONS.map(({ label, id }) => {
        const active = activeId === id;
        return (
          <button
            key={id}
            onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })}
            className={`font-mono text-[9px] tracking-widest cursor-pointer transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#CCFF00] ${
              active ? "text-[#CCFF00]" : "text-[#6B6B6B] hover:text-[#CCFF00]"
            }`}
          >
            {active ? `● ${label}` : label}
          </button>
        );
      })}
    </nav>
  );
}
