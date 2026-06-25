import type { Metadata } from "next";
import HomelabPanel from "@/components/HomelabPanel";
import GlitchText from "@/components/GlitchText";
import CountUp from "@/components/CountUp";
import { FadeUp, StaggerGrid, StaggerItem } from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "Homelab — CORE_LAB",
  description: "VLAN-segmented homelab — MikroTik hAP ac² + Grandstream switch + Synology DS425+ + HP ProDesk + 3× TP-Link HX510 Wi-Fi 6E mesh. 5 VLANs, a dedicated lab segment with CCR1009 and 3× hAP ac², and a full Docker service stack. MTCNA certified. CCNA in progress.",
};

export default function HomelabPage() {
  return (
    <main style={{ background: "#0A0A0A" }} className="min-h-screen">
      <div className="max-w-7xl mx-auto px-6 pt-28 pb-24">

        <FadeUp>
          <span className="font-mono text-xs text-[#CCFF00] tracking-widest uppercase">HOMELAB</span>
          <h1 className="font-syne text-5xl sm:text-6xl font-bold text-[#F8F8F8] mt-3 mb-5">
            <GlitchText intensity="high">CORE_LAB</GlitchText>
          </h1>
          <p className="font-inter text-base text-[#6B6B6B] leading-relaxed max-w-2xl mb-4">
            VLAN-segmented production network built for real work and exam prep. MikroTik hAP ac² router,
            Grandstream GWN7711P managed switch, Synology DS425+ NAS, HP ProDesk server, 3× TP-Link HX510 Wi-Fi 6E mesh —
            all wired, monitored, and automated.
          </p>
          <p className="font-inter text-base text-[#6B6B6B] leading-relaxed max-w-2xl mb-8">
            A dedicated VLAN 40 lab segment runs a CCR1009 gateway and three hAP ac² routers for hands-on
            OSPF, BGP, and WireGuard practice. MTCNA certified — currently working toward CCNA.
          </p>
        </FadeUp>

        {/* Stats tiles */}
        <StaggerGrid className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {[
            { to: 5, suffix: "", decimals: 0, label: "VLANs" },
            { to: 25, suffix: "+", decimals: 0, label: "Services" },
            { to: 12, suffix: "+", decimals: 0, label: "Devices" },
            { to: 99.8, suffix: "%", decimals: 1, label: "Uptime" },
          ].map(({ to, suffix, decimals, label }) => (
            <StaggerItem key={label}>
              <div className="bg-[#0F0F0F] border border-white/5 rounded-lg p-3 text-center">
                <div className="font-syne text-2xl font-bold text-[#CCFF00]">
                  <CountUp to={to} suffix={suffix} decimals={decimals} duration={1600} />
                </div>
                <div className="font-mono text-[9px] text-[#6B6B6B] tracking-widest uppercase mt-0.5">{label}</div>
              </div>
            </StaggerItem>
          ))}
        </StaggerGrid>

        <FadeUp delay={0.1} className="flex flex-wrap gap-3 mb-14">
          {[
            { label: "MikroTik hAP ac²", color: "#CCFF00" },
            { label: "Synology DS425+", color: "#007BFF" },
            { label: "HP ProDesk i7", color: "#3ECF8E" },
            { label: "3× TP-Link HX510", color: "#F59E0B" },
            { label: "MTCNA", color: "#99CC00" },
            { label: "CCNA prep", color: "#99CC00" },
            { label: "WireGuard VPN", color: "#CCFF00" },
            { label: "Cloudflare Tunnel", color: "#F97066" },
          ].map(({ label, color }) => (
            <span key={label} className="font-mono text-xs bg-white/5 border border-white/10 text-[#F8F8F8] px-3 py-1.5 rounded flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: color }} />
              {label}
            </span>
          ))}
        </FadeUp>

        <HomelabPanel />
      </div>
    </main>
  );
}
