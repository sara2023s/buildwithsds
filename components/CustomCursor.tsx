'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useCursor } from '@/context/CursorContext';

export default function CustomCursor() {
    const { cursorType } = useCursor();
    const [isMobile, setIsMobile] = useState(false);
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    const springConfig = { damping: 25, stiffness: 700 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    useEffect(() => {
        // Check if device is touch-enabled
        const isTouch = window.matchMedia('(pointer: coarse)').matches;
        setIsMobile(isTouch);

        if (isTouch) return;

        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX - 16); // Center the cursor (32px / 2)
            cursorY.set(e.clientY - 16);
        };

        window.addEventListener('mousemove', moveCursor);
        return () => {
            window.removeEventListener('mousemove', moveCursor);
        };
    }, [cursorX, cursorY]);

    if (isMobile) return null;

    const variants = {
        default: {
            height: 32,
            width: 32,
            backgroundColor: "var(--neon-lime)", // neon-lime
            mixBlendMode: "difference" as const,
        },
        hover: {
            height: 80,
            width: 80,
            backgroundColor: "var(--electric-azure)", // electric-azure
            mixBlendMode: "difference" as const,
        },
        text: {
            height: 100,
            width: 4,
            backgroundColor: "var(--neon-lime)",
            mixBlendMode: "difference" as const,
        }
    };

    return (
        <motion.div
            className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999]"
            style={{
                translateX: cursorXSpring,
                translateY: cursorYSpring,
            }}
            variants={variants}
            animate={cursorType}
            transition={{ type: "spring", stiffness: 500, damping: 28 }}
        />
    );
}
