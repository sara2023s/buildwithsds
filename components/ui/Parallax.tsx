'use client';

import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef } from 'react';

interface ParallaxProps {
    children: React.ReactNode;
    offset?: number;
    className?: string;
}

export default function ParallaxSection({ children, offset = 50, className = "" }: ParallaxProps) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
    const y = useSpring(useTransform(scrollYProgress, [0, 1], [offset, -offset]), springConfig);

    return (
        <div ref={ref} className={`relative ${className}`}>
            <motion.div style={{ y }}>
                {children}
            </motion.div>
        </div>
    );
}

export function FloatingElement({ children, depth = 1, className = "" }: { children: React.ReactNode, depth?: number, className?: string }) {
    const { scrollY } = useScroll();
    const y = useTransform(scrollY, (value) => value * depth * 0.1); // Simple global parallax based on scroll position

    return (
        <motion.div style={{ y }} className={`absolute pointer-events-none ${className}`}>
            {children}
        </motion.div>
    );
}
