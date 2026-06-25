import type { Metadata } from "next";
import Link from "next/link";
import GlitchText from "@/components/GlitchText";
import { FadeUp, FadeIn, SlideInLeft } from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "Jornada de Insights — case study",
  description: "Brazilian Portuguese content platform built with React and Tailwind. Mobile-first, PWA-installable.",
};

export default function JornadaPage() {
  const tech = ["React", "Tailwind CSS", "Next.js", "PWA", "iOS web app meta", "pt-BR localisation", "responsive design"];
  return (
    <main style={{ background: "#0A0A0A" }} className="min-h-screen">
      <div className="max-w-4xl mx-auto px-6 pt-28 pb-24">

        {/* Hero iframe */}
        <div className="h-[400px] sm:h-[540px] bg-[#0F0F0F] border border-white/5 rounded-lg mb-10 overflow-hidden relative">
          <iframe
            src="https://jornadadeinsights.com"
            title="Jornada de Insights — live preview"
            className="absolute top-0 left-0 border-0 pointer-events-none"
            style={{ width: "160%", height: "160%", transform: "scale(0.625)", transformOrigin: "top left" }}
            loading="lazy"
            tabIndex={-1}
          />
          <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[#0A0A0A]/70 to-transparent pointer-events-none" />
        </div>

        <FadeUp>
          <h1 className="font-syne text-4xl sm:text-5xl font-bold text-[#F8F8F8] mb-3">
            <GlitchText intensity="low">Jornada de Insights</GlitchText>
          </h1>
          <p className="font-inter text-lg text-[#6B6B6B] mb-10">Brazilian Portuguese content platform for podcasts, videos, and eBooks</p>
        </FadeUp>

        {/* Meta */}
        <div className="grid grid-cols-2 gap-x-8 gap-y-3 mb-14 bg-[#0F0F0F] border border-white/5 rounded-lg p-6">
          {[
            ["CLIENT", "Patricia (Brazilian Christian content creator)"],
            ["ROLE", "Sole developer"],
            ["DURATION", "2025"],
            ["BRAND", "Build With SDS"],
            ["STACK", "React · Next.js · Tailwind CSS · PWA · pt-BR"],
          ].map(([k, v]) => (
            <div key={k} className="col-span-2 sm:col-span-1 flex gap-4">
              <span className="font-mono text-[10px] text-[#6B6B6B] tracking-widest uppercase w-24 shrink-0 pt-0.5">{k}</span>
              <span className="font-mono text-xs text-[#F8F8F8]">{v}</span>
            </div>
          ))}
          <div className="col-span-2 sm:col-span-1 flex gap-4">
            <span className="font-mono text-[10px] text-[#6B6B6B] tracking-widest uppercase w-24 shrink-0 pt-0.5">LIVE</span>
            <a href="https://jornadadeinsights.com" target="_blank" rel="noopener noreferrer" className="font-mono text-xs text-[#CCFF00] hover:underline">jornadadeinsights.com ↗</a>
          </div>
        </div>

        {/* Case study */}
        <div className="space-y-12 mb-16">
          <div>
            <h2 className="font-mono text-xs text-[#CCFF00] tracking-widest uppercase mb-4">PROBLEM</h2>
            <p className="font-inter text-base text-[#6B6B6B] leading-relaxed">
              Patricia is a Brazilian Christian content creator publishing podcasts, videos, and eBooks across multiple platforms. Her audience is mobile-first and Portuguese-speaking, but she had no single home — content was scattered across YouTube, Spotify, and file-sharing links. She needed a hub she controlled, in her language, that felt as polished as the content she produces, and that would let her add new episodes and releases without calling a developer every time.
            </p>
          </div>
          <div>
            <h2 className="font-mono text-xs text-[#CCFF00] tracking-widest uppercase mb-4">APPROACH</h2>
            <p className="font-inter text-base text-[#6B6B6B] leading-relaxed">
              Built a mobile-first content platform in React and Next.js with full Brazilian Portuguese localisation — not just translated labels, but content structured for pt-BR reading patterns and the right locale metadata for Google. The site is PWA-enabled so it installs to the home screen on Android and iOS, with Apple&apos;s iOS web app meta tags for a native-feeling install experience on iPhones.
            </p>
          </div>
          <div>
            <h2 className="font-mono text-xs text-[#CCFF00] tracking-widest uppercase mb-4">TECHNICAL DECISIONS</h2>
            <div className="space-y-4">
              {[
                ["Next.js + SSR", "Static generation for content pages means fast first load on mobile networks. Patricia's audience is largely on Brazilian mobile connections."],
                ["PWA + iOS meta tags", "Two separate install paths — the Web App Manifest for Android and specific Apple meta tags for iOS. Both needed testing independently."],
                ["pt-BR throughout", "Not just lang='pt-BR' on the HTML element — all aria labels, date formatting, and sitemap use Brazilian Portuguese conventions."],
                ["Content-driven structure", "Podcasts, videos, and eBooks each have a typed data file. New content = editing JSON, not JSX."],
              ].map(([title, detail]) => (
                <div key={title as string} className="flex flex-col sm:flex-row gap-1 sm:gap-4">
                  <span className="font-mono text-xs text-[#CCFF00] sm:w-44 sm:shrink-0 sm:pt-0.5">{title}</span>
                  <span className="font-inter text-sm text-[#6B6B6B] leading-relaxed">{detail}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 className="font-mono text-xs text-[#CCFF00] tracking-widest uppercase mb-4">RESULT</h2>
            <p className="font-inter text-base text-[#6B6B6B] leading-relaxed">
              Live at jornadadeinsights.com. Mobile-first, Portuguese-native, PWA-installable on both Android and iOS. Patricia has a home for her work that matches the quality of the content she publishes, and she can add new releases without touching code.
            </p>
          </div>
          <div>
            <h2 className="font-mono text-xs text-[#CCFF00] tracking-widest uppercase mb-4">WHAT I OWNED</h2>
            <p className="font-inter text-base text-[#6B6B6B] leading-relaxed">
              Owned fully as sole developer, delivered under Appdoers Limited. Initial scoping call, design decisions, all frontend development, PWA configuration, SEO, deployment pipeline, and ongoing support. Patricia&apos;s first dedicated platform — built to grow with her.
            </p>
          </div>
        </div>

        {/* Tech stack */}
        <div className="mb-16">
          <h2 className="font-mono text-xs text-[#6B6B6B] tracking-widest uppercase mb-4">TECH STACK</h2>
          <div className="flex flex-wrap gap-2">
            {tech.map((t) => (
              <span key={t} className="font-mono text-xs bg-white/5 border border-white/10 text-[#F8F8F8] px-3 py-1.5 rounded">{t}</span>
            ))}
          </div>
        </div>

        {/* Live preview */}
        <div className="mb-16">
          <h2 className="font-mono text-xs text-[#6B6B6B] tracking-widest uppercase mb-4">LIVE PREVIEW</h2>
          <div className="h-[720px] bg-[#0F0F0F] border border-white/5 rounded-lg overflow-hidden">
            <iframe
              src="https://jornadadeinsights.com"
              title="Jornada de Insights — live site"
              className="w-full h-full border-0"
              loading="lazy"
            />
          </div>
          <a
            href="https://jornadadeinsights.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-[#6B6B6B] hover:text-[#CCFF00] transition-colors mt-3 inline-block"
          >
            Open jornadadeinsights.com in new tab ↗
          </a>
        </div>

        <div className="flex items-center justify-between border-t border-white/5 pt-8">
          <Link href="/work" className="font-mono text-xs text-[#6B6B6B] hover:text-[#CCFF00] transition-colors">← All Work</Link>
          <Link href="/work/alana-ruakere" className="font-mono text-xs text-[#6B6B6B] hover:text-[#CCFF00] transition-colors">Next: Alana Ruakere →</Link>
        </div>
      </div>
    </main>
  );
}
