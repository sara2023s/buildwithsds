import type { Metadata } from "next";
import GlitchText from "@/components/GlitchText";
import MagneticButton from "@/components/MagneticButton";
import { FadeUp, FadeIn, ScaleIn, SlideInLeft, StaggerGrid, StaggerItem } from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "Contact",
  description: "Open to Level 2 Technical Support, sysadmin, or full-stack engineering. Remote or New Plymouth-based.",
};

function DynamicTimezone() {
  const now = new Date();
  const parts = Intl.DateTimeFormat("en-NZ", {
    timeZone: "Pacific/Auckland",
    timeZoneName: "short",
  }).formatToParts(now);
  const tz = parts.find((p) => p.type === "timeZoneName")?.value || "NZST";
  return <>{tz}</>;
}

export default function ContactPage() {
  return (
    <main style={{ background: "#0A0A0A" }} className="min-h-screen">
      <div className="max-w-3xl mx-auto px-6 pt-28 pb-24">
        <FadeUp className="mb-4">
          <span className="font-mono text-xs text-[#CCFF00] tracking-widest uppercase">CONTACT</span>
        </FadeUp>
        <FadeUp delay={0.05}>
          <h1 className="font-syne text-5xl sm:text-6xl font-bold text-[#F8F8F8] mb-12">
            <GlitchText intensity="low">Let&apos;s talk.</GlitchText>
          </h1>
        </FadeUp>

        <div className="space-y-6 mb-16 max-w-2xl">
          <SlideInLeft delay={0.05}>
            <p className="font-inter text-base text-[#6B6B6B] leading-relaxed">
              I&apos;m looking for the next role. Open to Level 2 Technical Support, sysadmin, or full-stack engineering — remote or New Plymouth-based.
            </p>
          </SlideInLeft>
          <SlideInLeft delay={0.1}>
            <p className="font-inter text-base text-[#6B6B6B] leading-relaxed">
              GMT+13 means I&apos;m online when most of your team is asleep. Useful for follow-the-sun coverage, off-hours incidents, or shipping while London logs off.
            </p>
          </SlideInLeft>
          <SlideInLeft delay={0.15}>
            <p className="font-inter text-base text-[#6B6B6B] leading-relaxed">
              Freelance, contract, or full-time. All considered.
            </p>
          </SlideInLeft>
        </div>

        <ScaleIn delay={0.1} className="mb-14">
          <div className="bg-[#0F0F0F] border border-white/5 rounded-lg p-8">
            <StaggerGrid className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-12">
              {[
                { label: "EMAIL", value: "hello@buildwithsds.com", href: "mailto:hello@buildwithsds.com" },
                { label: "GITHUB", value: "github.com/sara2023s", href: "https://github.com/sara2023s" },
                { label: "LINKEDIN", value: "linkedin.com/in/sara-n-a-dasilva", href: "https://www.linkedin.com/in/sara-n-a-dasilva" },
              ].map(({ label, value, href }) => (
                <StaggerItem key={label}>
                  <div className="font-mono text-[10px] text-[#6B6B6B] tracking-widest uppercase mb-1">{label}</div>
                  <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noopener noreferrer" : undefined} className="font-mono text-xs text-[#F8F8F8] hover:text-[#CCFF00] transition-colors">
                    {value}
                  </a>
                </StaggerItem>
              ))}
              <StaggerItem>
                <div className="font-mono text-[10px] text-[#6B6B6B] tracking-widest uppercase mb-1">LOCATION</div>
                <span className="font-mono text-xs text-[#F8F8F8]">New Plymouth, NZ</span>
              </StaggerItem>
              <StaggerItem>
                <div className="font-mono text-[10px] text-[#6B6B6B] tracking-widest uppercase mb-1">TIMEZONE</div>
                <span className="font-mono text-xs text-[#F8F8F8]"><DynamicTimezone /></span>
              </StaggerItem>
              <StaggerItem>
                <div className="font-mono text-[10px] text-[#6B6B6B] tracking-widest uppercase mb-1">AVAILABILITY</div>
                <span className="font-mono text-xs text-[#F8F8F8]">Open to remote & onsite NZ</span>
              </StaggerItem>
            </StaggerGrid>
          </div>
        </ScaleIn>

        <FadeUp delay={0.1}>
          <MagneticButton>
            <a
              href="mailto:hello@buildwithsds.com"
              className="inline-flex items-center gap-2 font-mono text-sm font-semibold text-[#0A0A0A] bg-[#CCFF00] px-8 py-4 rounded hover:bg-[#CCFF00]/90 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#CCFF00]"
            >
              hello@buildwithsds.com →
            </a>
          </MagneticButton>
        </FadeUp>
      </div>
    </main>
  );
}
