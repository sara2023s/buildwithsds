'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader() {
    const [isLoading, setIsLoading] = useState(true);
    const [counter, setCounter] = useState(0);

    useEffect(() => {
        // Disable scrolling while loading
        // document.body.style.overflow = 'hidden';

        // Simulate loading progress
        const interval = setInterval(() => {
            setCounter((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                // Faster increment for better perceived speed
                const increment = Math.floor(Math.random() * 5) + 2;
                return Math.min(prev + increment, 100);
            });
        }, 30);

        // Finish loading faster
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1200);

        return () => {
            clearInterval(interval);
            clearTimeout(timer);
            document.body.style.overflow = '';
        };
    }, []);

    return (
        <AnimatePresence mode="wait">
            {isLoading && (
                <motion.div
                    key="preloader"
                    className="fixed inset-0 z-[9999] flex items-center justify-center bg-deep-space text-white cursor-none"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }} // Simple fade out backup, but we'll specific exit animations on children
                    transition={{ duration: 0.5 }}
                >
                    {/* Split Screen Reveal Effect Containers (Optional, handled via exit variant) */}

                    <div className="text-center z-10">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20, transition: { duration: 0.3 } }}
                            className="mb-4"
                        >
                            <span className="font-mono text-xs tracking-[0.2em] text-neon-lime/80 uppercase">
                                System Initialization
                            </span>
                        </motion.div>

                        <div className="relative overflow-hidden">
                            <motion.h1
                                className="font-syne font-bold text-6xl md:text-9xl tracking-tighter"
                                initial={{ y: 50, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                            >
                                {counter}%
                            </motion.h1>
                        </div>

                        <motion.div
                            className="mt-4 h-[2px] w-48 bg-white/10 mx-auto overflow-hidden"
                            exit={{ width: 0, transition: { duration: 0.3 } }}
                        >
                            <motion.div
                                className="h-full bg-neon-lime"
                                style={{ width: `${counter}%` }}
                            />
                        </motion.div>
                    </div>

                    {/* Background elements or split panels for exit animation */}
                    <motion.div
                        className="absolute top-0 left-0 w-full h-1/2 bg-deep-space z-0"
                        initial={{ y: 0 }}
                        exit={{ y: "-100%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 } }}
                    />
                    <motion.div
                        className="absolute bottom-0 left-0 w-full h-1/2 bg-deep-space z-0"
                        initial={{ y: 0 }}
                        exit={{ y: "100%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 } }}
                    >
                        {/* Optional: Add footer text here that slides down */}
                        <div className="absolute bottom-10 left-0 w-full text-center opacity-30 font-mono text-xs">
                            Build With SDS
                        </div>
                    </motion.div>

                </motion.div>
            )}
        </AnimatePresence>
    );
}
