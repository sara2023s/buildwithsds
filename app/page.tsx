import Opener from "@/components/Opener";
import SideNav from "@/components/SideNav";
import CommitsPanel from "@/components/CommitsPanel";
import WorkCard from "@/components/WorkCard";
import HomelabNetworkMap from "@/components/HomelabNetworkMap";
import Link from "next/link";
import GlitchText from "@/components/GlitchText";
import CountUp from "@/components/CountUp";
import {
  FadeUp, FadeIn, StaggerGrid, StaggerItem,
  SlideInLeft, SlideInRight, ScaleIn, BlurIn,
} from "@/components/ScrollReveal";

export default function Home() {
  return (
    <main style={{ background: "#0A0A0A" }}>
      <SideNav />

      {/* ── HERO ── */}
      <section id="opener">
        <Opener />
      </section>

      {/* ── WORK ── */}
      <section id="work" className="px-6 py-24 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <FadeUp className="mb-6 flex items-end justify-between">
            <div>
              <span className="font-mono text-xs text-[#CCFF00] tracking-widest uppercase">01 / WORK</span>
              <h2 className="font-syne text-4xl sm:text-5xl font-bold text-[#F8F8F8] mt-3">
                <GlitchText intensity="low">Dev portfolio</GlitchText>
              </h2>
            </div>
            <SlideInRight delay={0.1}>
              <Link href="/work" className="font-mono text-xs text-[#6B6B6B] hover:text-[#CCFF00] transition-colors">
                See all →
              </Link>
            </SlideInRight>
          </FadeUp>

          <FadeIn delay={0.05}>
            <p className="font-inter text-sm text-[#6B6B6B] leading-relaxed max-w-xl mb-10">
              Three client websites shipped to real users, five live personal apps deployed at Build With SDS subdomains.
              React, Next.js, Stripe, Google Pay, PWA, auth — all built and maintained solo.
            </p>
          </FadeIn>

          <StaggerGrid className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
            <StaggerItem>
              <WorkCard
                slug="jornada"
                title="Jornada de Insights"
                subtitle="Brazilian Portuguese content platform · podcasts, videos, eBooks"
                tech={["React", "Next.js", "PWA", "pt-BR"]}
                href="/work/jornada"
                previewUrl="https://jornadadeinsights.com"
              />
            </StaggerItem>
            <StaggerItem>
              <WorkCard
                slug="alana-ruakere"
                title="Alana Ruakere"
                subtitle="Artist portfolio & e-commerce · Google Pay"
                tech={["React", "Stripe", "Google Pay", "e-commerce"]}
                href="/work/alana-ruakere"
                previewUrl="https://alanaruakere.art"
              />
            </StaggerItem>
            <StaggerItem>
              <WorkCard
                slug="appdoers"
                title="Appdoers"
                subtitle="NZ digital agency website — built & maintained as lead dev"
                tech={["React", "Next.js", "TypeScript", "SEO"]}
                href="/work/appdoers"
                previewUrl="https://www.appdoers.co.nz/"
              />
            </StaggerItem>
          </StaggerGrid>

          <FadeIn delay={0.1}>
            <Link href="/work" className="font-mono text-xs text-[#6B6B6B] hover:text-[#CCFF00] transition-colors">
              + 5 live personal apps + tools →
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* ── STACK ── */}
      <section id="stack" className="px-6 py-24 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <FadeUp className="mb-6">
            <span className="font-mono text-xs text-[#CCFF00] tracking-widest uppercase">02 / STACK</span>
            <h2 className="font-syne text-4xl sm:text-5xl font-bold text-[#F8F8F8] mt-3">
              <GlitchText intensity="low">What I build with</GlitchText>
            </h2>
          </FadeUp>

          <FadeIn delay={0.05}>
            <p className="font-inter text-sm text-[#6B6B6B] leading-relaxed max-w-xl mb-12">
              Three areas of practice — networking, full-stack development, and cloud — built in parallel
              through real work, real hardware, and 21 certifications.
            </p>
          </FadeIn>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5 mb-12">
            {[
              {
                area: "Networking",
                color: "#CCFF00",
                icon: "⬡",
                summary: "Real-hardware networking, not simulated. MikroTik RouterOS, VLANs, OSPF, BGP, WireGuard. Built and maintained a 5-VLAN production network with a dedicated lab segment for exam prep.",
                skills: ["MikroTik RouterOS", "Cisco IOS", "VLANs", "OSPF · BGP", "WireGuard", "SNMP", "Fibre / VoIP", "LAN/WAN"],
                delay: 0,
              },
              {
                area: "Development",
                color: "#3ECF8E",
                icon: "{ }",
                summary: "Full-stack from database to deploy. React and Next.js frontends, Node.js backends, Stripe payments including Google Pay, Firebase, REST APIs.",
                skills: ["React · Next.js", "Node.js", "TypeScript", "Stripe", "Google Pay", "Firebase", "SQL", "REST APIs"],
                delay: 0.08,
              },
              {
                area: "Cloud & Infra",
                color: "#007BFF",
                icon: "◈",
                summary: "AWS, Azure, Docker. 25+ self-hosted services running on a ProDesk in production — monitored, automated, and backed up to a Synology NAS with zero-trust remote access via Cloudflare.",
                skills: ["AWS", "Azure", "Docker", "Cloudflare", "Linux", "CI/CD", "Nginx", "Let's Encrypt"],
                delay: 0.16,
              },
            ].map(({ area, color, icon, summary, skills, delay }) => (
              <ScaleIn key={area} delay={delay}>
                <div className="bg-[#0F0F0F] border border-white/5 rounded-lg p-6 h-full hover:border-white/10 transition-colors">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="font-mono text-lg" style={{ color }}>{icon}</span>
                    <span className="font-mono text-xs tracking-widest uppercase" style={{ color }}>{area}</span>
                  </div>
                  <p className="font-inter text-xs text-[#6B6B6B] leading-relaxed mb-5">{summary}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {skills.map((s) => (
                      <span key={s} className="font-mono text-[10px] bg-white/5 text-[#6B6B6B] px-2 py-0.5 rounded border border-white/5">{s}</span>
                    ))}
                  </div>
                </div>
              </ScaleIn>
            ))}
          </div>

          <FadeIn delay={0.1}>
            <Link href="/about" className="font-mono text-xs text-[#6B6B6B] hover:text-[#CCFF00] transition-colors">
              Full skill breakdown on About →
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* ── HOMELAB ── */}
      <section id="homelab" className="px-6 py-24 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <FadeUp className="mb-6 flex items-end justify-between">
            <div>
              <span className="font-mono text-xs text-[#CCFF00] tracking-widest uppercase">03 / HOMELAB</span>
              <h2 className="font-syne text-4xl sm:text-5xl font-bold text-[#F8F8F8] mt-3">
                <GlitchText intensity="medium">CORE_LAB</GlitchText>
              </h2>
            </div>
            <SlideInRight delay={0.1}>
              <Link href="/homelab" className="font-mono text-xs text-[#6B6B6B] hover:text-[#CCFF00] transition-colors">
                Full diagram →
              </Link>
            </SlideInRight>
          </FadeUp>

          <FadeIn delay={0.05}>
            <p className="font-inter text-sm text-[#6B6B6B] leading-relaxed max-w-xl mb-4">
              VLAN-segmented production network with a dedicated VLAN 40 lab segment for CCNA prep.
              MikroTik routing, Grandstream switching, Synology NAS, full Docker stack on an HP ProDesk,
              3× TP-Link HX510 Wi-Fi 6E mesh.
            </p>
          </FadeIn>

          {/* Stats row */}
          <StaggerGrid className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
            {[
              { to: 5, suffix: "", label: "VLANs", decimals: 0 },
              { to: 25, suffix: "+", label: "Services", decimals: 0 },
              { to: 12, suffix: "+", label: "Devices", decimals: 0 },
              { to: 99.8, suffix: "%", label: "Uptime", decimals: 1 },
            ].map(({ to, suffix, label, decimals }) => (
              <StaggerItem key={label}>
                <div className="bg-[#0F0F0F] border border-white/5 rounded-lg p-3 text-center">
                  <div className="font-syne text-xl font-bold text-[#CCFF00]">
                    <CountUp to={to} suffix={suffix} decimals={decimals} duration={1600} />
                  </div>
                  <div className="font-mono text-[9px] text-[#6B6B6B] tracking-widest uppercase mt-0.5">{label}</div>
                </div>
              </StaggerItem>
            ))}
          </StaggerGrid>

          <StaggerGrid className="flex flex-wrap gap-3 mb-8">
            {[
              { label: "MikroTik hAP ac²", color: "#CCFF00" },
              { label: "Grandstream GWN7711P", color: "#2DD4BF" },
              { label: "Synology DS425+", color: "#007BFF" },
              { label: "HP ProDesk i7", color: "#3ECF8E" },
              { label: "3× TP-Link HX510", color: "#F59E0B" },
              { label: "CCR1009 + 3× hAP ac²", color: "#99CC00" },
              { label: "WireGuard VPN", color: "#CCFF00" },
              { label: "Cloudflare Tunnel", color: "#F97066" },
            ].map(({ label, color }) => (
              <StaggerItem key={label}>
                <span className="font-mono text-xs bg-white/5 border border-white/10 text-[#F8F8F8] px-3 py-1.5 rounded flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: color }} />
                  {label}
                </span>
              </StaggerItem>
            ))}
          </StaggerGrid>

          <FadeIn delay={0.15} className="mb-8">
            <HomelabNetworkMap />
          </FadeIn>

          <FadeIn delay={0.2}>
            <Link href="/homelab" className="font-mono text-xs text-[#CCFF00] hover:text-[#CCFF00]/80 transition-colors underline underline-offset-4">
              Full homelab panel: Gear · Services · VLANs & Firewall →
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* ── CERTS ── */}
      <section id="certs" className="px-6 py-24 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <FadeUp className="mb-6">
            <span className="font-mono text-xs text-[#CCFF00] tracking-widest uppercase">04 / CERTS</span>
            <h2 className="font-syne text-4xl sm:text-5xl font-bold text-[#F8F8F8] mt-3">
              <GlitchText intensity="low">25 certs · 6 in progress</GlitchText>
            </h2>
          </FadeUp>

          <FadeIn delay={0.03}>
            <p className="font-inter text-sm text-[#6B6B6B] leading-relaxed max-w-xl mb-8">
              AWS, Microsoft Azure, IBM AI, Google, Cisco, MikroTik, Anthropic, Grandstream, Harvard — self-directed across
              cloud, AI, networking, and software. MTCNA certified. CCNA in progress.
            </p>
          </FadeIn>

          <StaggerGrid className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
            {[
              { label: "Cloud & Infra", to: 5, countStr: null, color: "#007BFF", issuers: "AWS · Microsoft" },
              { label: "AI & ML", to: null, countStr: "8 + 5 in progress", color: "#FF6B35", issuers: "IBM · Google · Anthropic" },
              { label: "Networking", to: null, countStr: "5 + 1 in progress", color: "#CCFF00", issuers: "Cisco · Grandstream · MikroTik" },
              { label: "Software Eng", to: 2, countStr: null, color: "#F59E0B", issuers: "IBM · Harvard" },
              { label: "IT Support", to: 2, countStr: null, color: "#3ECF8E", issuers: "Google · Cisco" },
              { label: "Education", to: 3, countStr: null, color: "#9B59B6", issuers: "Yoobee · Massey · Whitecliffe" },
            ].map(({ label, to, countStr, color, issuers }) => (
              <StaggerItem key={label}>
                <div className="bg-[#0F0F0F] border border-white/5 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: color }} />
                    <span className="font-syne text-sm font-bold text-[#F8F8F8]">{label}</span>
                  </div>
                  <div className="font-mono text-xl font-bold mb-1" style={{ color }}>
                    {to !== null ? <CountUp to={to} duration={1400} /> : countStr}
                  </div>
                  <div className="font-mono text-[10px] text-[#6B6B6B]">{issuers}</div>
                </div>
              </StaggerItem>
            ))}
          </StaggerGrid>

          <FadeIn delay={0.15}>
            <Link href="/certs" className="font-mono text-xs text-[#CCFF00] hover:text-[#CCFF00]/80 transition-colors underline underline-offset-4">
              See all certifications →
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* ── ACTIVITY ── */}
      <section id="activity">
        <CommitsPanel />
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="px-6 py-24 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <FadeUp className="mb-6">
            <span className="font-mono text-xs text-[#CCFF00] tracking-widest uppercase">05 / CONTACT</span>
            <h2 className="font-syne text-4xl sm:text-5xl font-bold text-[#F8F8F8] mt-3">
              <GlitchText intensity="low">Let&apos;s talk.</GlitchText>
            </h2>
          </FadeUp>

          <FadeIn delay={0.05}>
            <p className="font-inter text-base text-[#6B6B6B] leading-relaxed max-w-xl mb-4">
              I&apos;m looking for the next role. Level 2 support, sysadmin, or full-stack engineering —
              remote or New Plymouth-based.
            </p>
            <p className="font-inter text-sm text-[#6B6B6B] leading-relaxed max-w-xl mb-10">
              GMT+13. Online when London logs off. Useful for follow-the-sun coverage, off-hours incidents,
              or shipping while the rest of the team sleeps.
            </p>
          </FadeIn>

          {/* Quick-fact tiles */}
          <StaggerGrid className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
            {[
              { label: "STATUS", value: "Open to work", color: "#CCFF00" },
              { label: "LOCATION", value: "New Plymouth, NZ", color: "#F8F8F8" },
              { label: "TIMEZONE", value: "GMT+13 · NZST", color: "#F8F8F8" },
              { label: "OPEN TO", value: "Remote · Onsite NZ", color: "#F8F8F8" },
            ].map(({ label, value, color }) => (
              <StaggerItem key={label}>
                <div className="bg-[#0F0F0F] border border-white/5 rounded-lg p-4">
                  <div className="font-mono text-[9px] text-[#6B6B6B] tracking-widest uppercase mb-1">{label}</div>
                  <div className="font-mono text-xs font-semibold" style={{ color }}>{value}</div>
                </div>
              </StaggerItem>
            ))}
          </StaggerGrid>

          {/* Role targets */}
          <StaggerGrid className="grid sm:grid-cols-2 md:grid-cols-3 gap-3 mb-10">
            {[
              { role: "Level 2 Technical Support", detail: "ISP, MSP, or enterprise. Fault escalation, provisioning, on-call." },
              { role: "Sysadmin / Network Eng", detail: "Linux, Docker, MikroTik, VLAN segmentation, monitoring stacks." },
              { role: "Full-Stack Engineering", detail: "React, Node.js, TypeScript, payments, APIs, end-to-end ownership." },
            ].map(({ role, detail }) => (
              <StaggerItem key={role}>
                <div className="border border-white/5 bg-white/[0.02] rounded-lg p-4">
                  <div className="font-syne text-sm font-bold text-[#F8F8F8] mb-2">{role}</div>
                  <div className="font-inter text-xs text-[#6B6B6B] leading-relaxed">{detail}</div>
                </div>
              </StaggerItem>
            ))}
          </StaggerGrid>

          <FadeUp delay={0.1} className="flex flex-wrap gap-4">
            <a
              href="mailto:hello@buildwithsds.com"
              className="inline-flex items-center gap-2 font-mono text-sm font-semibold text-[#0A0A0A] bg-[#CCFF00] px-6 py-3 rounded hover:bg-[#CCFF00]/90 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#CCFF00]"
            >
              hello@buildwithsds.com →
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 font-mono text-sm text-[#F8F8F8] border border-white/20 px-6 py-3 rounded hover:border-[#CCFF00]/50 hover:text-[#CCFF00] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#CCFF00]"
            >
              Full contact page →
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 font-mono text-sm text-[#F8F8F8] border border-white/20 px-6 py-3 rounded hover:border-[#CCFF00]/50 hover:text-[#CCFF00] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#CCFF00]"
            >
              About me →
            </Link>
          </FadeUp>
        </div>
      </section>
    </main>
  );
}
