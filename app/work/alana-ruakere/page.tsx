import type { Metadata } from "next";
import Link from "next/link";
import GlitchText from "@/components/GlitchText";
import { FadeUp } from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "Alana Ruakere — case study",
  description: "Artist portfolio and e-commerce shop with Google Pay integration.",
};

export default function AlanaPage() {
  const tech = ["React", "Stripe", "Google Pay", "domain verification", "SEO", "responsive", "e-commerce", "image optimisation"];
  return (
    <main style={{ background: "#0A0A0A" }} className="min-h-screen">
      <div className="max-w-4xl mx-auto px-6 pt-28 pb-24">

        {/* Hero iframe */}
        <div className="h-[400px] sm:h-[540px] bg-[#0F0F0F] border border-white/5 rounded-lg mb-10 overflow-hidden relative">
          <iframe
            src="https://alanaruakere.art"
            title="Alana Ruakere — live preview"
            className="absolute top-0 left-0 border-0 pointer-events-none"
            style={{ width: "160%", height: "160%", transform: "scale(0.625)", transformOrigin: "top left" }}
            loading="lazy"
            tabIndex={-1}
          />
          <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[#0A0A0A]/70 to-transparent pointer-events-none" />
        </div>

        <FadeUp>
          <h1 className="font-syne text-4xl sm:text-5xl font-bold text-[#F8F8F8] mb-3">
            <GlitchText intensity="low">Alana Ruakere</GlitchText>
          </h1>
          <p className="font-inter text-lg text-[#6B6B6B] mb-10">Artist portfolio & e-commerce shop with Google Pay</p>
        </FadeUp>

        {/* Meta */}
        <div className="grid grid-cols-2 gap-x-8 gap-y-3 mb-14 bg-[#0F0F0F] border border-white/5 rounded-lg p-6">
          {[
            ["CLIENT", "Alana Ruakere (NZ contemporary artist)"],
            ["ROLE", "Sole developer"],
            ["DURATION", "2025"],
            ["BRAND", "Build With SDS"],
            ["STACK", "React · Stripe · Google Pay"],
          ].map(([k, v]) => (
            <div key={k} className="col-span-2 sm:col-span-1 flex gap-4">
              <span className="font-mono text-[10px] text-[#6B6B6B] tracking-widest uppercase w-24 shrink-0 pt-0.5">{k}</span>
              <span className="font-mono text-xs text-[#F8F8F8]">{v}</span>
            </div>
          ))}
          <div className="col-span-2 sm:col-span-1 flex gap-4">
            <span className="font-mono text-[10px] text-[#6B6B6B] tracking-widest uppercase w-24 shrink-0 pt-0.5">LIVE</span>
            <a href="https://alanaruakere.art" target="_blank" rel="noopener noreferrer" className="font-mono text-xs text-[#CCFF00] hover:underline">alanaruakere.art ↗</a>
          </div>
        </div>

        {/* Case study */}
        <div className="space-y-12 mb-16">
          <div>
            <h2 className="font-mono text-xs text-[#CCFF00] tracking-widest uppercase mb-4">PROBLEM</h2>
            <p className="font-inter text-base text-[#6B6B6B] leading-relaxed">
              Alana is a contemporary NZ artist with original artworks and prints to sell. The existing options were a bad fit — generic marketplaces buried her work behind algorithms, and off-the-shelf Shopify templates made her gallery look like a product catalogue. She wanted a portfolio site that led with the artwork and could take payments directly, without paying platform fees on every sale or losing control of how her work is presented.
            </p>
          </div>
          <div>
            <h2 className="font-mono text-xs text-[#CCFF00] tracking-widest uppercase mb-4">APPROACH</h2>
            <p className="font-inter text-base text-[#6B6B6B] leading-relaxed mb-4">
              Built a custom React portfolio and shop. The design leads with full-bleed imagery — artwork as the centrepiece, not as a product card with a price badge. Stripe handles the payment backend, with Google Pay wired in through the Payment Request API so mobile buyers can check out in one tap without entering card details.
            </p>
            <p className="font-inter text-base text-[#6B6B6B] leading-relaxed">
              Google Pay required its own merchant registration flow — fully tested across devices before shipping. SEO metadata targets Alana&apos;s name and specific artwork titles so she surfaces in image searches.
            </p>
          </div>
          <div>
            <h2 className="font-mono text-xs text-[#CCFF00] tracking-widest uppercase mb-4">TECHNICAL DECISIONS</h2>
            <div className="space-y-4">
              {[
                ["Stripe + Google Pay", "Payment Request API integration surfaces Google Pay on Chrome/Android and falls back to standard card for everything else."],
                ["Image-first layout", "Artwork images are the entire above-the-fold experience. Lazy loading and WebP with AVIF fallback keeps paint time fast despite large files."],
                ["Zero platform fees", "No Shopify, no Squarespace, no marketplace cut. Alana pays Stripe's standard transaction fee and nothing else."],
              ].map(([title, detail]) => (
                <div key={title as string} className="flex flex-col sm:flex-row gap-1 sm:gap-4">
                  <span className="font-mono text-xs text-[#CCFF00] sm:w-48 sm:shrink-0 sm:pt-0.5">{title}</span>
                  <span className="font-inter text-sm text-[#6B6B6B] leading-relaxed">{detail}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 className="font-mono text-xs text-[#CCFF00] tracking-widest uppercase mb-4">RESULT</h2>
            <p className="font-inter text-base text-[#6B6B6B] leading-relaxed">
              Live at alanaruakere.art. Original artworks and prints available for direct purchase. Google Pay working across devices. No monthly fees, no algorithm, no platform dependency — Alana owns her storefront and her customer relationships.
            </p>
          </div>
          <div>
            <h2 className="font-mono text-xs text-[#CCFF00] tracking-widest uppercase mb-4">WHAT I OWNED</h2>
            <p className="font-inter text-base text-[#6B6B6B] leading-relaxed">
              End-to-end under Build With SDS. Scoping, visual direction, React development, Stripe integration, Google Pay setup, SEO metadata, deployment, and ongoing support.
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
              src="https://alanaruakere.art"
              title="Alana Ruakere — live site"
              className="w-full h-full border-0"
              loading="lazy"
            />
          </div>
          <a
            href="https://alanaruakere.art"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-[#6B6B6B] hover:text-[#CCFF00] transition-colors mt-3 inline-block"
          >
            Open alanaruakere.art in new tab ↗
          </a>
        </div>

        <div className="flex items-center justify-between border-t border-white/5 pt-8">
          <Link href="/work/jornada" className="font-mono text-xs text-[#6B6B6B] hover:text-[#CCFF00] transition-colors">← Jornada de Insights</Link>
          <Link href="/work/homelab" className="font-mono text-xs text-[#6B6B6B] hover:text-[#CCFF00] transition-colors">Next: The Homelab →</Link>
        </div>
      </div>
    </main>
  );
}
