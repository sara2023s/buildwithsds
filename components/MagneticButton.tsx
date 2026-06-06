"use client";
import { useRef, useEffect, useState, type ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface Props {
  children: ReactNode;
  /** How strongly the element is pulled toward the cursor (0–1). Default 0.32 */
  strength?: number;
}

/**
 * Wraps any element with a magnetic attraction effect on hover.
 * The element drifts toward the cursor and snaps back on mouse-leave.
 * Disabled automatically on touch devices.
 */
export default function MagneticButton({ children, strength = 0.32 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [isTouch, setIsTouch] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 260, damping: 16 });
  const springY = useSpring(y, { stiffness: 260, damping: 16 });

  useEffect(() => {
    setIsTouch(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  if (isTouch) {
    return <>{children}</>;
  }

  return (
    <motion.div
      ref={ref}
      style={{ x: springX, y: springY, display: "inline-flex" }}
      onMouseMove={(e) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        x.set((e.clientX - (rect.left + rect.width / 2)) * strength);
        y.set((e.clientY - (rect.top + rect.height / 2)) * strength);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}
