"use client";
import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface GlitchTextProps {
  children: string;
  className?: string;
  /** How intensely / often the glitch fires: "low" | "medium" | "high" */
  intensity?: "low" | "medium" | "high";
  /** Glitch accent color (defaults to neon lime) */
  color?: string;
}

const CHARS = "!<>-_\\/[]{}—=+*^?#________";

function scramble(source: string, step: number, total: number): string {
  return source
    .split("")
    .map((char, i) => {
      if (char === " ") return " ";
      const revealAt = (i / source.length) * total;
      if (step >= revealAt) return char;
      return CHARS[Math.floor(Math.random() * CHARS.length)];
    })
    .join("");
}

export default function GlitchText({
  children,
  className = "",
  intensity = "medium",
  color = "#CCFF00",
}: GlitchTextProps) {
  const [display, setDisplay] = useState(children);
  const [glitching, setGlitching] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-80px" });
  const frameRef = useRef<number>(0);

  // Scramble-reveal on mount / when entering view
  useEffect(() => {
    if (!isInView) return;
    let iter = 0;
    const total = children.length * 2.5;
    cancelAnimationFrame(frameRef.current);
    const tick = () => {
      setDisplay(scramble(children, iter, total));
      iter += 0.8;
      if (iter < total) {
        frameRef.current = requestAnimationFrame(tick);
      } else {
        setDisplay(children);
      }
    };
    frameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameRef.current);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInView]);

  // Ambient glitch loop (CSS pseudo-layer approach)
  useEffect(() => {
    const intervals: Record<"low" | "medium" | "high", number> = {
      low: 8000,
      medium: 5000,
      high: 2800,
    };
    const durations: Record<"low" | "medium" | "high", number> = {
      low: 300,
      medium: 500,
      high: 700,
    };
    const id = setInterval(() => {
      setGlitching(true);
      setTimeout(() => setGlitching(false), durations[intensity]);
    }, intervals[intensity] + Math.random() * 2000);
    return () => clearInterval(id);
  }, [intensity]);

  return (
    <span
      ref={ref}
      className={`relative inline-block ${className}`}
      data-text={children}
      style={{ "--glitch-color": color } as React.CSSProperties}
    >
      {display}
      {glitching && (
        <>
          <span
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{
              color,
              animation: "glitch-1 0.18s steps(2) infinite",
              mixBlendMode: "screen",
            }}
          >
            {display}
          </span>
          <span
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{
              color: "#007BFF",
              animation: "glitch-2 0.22s steps(2) infinite",
              mixBlendMode: "screen",
            }}
          >
            {display}
          </span>
        </>
      )}
    </span>
  );
}
