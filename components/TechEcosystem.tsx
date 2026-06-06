'use client';

import { motion } from 'framer-motion';
import { useCursor } from '@/context/CursorContext';

const technologies = [
    "Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion", "GSAP", "Node.js", "Python", "OpenAI API", "Vercel", "AWS", "Supabase"
];

export default function TechEcosystem() {
    const { setCursorType } = useCursor();

    return (
        <section className="py-20 w-full overflow-hidden bg-deep-space border-t border-white/5">
            <div className="container max-w-7xl px-6 md:px-12 mb-10 text-center mx-auto">
                <h2 onMouseEnter={() => setCursorType('text')} onMouseLeave={() => setCursorType('default')} className="font-syne font-bold text-2xl md:text-3xl text-white/40 uppercase tracking-widest">
                    Our Technology Ecosystem
                </h2>
            </div>

            <div className="relative flex overflow-hidden group">
                {/* Gradient Masks */}
                <div className="absolute top-0 left-0 h-full w-20 bg-gradient-to-r from-deep-space to-transparent z-10 pointer-events-none"></div>
                <div className="absolute top-0 right-0 h-full w-20 bg-gradient-to-l from-deep-space to-transparent z-10 pointer-events-none"></div>

                {/* Marquee Track - Duplicated for seamless loop */}
                <div className="flex animate-marquee whitespace-nowrap py-4">
                    {[...technologies, ...technologies].map((tech, index) => (
                        <div
                            key={index}
                            className="mx-8 flex items-center gap-2 group/item cursor-pointer"
                            onMouseEnter={() => setCursorType('hover')}
                            onMouseLeave={() => setCursorType('default')}
                        >
                            <span className="font-syne text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white/20 to-white/5 group-hover/item:from-neon-lime group-hover/item:to-neon-lime/50 transition-all duration-300">
                                {tech}
                            </span>
                        </div>
                    ))}
                </div>
                <div className="absolute top-0 flex animate-marquee2 whitespace-nowrap py-4">
                    {[...technologies, ...technologies].map((tech, index) => (
                        <div
                            key={index}
                            className="mx-8 flex items-center gap-2 group/item cursor-pointer"
                            onMouseEnter={() => setCursorType('hover')}
                            onMouseLeave={() => setCursorType('default')}
                        >
                            <span className="font-syne text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white/20 to-white/5 group-hover/item:from-neon-lime group-hover/item:to-neon-lime/50 transition-all duration-300">
                                {tech}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            <style jsx>{`
            .animate-marquee {
                animation: marquee 40s linear infinite;
            }
            .animate-marquee2 {
                animation: marquee2 40s linear infinite;
            }
            @keyframes marquee {
                0% { transform: translateX(0%); }
                100% { transform: translateX(-100%); }
            }
            @keyframes marquee2 {
                0% { transform: translateX(100%); }
                100% { transform: translateX(0%); }
            }
        `}</style>
        </section>
    );
}
