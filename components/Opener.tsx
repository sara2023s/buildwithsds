"use client";
import { useState, useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import GlitchText from "@/components/GlitchText";
import CountUp from "@/components/CountUp";
import MagneticButton from "@/components/MagneticButton";

const STATUS_PHRASES = [
  "ISP support by day · shipping code by night",
  "MikroTik + React + AWS in production",
  "25 certs · MTCNA certified · CCNA incoming",
  "GMT+13 · online when London logs off",
];

function TypewriterStatus() {
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [erasing, setErasing] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const current = STATUS_PHRASES[phraseIdx];
    if (!erasing) {
      if (displayed.length < current.length) {
        timerRef.current = setTimeout(
          () => setDisplayed(current.slice(0, displayed.length + 1)),
          38
        );
      } else {
        timerRef.current = setTimeout(() => setErasing(true), 2600);
      }
    } else {
      if (displayed.length > 0) {
        timerRef.current = setTimeout(
          () => setDisplayed(displayed.slice(0, -1)),
          18
        );
      } else {
        setErasing(false);
        setPhraseIdx((i) => (i + 1) % STATUS_PHRASES.length);
      }
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [displayed, erasing, phraseIdx]);

  return (
    <span>
      {displayed}
      <span className="animate-cursor-blink ml-[1px] inline-block w-[2px] h-[0.85em] bg-[#CCFF00] align-middle" />
    </span>
  );
}

export default function Opener() {
  const [lastPush, setLastPush] = useState<string | null>(null);
  const [timezone, setTimezone] = useState<string>("");
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const getTimezone = () => {
      const parts = Intl.DateTimeFormat("en-NZ", {
        timeZone: "Pacific/Auckland",
        timeZoneName: "short",
      }).formatToParts(new Date());
      const tzPart = parts.find((p) => p.type === "timeZoneName");
      setTimezone(tzPart?.value ?? "NZST");
    };
    getTimezone();
    const id = setInterval(getTimezone, 60000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    fetch("/api/github-summary")
      .then((r) => r.json())
      .then((data) => {
        if (data?.last_push_relative) setLastPush(data.last_push_relative);
      })
      .catch(() => {});
  }, []);

  const rm = shouldReduceMotion;

  return (
    <div className="min-h-screen flex flex-col justify-center px-6 pt-28 pb-16 relative overflow-hidden">
      {/* Scan-sweep line */}
      {!rm && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="pointer-events-none absolute inset-x-0 top-0 z-0"
        >
          <motion.div
            initial={{ y: -4, opacity: 1 }}
            animate={{ y: "100vh", opacity: 0 }}
            transition={{ duration: 1.8, delay: 0.6, ease: "linear" }}
            className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#CCFF00]/40 to-transparent"
          />
        </motion.div>
      )}

      {/* Subtle dot grid */}
      {!rm && (
        <div
          className="pointer-events-none absolute inset-0 z-0 animate-flicker"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(204,255,0,0.06) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
      )}

      <div className="max-w-5xl mx-auto w-full relative z-10">
        {/* Status bar */}
        <motion.div
          initial={rm ? undefined : { opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 1.4 }}
          className="font-mono text-xs text-[#CCFF00] flex items-center gap-2 mb-10"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#CCFF00] animate-pulse inline-block shrink-0" />
          {rm ? "ISP support by day · shipping code by night" : <TypewriterStatus />}
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={rm ? undefined : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.6 }}
          className="font-syne font-bold text-[clamp(3.5rem,10vw,9rem)] leading-none tracking-tight"
        >
          <GlitchText className="text-[#F8F8F8]" intensity="low">
            Sara
          </GlitchText>
          <br />
          <GlitchText className="text-[#CCFF00]" intensity="medium">
            da Silva
          </GlitchText>
        </motion.h1>

        {/* Location / TZ */}
        <motion.p
          initial={rm ? undefined : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.8 }}
          className="font-mono text-sm text-[#6B6B6B] tracking-widest mt-4 mb-6"
        >
          New Plymouth, NZ · {timezone}
        </motion.p>

        {/* Bio */}
        <motion.p
          initial={rm ? undefined : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 2.0 }}
          className="font-inter text-base text-[#6B6B6B] leading-relaxed max-w-xl mb-8"
        >
          Customer Success Tech at PrimoWireless, troubleshooting Fibre, Wireless and VoIP by day.
          Lead full-stack developer on contract with Appdoers by night, shipping React and Node to real clients.
          Level 7 Diploma in Cloud Engineering, 25 certs across AWS, Azure, IBM AI, Cisco, MikroTik, Anthropic.
          MTCNA certified. CCNA in active lab prep. I&apos;m awake when London sleeps. I&apos;m not done.
        </motion.p>

        {/* Stat badges */}
        <motion.div
          initial={rm ? undefined : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 2.2 }}
          className="flex flex-wrap gap-3 mt-8"
        >
          <span className="animate-float font-mono text-xs bg-white/5 border border-white/10 text-[#CCFF00] px-3 py-1.5 rounded flex items-center gap-1.5" style={{ animationDelay: "0s" }}>
            <CountUp to={25} duration={1200} />
            <span className="text-[#F8F8F8]">certs</span>
          </span>
          <span className="animate-float font-mono text-xs bg-white/5 border border-white/10 text-[#F8F8F8] px-3 py-1.5 rounded" style={{ animationDelay: "0.4s" }}>
            MTCNA certified
          </span>
          {lastPush !== null && (
            <span className="animate-float font-mono text-xs bg-white/5 border border-white/10 text-[#F8F8F8] px-3 py-1.5 rounded" style={{ animationDelay: "0.8s" }}>
              pushed code {lastPush} ago
            </span>
          )}
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={rm ? undefined : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 2.4 }}
          className="mt-8 flex flex-wrap gap-4"
        >
          <MagneticButton>
            <Link
              href="/work"
              className="inline-flex items-center gap-2 font-mono text-sm font-semibold text-[#0A0A0A] bg-[#CCFF00] px-6 py-3 rounded hover:bg-[#CCFF00]/90 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#CCFF00]"
            >
              See my work →
            </Link>
          </MagneticButton>
          <MagneticButton>
            <a
              href="mailto:hello@buildwithsds.com"
              className="inline-flex items-center gap-2 font-mono text-sm text-[#F8F8F8] border border-white/20 px-6 py-3 rounded hover:border-[#CCFF00]/50 hover:text-[#CCFF00] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#CCFF00]"
            >
              hello@buildwithsds.com →
            </a>
          </MagneticButton>
        </motion.div>
      </div>
    </div>
  );
}
