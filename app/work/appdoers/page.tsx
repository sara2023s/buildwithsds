import type { Metadata } from "next";
import Link from "next/link";
import GlitchText from "@/components/GlitchText";
import { FadeUp, FadeIn, ScaleIn, SlideInLeft, StaggerGrid, StaggerItem } from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "Appdoers — case study",
  description: "Company website for Appdoers Limited, a New Zealand digital agency. Built and maintained as the contract lead developer.",
};

export default function AppdoersPage() {
  const tech = [
    "React", "Next.js", "Tailwind CSS", "TypeScript",
    "Vercel", "SEO", "responsive design", "performance optimisation",
  ];

  return (
    <main style={{ background: "#0A0A0A" }} className="min-h-screen">
      <div className="max-w-4xl mx-auto px-6 pt-28 pb-24">

        {/* Site preview */}
        <div className="h-[400px] sm:h-[540px] bg-[#0F0F0F] border border-white/5 rounded-lg mb-10 overflow-hidden relative flex flex-col items-center justify-center gap-6">
          <div className="text-center px-8">
            <div className="font-mono text-[10px] text-[#6B6B6B] tracking-widest uppercase mb-3">LIVE SITE</div>
            <div className="font-syne text-3xl sm:text-4xl font-bold text-[#F8F8F8] mb-2">appdoers.co.nz</div>
            <div className="font-inter text-sm text-[#6B6B6B]">New Zealand digital development agency</div>
          </div>
          <a
            href="https://www.appdoers.co.nz/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-sm font-semibold text-[#0A0A0A] bg-[#CCFF00] px-6 py-3 rounded hover:bg-[#CCFF00]/90 transition-colors"
          >
            Visit appdoers.co.nz ↗
          </a>
        </div>

        <FadeUp>
          <h1 className="font-syne text-4xl sm:text-5xl font-bold text-[#F8F8F8] mb-3">
            <GlitchText intensity="low">Appdoers</GlitchText>
          </h1>
          <p className="font-inter text-lg text-[#6B6B6B] mb-10">Company website for a New Zealand digital development agency</p>
        </FadeUp>

        {/* Meta */}
        <ScaleIn>
          <div className="grid grid-cols-2 gap-x-8 gap-y-3 mb-14 bg-[#0F0F0F] border border-white/5 rounded-lg p-6">
            {[
              ["CLIENT", "Appdoers Limited (NZ digital agency)"],
              ["ROLE", "Contract lead developer"],
              ["URL", "appdoers.co.nz"],
              ["STATUS", "Live · maintained ongoing"],
            ].map(([k, v]) => (
              <div key={k}>
                <div className="font-mono text-[9px] text-[#6B6B6B] tracking-widest uppercase mb-1">{k}</div>
                <div className="font-inter text-sm text-[#F8F8F8]">{v}</div>
              </div>
            ))}
          </div>
        </ScaleIn>

        {/* Overview */}
        <div className="mb-16 space-y-5 max-w-2xl">
          <FadeUp>
            <h2 className="font-mono text-xs text-[#6B6B6B] tracking-widest uppercase mb-5">OVERVIEW</h2>
          </FadeUp>
          <SlideInLeft delay={0.05}>
            <p className="font-inter text-base text-[#6B6B6B] leading-relaxed">
              Appdoers is a New Zealand-based digital agency I work with as a contract lead developer. I built and maintain their company website — the front-facing representation of everything they offer to NZ businesses.
            </p>
          </SlideInLeft>
          <SlideInLeft delay={0.1}>
            <p className="font-inter text-base text-[#6B6B6B] leading-relaxed">
              The brief was a clean, professional site that communicates the agency&apos;s services clearly and converts prospective clients. Fully responsive, fast, and optimised for search — built to perform, not just look good.
            </p>
          </SlideInLeft>
          <SlideInLeft delay={0.15}>
            <p className="font-inter text-base text-[#6B6B6B] leading-relaxed">
              Beyond the website, I lead full-stack development on client delivery projects under the Appdoers umbrella — auth, databases, payments, serverless functions, and deployment pipelines for real NZ clients.
            </p>
          </SlideInLeft>
        </div>

        {/* Tech stack */}
        <FadeIn className="mb-16">
          <h2 className="font-mono text-xs text-[#6B6B6B] tracking-widest uppercase mb-4">STACK</h2>
          <StaggerGrid className="flex flex-wrap gap-2">
            {tech.map((t) => (
              <StaggerItem key={t}>
                <span className="font-mono text-xs bg-white/5 border border-white/10 text-[#F8F8F8] px-3 py-1.5 rounded">{t}</span>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </FadeIn>

        {/* CTA */}
        <FadeUp delay={0.1} className="flex flex-wrap gap-4 border-t border-white/5 pt-10">
          <a
            href="https://www.appdoers.co.nz/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-mono text-sm font-semibold text-[#0A0A0A] bg-[#CCFF00] px-6 py-3 rounded hover:bg-[#CCFF00]/90 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#CCFF00]"
          >
            Visit appdoers.co.nz ↗
          </a>
          <Link href="/work" className="font-mono text-sm text-[#F8F8F8] border border-white/20 px-6 py-3 rounded hover:border-[#CCFF00]/50 hover:text-[#CCFF00] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#CCFF00]">
            ← Back to work
          </Link>
        </FadeUp>
      </div>
    </main>
  );
}
