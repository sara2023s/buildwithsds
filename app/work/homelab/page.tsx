import type { Metadata } from "next";
import Link from "next/link";
import GlitchText from "@/components/GlitchText";
import CountUp from "@/components/CountUp";
import { FadeUp, FadeIn, ScaleIn, SlideInLeft, StaggerGrid, StaggerItem } from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "The Homelab — case study",
  description: "Self-hosted network monitoring stack built to study for MTCNA and CCNA. MikroTik hAP ac², Grandstream switch, Synology DS425+, 5 VLANs, full Docker service stack.",
};

export default function HomelabWorkPage() {
  const tech = [
    "MikroTik hAP ac²", "RouterOS L4", "Grandstream GWN7711P", "Synology DS425+",
    "HP ProDesk i7", "3× TP-Link HX510", "The Dude (CHR VM)", "SNMP",
    "Docker", "Home Assistant", "AdGuard Home", "Cloudflare Tunnel",
    "EcoFlow River 3 Plus", "WireGuard", "5 VLANs", "EVE-NG",
  ];

  return (
    <main style={{ background: "#0A0A0A" }} className="min-h-screen">
      <div className="max-w-4xl mx-auto px-6 pt-28 pb-24">
        <h1 className="font-syne text-4xl sm:text-5xl font-bold text-[#F8F8F8] mb-3">
          <GlitchText intensity="medium">The Homelab</GlitchText>
        </h1>
        <p className="font-inter text-lg text-[#6B6B6B] mb-6">VLAN-segmented production network — built to work, monitored to break, rebuilt to learn</p>
        <Link
          href="/homelab"
          className="inline-flex items-center gap-2 font-mono text-xs text-[#CCFF00] border border-[#CCFF00]/30 bg-[#CCFF00]/5 px-4 py-2 rounded hover:bg-[#CCFF00]/10 transition-colors mb-10"
        >
          ↗ Full interactive diagram, gear list, services, and VLANs at /homelab
        </Link>

        {/* Meta */}
        <div className="grid grid-cols-2 gap-x-8 gap-y-3 mb-14 bg-[#0F0F0F] border border-white/5 rounded-lg p-6">
          {[
            ["TYPE", "Personal infrastructure — ongoing"],
            ["ROLE", "Solo build, design, and operations"],
            ["STARTED", "2024 · live and expanding"],
            ["PURPOSE", "MTCNA certified · CCNA in progress"],
            ["UPTIME", "99.8% over 30 days"],
            ["STATUS", "Live · monitored · operational"],
          ].map(([k, v]) => (
            <div key={k} className="col-span-2 sm:col-span-1 flex gap-4">
              <span className="font-mono text-[10px] text-[#6B6B6B] tracking-widest uppercase w-24 shrink-0 pt-0.5">{k}</span>
              <span className="font-mono text-xs text-[#F8F8F8]">{v}</span>
            </div>
          ))}
        </div>

        {/* Case study */}
        <div className="space-y-12 mb-16">
          <div>
            <h2 className="font-mono text-xs text-[#CCFF00] tracking-widest uppercase mb-4">PROBLEM</h2>
            <p className="font-inter text-base text-[#6B6B6B] leading-relaxed">
              I&apos;m self-taught and pursuing MTCNA and CCNA — now MTCNA certified, CCNA in active lab prep. Textbook study only takes you so far — the real test is whether you can configure a VLAN that doesn&apos;t break the internet, recover a router you&apos;ve locked yourself out of, and design a network that fails gracefully. I needed a lab I owned, with real consequences when something went wrong.
            </p>
          </div>
          <div>
            <h2 className="font-mono text-xs text-[#CCFF00] tracking-widest uppercase mb-4">WHAT I BUILT</h2>
            <p className="font-inter text-base text-[#6B6B6B] leading-relaxed mb-4">
              A production home network and a dedicated VLAN 40 lab segment running side-by-side. The production side handles real traffic: a MikroTik hAP ac² as the main gateway, a Grandstream GWN7711P managed switch, Synology DS425+ NAS, HP ProDesk i7 running 25+ Docker containers, and 3× TP-Link HX510 as a Wi-Fi 6E wireless mesh. Five VLANs segment management, trusted devices, IoT, lab gear, and the wireless mesh.
            </p>
            <p className="font-inter text-base text-[#6B6B6B] leading-relaxed">
              The lab segment (VLAN 40) is a separate routed network with a MikroTik CCR1009 as its gateway and three hAP ac² routers as lab nodes — dedicated hardware for OSPF, BGP, WireGuard, and routing protocol experiments without touching the production network. I can break it completely and rebuild it without the household losing internet.
            </p>
          </div>
          <div>
            <h2 className="font-mono text-xs text-[#CCFF00] tracking-widest uppercase mb-4">MONITORING & AUTOMATION</h2>
            <p className="font-inter text-base text-[#6B6B6B] leading-relaxed mb-4">
              The Dude runs on a MikroTik CHR VM on the ProDesk. SNMP-polls every device across all five VLANs. Custom Slack webhooks fire within 90 seconds of any device going offline. I sleep through outages now — alert-to-detection is under 2 minutes.
            </p>
            <p className="font-inter text-base text-[#6B6B6B] leading-relaxed">
              AdGuard Home handles DNS-level ad and tracker blocking for the whole network. Home Assistant runs automations across Tapo smart plugs, cameras, and IR blasters, with Frigate providing local AI object detection on RTSP camera streams. Uptime Kuma monitors every exposed service. Watchtower handles automated Docker image updates. The EcoFlow River 3 Plus provides UPS, with NUT integration to gracefully shut down the NAS before the battery dies.
            </p>
          </div>
          <div>
            <h2 className="font-mono text-xs text-[#CCFF00] tracking-widest uppercase mb-4">ACCESS & SECURITY</h2>
            <p className="font-inter text-base text-[#6B6B6B] leading-relaxed">
              Cloudflare Tunnel provides zero-trust remote access to internal services — no open ports, no exposed IP, no port forwarding rules. WireGuard VPN for direct access when I need it. All inter-VLAN routing runs through the hAP ac² with explicit firewall rules — IoT devices cannot initiate connections to trusted VLANs. The management VLAN (99) is accessible only from explicitly trusted hosts.
            </p>
          </div>
          <div>
            <h2 className="font-mono text-xs text-[#CCFF00] tracking-widest uppercase mb-4">WHAT I LEARNED</h2>
            <p className="font-inter text-base text-[#6B6B6B] leading-relaxed">
              Working with VLANs in anger is different from reading about them. I&apos;ve locked myself out of the router (twice — the second time I had a recovery runbook). I&apos;ve debugged SNMP authentication failures at 11pm, traced asymmetric routing, and rebuilt firewall rules from scratch after breaking the internet for the whole house. I have runbooks for all of it. That&apos;s the point.
            </p>
          </div>
        </div>

        {/* Stats */}
        <StaggerGrid className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-16">
          {[
            { to: 5, suffix: "", decimals: 0, label: "VLANs" },
            { to: 25, suffix: "+", decimals: 0, label: "Docker services" },
            { to: 12, suffix: "+", decimals: 0, label: "Network devices" },
            { to: 99.8, suffix: "%", decimals: 1, label: "Uptime / 30d" },
          ].map(({ to, suffix, decimals, label }) => (
            <StaggerItem key={label}>
              <div className="bg-[#0F0F0F] border border-white/5 rounded-lg p-4 text-center">
                <div className="font-syne text-2xl font-bold text-[#CCFF00] mb-1">
                  <CountUp to={to} suffix={suffix} decimals={decimals} duration={1600} />
                </div>
                <div className="font-mono text-[10px] text-[#6B6B6B] tracking-widest uppercase">{label}</div>
              </div>
            </StaggerItem>
          ))}
        </StaggerGrid>

        {/* Tech stack */}
        <FadeIn className="mb-16">
          <h2 className="font-mono text-xs text-[#6B6B6B] tracking-widest uppercase mb-4">HARDWARE & STACK</h2>
          <StaggerGrid className="flex flex-wrap gap-2">
            {tech.map((t) => (
              <StaggerItem key={t}>
                <span className="font-mono text-xs bg-white/5 border border-white/10 text-[#F8F8F8] px-3 py-1.5 rounded">{t}</span>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </FadeIn>

        {/* Full diagram CTA */}
        <div className="mb-16 bg-[#CCFF00]/5 border border-[#CCFF00]/20 rounded-lg p-6">
          <h2 className="font-mono text-xs text-[#CCFF00] tracking-widest uppercase mb-3">INTERACTIVE DIAGRAM</h2>
          <p className="font-inter text-sm text-[#6B6B6B] leading-relaxed mb-4">
            The full homelab page has a live animated network topology with tooltips on every node, a complete gear inventory, a full Docker services list (media, home automation, infrastructure), and the VLAN and firewall rule tables.
          </p>
          <Link
            href="/homelab"
            className="inline-flex items-center gap-2 font-mono text-sm font-semibold text-[#0A0A0A] bg-[#CCFF00] px-6 py-3 rounded hover:bg-[#CCFF00]/90 transition-colors"
          >
            View full homelab diagram →
          </Link>
        </div>

        <div className="flex items-center justify-between border-t border-white/5 pt-8">
          <Link href="/work/alana-ruakere" className="font-mono text-xs text-[#6B6B6B] hover:text-[#CCFF00] transition-colors">← Alana Ruakere</Link>
          <Link href="/work" className="font-mono text-xs text-[#6B6B6B] hover:text-[#CCFF00] transition-colors">All Work →</Link>
        </div>
      </div>
    </main>
  );
}
