"use client";
import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * Atmospheric cursor glow — a large, soft lime radial gradient
 * that trails behind the mouse. Separate from the tight CustomCursor dot.
 * Hidden on touch devices and below md breakpoint.
 */
export default function CursorGlow() {
  const x = useMotionValue(-500);
  const y = useMotionValue(-500);
  // Very soft spring → slow atmospheric trail
  const springX = useSpring(x, { stiffness: 52, damping: 18 });
  const springY = useSpring(y, { stiffness: 52, damping: 18 });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed z-[9990] top-0 left-0 hidden md:block"
      style={{
        x: springX,
        y: springY,
        width: 900,
        height: 900,
        marginLeft: -450,
        marginTop: -450,
        background:
          "radial-gradient(circle at center, rgba(204,255,0,0.055) 0%, rgba(204,255,0,0.018) 38%, transparent 68%)",
        borderRadius: "50%",
      }}
    />
  );
}
