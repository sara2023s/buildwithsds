import type { Metadata } from "next";
import Link from "next/link";
import WorkTimeline from "@/components/WorkTimeline";
import workHistory from "@/data/work-history.json";
import education from "@/data/education.json";
import GlitchText from "@/components/GlitchText";
import CountUp from "@/components/CountUp";
import MagneticButton from "@/components/MagneticButton";
import { FadeUp, FadeIn, SlideInLeft, ScaleIn, BlurIn, StaggerGrid, StaggerItem } from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "About",
  description: "New Plymouth NZ. Customer Success Tech by day, full-stack developer by night. Level 7 Diploma in Cloud Engineering, 25 certs.",
};

export default function AboutPage() {
  const workEntries = workHistory.map((e) => ({
    start: e.start,
    end: e.end ?? null,
    title: e.role,
    org: e.company,
    location: e.location ?? null,
    summary: e.summary,
  }));

  const eduEntries = education.map((e) => ({
    start: e.start,
    end: e.end,
    title: e.qualification,
    org: e.institution,
  }));

  const skillCategories = [
    {
      label: "Networking",
      color: "#CCFF00",
      skills: ["TCP/IP", "DNS", "DHCP", "VLANs", "MikroTik RouterOS", "Cisco IOS", "OSPF", "BGP", "WireGuard", "SNMP", "LAN/WAN", "Fibre Provisioning", "VoIP"],
    },
    {
      label: "Development",
      color: "#3ECF8E",
      skills: ["React.js", "Next.js", "Node.js", "TypeScript", "JavaScript", "Python", "REST APIs", "SQL", "Firebase", "HTML", "CSS", "Tailwind CSS"],
    },
    {
      label: "Cloud & Infrastructure",
      color: "#007BFF",
      skills: ["AWS", "Azure", "Docker", "Cloudflare", "CI/CD", "Linux", "Synology DSM", "Nginx", "Let's Encrypt"],
    },
    {
      label: "Tools",
      color: "#F59E0B",
      skills: ["Git", "Microsoft 365", "Wireshark", "Notion", "Postman", "VS Code"],
    },
  ];

  return (
    <main style={{ background: "#0A0A0A" }} className="min-h-screen">
      <div className="max-w-4xl mx-auto px-6 pt-28 pb-24">
        <BlurIn className="mb-4">
          <span className="font-mono text-xs text-[#CCFF00] tracking-widest uppercase">ABOUT</span>
        </BlurIn>
        <FadeUp>
          <h1 className="font-syne text-5xl sm:text-6xl font-bold text-[#F8F8F8] mb-12">
            <GlitchText intensity="low">Sara da Silva</GlitchText>
          </h1>
        </FadeUp>

        {/* Bio */}
        <div className="space-y-6 mb-20 max-w-2xl">
          <SlideInLeft delay={0.05}>
            <p className="font-inter text-base text-[#6B6B6B] leading-relaxed">
              I&apos;m Sara, based in New Plymouth, New Zealand. By day I&apos;m a Customer Success Technician at PrimoWireless, an NZ ISP. I troubleshoot Fibre, Wireless, and VoIP connectivity issues, isolate faults between hardware and network layers, and run end-to-end provisioning for new services.
            </p>
          </SlideInLeft>
          <SlideInLeft delay={0.1}>
            <p className="font-inter text-base text-[#6B6B6B] leading-relaxed">
              After 5pm I switch hats. I lead full-stack development on contract for Appdoers Limited, building React and Node applications for client work — auth, databases, payments, serverless functions, deployment pipelines. Under my own brand, Build With SDS, I take full-stack and e-commerce projects end-to-end for direct clients.
            </p>
          </SlideInLeft>
          <SlideInLeft delay={0.15}>
            <p className="font-inter text-base text-[#6B6B6B] leading-relaxed">
              I hold a Level 7 Diploma in Cloud Engineering from Yoobee, and I&apos;m MTCNA certified. Currently working toward CCNA. I run a VLAN-segmented homelab with a dedicated lab segment specifically for hands-on OSPF, BGP, and routing protocol practice — the kind of preparation that matters when the exam is real hardware, not Packet Tracer.
            </p>
          </SlideInLeft>
          <SlideInLeft delay={0.2}>
            <p className="font-inter text-base text-[#6B6B6B] leading-relaxed">
              I&apos;m awake when London sleeps, I work fast, and I&apos;m not done.
            </p>
          </SlideInLeft>
        </div>

        {/* Currently */}
        <div className="mb-20">
          <FadeUp className="mb-6">
            <span className="font-mono text-xs text-[#CCFF00] tracking-widest uppercase">CURRENTLY</span>
          </FadeUp>
          <StaggerGrid className="grid sm:grid-cols-2 gap-4">
            {[
              { label: "MTCNA", detail: "Certified Jun 2026 · MikroTik", color: "#99CC00" },
              { label: "CCNA", detail: "In progress · Cisco IOS in EVE-NG on the ProDesk", color: "#99CC00" },
              { label: "Level 7 Cloud Engineering", detail: "Yoobee College · completed Apr 2026 · AWS, Azure, architecture", color: "#007BFF" },
              { label: "Appdoers", detail: "Active contract · React, Node, Firebase client delivery", color: "#3ECF8E" },
            ].map(({ label, detail, color }) => (
              <StaggerItem key={label}>
                <div className="bg-[#0F0F0F] border border-white/5 rounded-lg p-4 flex gap-3">
                  <span className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 animate-pulse" style={{ backgroundColor: color }} />
                  <div>
                    <div className="font-syne text-sm font-bold text-[#F8F8F8] mb-0.5">{label}</div>
                    <div className="font-mono text-xs text-[#6B6B6B] leading-relaxed">{detail}</div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>

        {/* Experience */}
        <div className="mb-20">
          <FadeUp className="mb-8">
            <span className="font-mono text-xs text-[#CCFF00] tracking-widest uppercase">EXPERIENCE</span>
          </FadeUp>
          <FadeIn delay={0.05}>
            <WorkTimeline entries={workEntries} />
          </FadeIn>
        </div>

        {/* Education */}
        <div className="mb-20">
          <FadeUp className="mb-8">
            <span className="font-mono text-xs text-[#CCFF00] tracking-widest uppercase">EDUCATION</span>
          </FadeUp>
          <FadeIn delay={0.05}>
            <WorkTimeline entries={eduEntries} />
          </FadeIn>
        </div>

        {/* Skills */}
        <div className="mb-20">
          <FadeUp className="mb-6">
            <span className="font-mono text-xs text-[#CCFF00] tracking-widest uppercase">TECHNICAL SKILLS</span>
          </FadeUp>
          <div className="space-y-6">
            {skillCategories.map(({ label, color, skills }, i) => (
              <SlideInLeft key={label} delay={i * 0.07}>
                <div>
                  <div className="font-mono text-[10px] tracking-widest uppercase mb-3 flex items-center gap-2" style={{ color }}>
                    <span className="w-1 h-1 rounded-full" style={{ backgroundColor: color }} />
                    {label}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((s) => (
                      <span key={s} className="font-mono text-xs bg-white/5 border border-white/10 text-[#6B6B6B] px-3 py-1.5 rounded">{s}</span>
                    ))}
                  </div>
                </div>
              </SlideInLeft>
            ))}
          </div>
        </div>

        {/* Looking for */}
        <ScaleIn className="mb-16">
          <div className="bg-[#0F0F0F] border border-white/5 rounded-lg p-8">
            <div className="mb-5">
              <span className="font-mono text-xs text-[#CCFF00] tracking-widest uppercase">OPEN TO</span>
            </div>
            <p className="font-inter text-base text-[#6B6B6B] leading-relaxed mb-6 max-w-xl">
              I&apos;m actively looking for the next role. I have the breadth of a support engineer, the depth of a developer, and the networking knowledge of someone who has broken and rebuilt their own production network more than once.
            </p>
            <StaggerGrid className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
              {[
                { role: "Level 2 Technical Support", detail: "Escalation-level ISP, MSP, or enterprise infrastructure. Faults, provisioning, on-call." },
                { role: "Sysadmin / Network Eng", detail: "Linux, Docker, MikroTik, VLANs, monitoring. Self-hosted infrastructure at production scale." },
                { role: "Full-Stack Engineering", detail: "React, Node.js, TypeScript. Auth, payments, APIs, deployment. End-to-end ownership." },
              ].map(({ role, detail }) => (
                <StaggerItem key={role}>
                  <div className="border border-white/5 rounded-lg p-4 h-full">
                    <div className="font-syne text-sm font-bold text-[#F8F8F8] mb-2">{role}</div>
                    <div className="font-inter text-xs text-[#6B6B6B] leading-relaxed">{detail}</div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerGrid>
            <div className="flex flex-wrap gap-3">
              {["Remote", "New Plymouth onsite", "NZ-based", "GMT+13 coverage", "Full-time or contract"].map((tag) => (
                <span key={tag} className="font-mono text-xs bg-[#CCFF00]/5 border border-[#CCFF00]/20 text-[#CCFF00] px-3 py-1.5 rounded">{tag}</span>
              ))}
            </div>
          </div>
        </ScaleIn>

        <div className="flex flex-wrap gap-4 border-t border-white/5 pt-10">
          <MagneticButton>
            <a
              href="mailto:hello@buildwithsds.com"
              className="font-mono text-sm text-[#0A0A0A] bg-[#CCFF00] px-6 py-3 rounded hover:bg-[#CCFF00]/90 transition-colors font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-[#CCFF00]"
            >
              hello@buildwithsds.com →
            </a>
          </MagneticButton>
          <MagneticButton>
            <Link href="/work" className="font-mono text-sm text-[#F8F8F8] border border-white/20 px-6 py-3 rounded hover:border-[#CCFF00]/50 hover:text-[#CCFF00] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#CCFF00]">
              See my work →
            </Link>
          </MagneticButton>
          <MagneticButton>
            <Link href="/certs" className="font-mono text-sm text-[#F8F8F8] border border-white/20 px-6 py-3 rounded hover:border-[#CCFF00]/50 hover:text-[#CCFF00] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#CCFF00]">
              25 certifications →
            </Link>
          </MagneticButton>
        </div>
      </div>
    </main>
  );
}
