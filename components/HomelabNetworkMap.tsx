"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import type { Transition } from "framer-motion";

type Tip = { title: string; info: string; x: number; y: number };

const nf = (delay: number) => ({
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, delay } as Transition,
});

const dl = (delay: number) => ({
  initial: { pathLength: 0, opacity: 0 },
  animate: { pathLength: 1, opacity: 1 },
  transition: { duration: 0.7, delay, ease: "easeOut" as const } as Transition,
});

const LEGEND = [
  { label: "Router / routing", color: "#CCFF00" },
  { label: "Switch", color: "#2DD4BF" },
  { label: "NAS / storage", color: "#007BFF" },
  { label: "Compute / servers", color: "#3ECF8E" },
  { label: "Wireless APs", color: "#F59E0B" },
  { label: "IoT · VLAN 30", color: "#F97066" },
  { label: "Lab · VLAN 40", color: "#99CC00" },
];

/** Mono text that clips to a bounding box — prevents text ever escaping its container */
function BText({
  x, y, text, fill = "#A0A0A0", size = 9, weight = "400", anchor = "middle",
  maxWidth,
}: {
  x: number; y: number; text: string; fill?: string; size?: number;
  weight?: string; anchor?: "middle" | "start" | "end"; maxWidth?: number;
}) {
  const style: React.CSSProperties = maxWidth
    ? { overflow: "hidden" }
    : {};
  return (
    <text
      x={x}
      y={y}
      textAnchor={anchor}
      fontFamily="var(--font-mono, monospace)"
      fontSize={size}
      fill={fill}
      fontWeight={weight}
      style={style}
    >
      {maxWidth ? (
        <textPath href="#" textLength={maxWidth} lengthAdjust="spacingAndGlyphs">{text}</textPath>
      ) : text}
    </text>
  );
}

export default function HomelabNetworkMap() {
  const [tip, setTip] = useState<Tip | null>(null);

  const tip$ = (t: string, i: string) => (e: React.MouseEvent) =>
    setTip({ title: t, info: i, x: e.clientX, y: e.clientY });
  const mov$ = (e: React.MouseEvent) =>
    setTip((t) => (t ? { ...t, x: e.clientX, y: e.clientY } : null));
  const hide$ = () => setTip(null);

  const N = (title: string, info: string) => ({
    onMouseEnter: tip$(title, info),
    onMouseLeave: hide$,
    style: { cursor: "pointer" as const },
  });

  return (
    <div className="relative">
      {/* Legend */}
      <div className="flex flex-wrap gap-x-4 gap-y-2 mb-3 sm:mb-4">
        {LEGEND.map(({ label, color }) => (
          <div key={label} className="flex items-center gap-2 font-mono text-[10px] text-[#6B6B6B]">
            <div className="w-2.5 h-2.5 rounded-[2px] shrink-0" style={{ backgroundColor: color }} />
            {label}
          </div>
        ))}
        <div className="ml-auto font-mono text-[10px] text-[#4B4B4B] italic hidden sm:block">
          Hover nodes for details
        </div>
      </div>

      {/* Mobile hint */}
      <p className="sm:hidden font-mono text-[10px] text-[#4B4B4B] text-center mb-2">
        ← swipe to explore · tap nodes for details →
      </p>

      {/* Diagram — horizontally scrollable, preserves pixel-perfect layout */}
      <div
        className="overflow-x-auto bg-[#080808] border border-white/5 rounded-lg p-3 sm:p-6"
        style={{ WebkitOverflowScrolling: "touch" as const }}
      >
        <svg
          className="block"
          width="1500"
          height="820"
          viewBox="0 0 1500 820"
          xmlns="http://www.w3.org/2000/svg"
          onMouseMove={mov$}
          style={{ minWidth: 900, maxWidth: "100%" }}
        >
          <defs>
            {/* Arrow markers */}
            {[
              { id: "arr",   stroke: "#6B6B6B" },
              { id: "arr-p", stroke: "#CCFF00" },
              { id: "arr-t", stroke: "#2DD4BF" },
              { id: "arr-a", stroke: "#F59E0B" },
              { id: "arr-c", stroke: "#F97066" },
              { id: "arr-g", stroke: "#3ECF8E" },
            ].map(({ id, stroke }) => (
              <marker key={id} id={id} viewBox="0 0 10 10" refX="8" refY="5"
                markerWidth="5" markerHeight="5" orient="auto-start-reverse">
                <path d="M2 1L8 5L2 9" fill="none" stroke={stroke}
                  strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </marker>
            ))}
            {/* Clip paths for boxes that contain text */}
            <clipPath id="clip-iot">
              <rect x="1048" y="318" width="186" height="294" rx="4"/>
            </clipPath>
            <clipPath id="clip-lab-cases">
              <rect x="30" y="330" width="336" height="226" rx="4"/>
            </clipPath>
            <clipPath id="clip-prodesk-svc">
              <rect x="658" y="380" width="176" height="178" rx="4"/>
            </clipPath>
          </defs>

          {/* ══════════════════════════════════════════
              LAB NETWORK — left column
          ══════════════════════════════════════════ */}

          {/* Lab outer boundary */}
          <rect x="18" y="18" width="360" height="740"
            rx="10" fill="rgba(204,255,0,0.02)"
            stroke="rgba(204,255,0,0.18)" strokeWidth="1.5" strokeDasharray="8 4"/>
          <text x="198" y="40" textAnchor="middle"
            fontFamily="var(--font-mono,monospace)" fontSize="10"
            fill="#7A9900" fontWeight="700" letterSpacing="2">
            LAB NETWORK · VLAN 40
          </text>
          <text x="198" y="57" textAnchor="middle"
            fontFamily="var(--font-mono,monospace)" fontSize="9" fill="#2A3300">
            CCR1009 · GWN7710 · 3× hAP ac²
          </text>

          {/* CCR1009 lab gateway */}
          <motion.g {...nf(0.1)} {...N(
            "MikroTik CCR1009-8G-1S-PC",
            "9-core TILERA 1GHz · 1GB RAM · RouterOS L6 · 8×1G + 1×SFP(1G) · Passive cooling · Lab gateway · Connects to prod switch via VLAN 40 trunk · MTCNA/CCNA multi-router practice"
          )}>
            <rect x="80" y="74" width="236" height="52" rx="6"
              fill="rgba(204,255,0,0.06)" stroke="#CCFF00" strokeWidth="1.5"/>
            <text x="198" y="95" textAnchor="middle"
              fontFamily="var(--font-mono,monospace)" fontSize="11"
              fill="#CCFF00" fontWeight="700">CCR1009-8G-1S-PC</text>
            <text x="198" y="113" textAnchor="middle"
              fontFamily="var(--font-mono,monospace)" fontSize="9"
              fill="#99CC00">Lab gateway · 192.168.40.10</text>
          </motion.g>

          <motion.path {...dl(0.3)}
            d="M 198 126 L 198 176"
            fill="none" stroke="#99CC00" strokeWidth="1.5" markerEnd="url(#arr-p)"/>
          <text x="212" y="156" fontFamily="var(--font-mono,monospace)"
            fontSize="9" fill="#7A9900">1G trunk</text>

          {/* GWN7710 unmanaged switch */}
          <motion.g {...nf(0.2)} {...N(
            "GWN7710 (unmanaged switch)",
            "Unmanaged L2 switch · No VLAN support · Flat lab L2 topology · Connects CCR1009 to hAP ac² units · STP practice still possible"
          )}>
            <rect x="80" y="176" width="236" height="44" rx="6"
              fill="#0A0A0A" stroke="rgba(255,255,255,0.08)" strokeWidth="1"/>
            <text x="198" y="196" textAnchor="middle"
              fontFamily="var(--font-mono,monospace)" fontSize="11"
              fill="#A0A0A0" fontWeight="500">GWN7710 (unmanaged)</text>
            <text x="198" y="212" textAnchor="middle"
              fontFamily="var(--font-mono,monospace)" fontSize="9"
              fill="#6B6B6B">Lab switch · flat L2 · no VLANs</text>
          </motion.g>

          {/* GWN7710 → 3× hAP ac² */}
          <motion.path {...dl(0.4)} d="M 120 220 L 80 268"
            fill="none" stroke="#6B6B6B" strokeWidth="1.2" markerEnd="url(#arr)"/>
          <motion.path {...dl(0.45)} d="M 198 220 L 198 268"
            fill="none" stroke="#6B6B6B" strokeWidth="1.2" markerEnd="url(#arr)"/>
          <motion.path {...dl(0.5)} d="M 276 220 L 316 268"
            fill="none" stroke="#6B6B6B" strokeWidth="1.2" markerEnd="url(#arr)"/>

          {/* hAP ac² units */}
          {[
            { x: 28, cx: 88, ip: "192.168.40.11", n: "#1", info: "RouterOS · 5×1G · dual-band Wi-Fi · OSPF area 1, eBGP peer, or WireGuard endpoint" },
            { x: 138, cx: 198, ip: "192.168.40.12", n: "#2", info: "RouterOS · 5×1G · dual-band Wi-Fi · Multi-hop topologies, OSPF area 2" },
            { x: 248, cx: 308, ip: "192.168.40.13", n: "#3", info: "RouterOS · 5×1G · dual-band Wi-Fi · 3-router OSPF labs, CAPsMAN wireless controller" },
          ].map(({ x, cx, ip, n, info }, i) => (
            <motion.g key={n} {...nf(0.3 + i * 0.05)} {...N(`MikroTik hAP ac² ${n}`, info)}>
              <rect x={x} y="268" width="120" height="44" rx="6"
                fill="rgba(204,255,0,0.04)" stroke="#99CC00" strokeWidth="1"/>
              <text x={cx} y="286" textAnchor="middle"
                fontFamily="var(--font-mono,monospace)" fontSize="10"
                fill="#CCFF00" fontWeight="500">hAP ac² {n}</text>
              <text x={cx} y="302" textAnchor="middle"
                fontFamily="var(--font-mono,monospace)" fontSize="9"
                fill="#99CC00">{ip}</text>
            </motion.g>
          ))}

          {/* Lab use cases */}
          <motion.g {...nf(0.5)}>
            <rect x="28" y="330" width="340" height="226" rx="6"
              fill="rgba(204,255,0,0.025)" stroke="rgba(204,255,0,0.1)" strokeWidth="1"/>
            <text x="198" y="350" textAnchor="middle"
              fontFamily="var(--font-mono,monospace)" fontSize="9"
              fill="#7A9900" fontWeight="700" letterSpacing="1.5">LAB USE CASES</text>
            <g clipPath="url(#clip-lab-cases)">
              {[
                "MTCNA exam prep — real RouterOS config",
                "OSPF multi-area (3 routers + CCR1009)",
                "eBGP peering between CCR + hAP units",
                "WireGuard site-to-site VPN practice",
                "VLAN + inter-VLAN routing labs",
                "CAPsMAN wireless controller setup",
                "Firewall rule testing (chains)",
                "STP / spanning tree practice",
                "Wireshark packet capture on interfaces",
                "EVE-NG on ProDesk for Cisco IOS/Junos",
                "CCNA ACL, EtherChannel, NAT practice",
              ].map((t, i) => (
                <text key={i} x="46" y={370 + i * 16}
                  fontFamily="var(--font-mono,monospace)" fontSize="9" fill="#5A6600">
                  ▸ {t}
                </text>
              ))}
            </g>
          </motion.g>

          {/* VLAN 40 path: lab area → production switch */}
          <motion.path {...dl(0.6)}
            d="M 198 558 L 198 614"
            fill="none" stroke="#99CC00" strokeWidth="1.5" strokeDasharray="5 3"
            markerEnd="url(#arr-p)"/>
          <text x="212" y="590" fontFamily="var(--font-mono,monospace)" fontSize="8"
            fill="#7A9900">VLAN 40 port on GWN7711P</text>

          {/* Lab access note */}
          <motion.g {...nf(0.55)}>
            <rect x="28" y="626" width="340" height="64" rx="6"
              fill="rgba(255,255,255,0.015)" stroke="rgba(255,255,255,0.05)" strokeWidth="1"/>
            <text x="198" y="645" textAnchor="middle"
              fontFamily="var(--font-mono,monospace)" fontSize="9" fill="#6B6B6B">
              Managed via SSH from VLAN 20 (port 22)
            </text>
            <text x="198" y="661" textAnchor="middle"
              fontFamily="var(--font-mono,monospace)" fontSize="9" fill="#4B4B4B">
              EVE-NG VM on ProDesk for Cisco/Junos topologies
            </text>
            <text x="198" y="677" textAnchor="middle"
              fontFamily="var(--font-mono,monospace)" fontSize="9" fill="#4B4B4B">
              CCR1009 CLI via WinBox or SSH
            </text>
          </motion.g>

          {/* ══════════════════════════════════════════
              PRODUCTION NETWORK — right columns
          ══════════════════════════════════════════ */}

          {/* WAN */}
          <motion.g {...nf(0.05)} {...N(
            "Internet / ISP WAN",
            "PPPoE · Public IP · No CG-NAT · Required for WireGuard inbound and Plex port forward"
          )}>
            <rect x="590" y="18" width="260" height="44" rx="6"
              fill="#0F0F0F" stroke="rgba(255,255,255,0.08)" strokeWidth="1"/>
            <text x="720" y="36" textAnchor="middle"
              fontFamily="var(--font-mono,monospace)" fontSize="11"
              fill="#A0A0A0" fontWeight="500">INTERNET / ISP WAN</text>
            <text x="720" y="52" textAnchor="middle"
              fontFamily="var(--font-mono,monospace)" fontSize="9" fill="#6B6B6B">
              PPPoE · Public IP · no CG-NAT
            </text>
          </motion.g>

          <motion.path {...dl(0.15)} d="M 720 62 L 720 106"
            fill="none" stroke="#6B6B6B" strokeWidth="1.5" markerEnd="url(#arr)"/>
          <text x="734" y="89" fontFamily="var(--font-mono,monospace)"
            fontSize="9" fill="#6B6B6B">1G ether1 (WAN)</text>

          {/* MikroTik hAP ac² — main gateway */}
          <motion.g {...nf(0.2)} {...N(
            "MikroTik hAP ac²",
            "Main gateway router · 192.168.99.1 · RouterOS L4 · 5×1G · Dual-band Wi-Fi 5 · VLAN routing · WireGuard · Firewall · NAT"
          )}>
            <rect x="510" y="106" width="420" height="52" rx="6"
              fill="rgba(204,255,0,0.06)" stroke="#CCFF00" strokeWidth="2"/>
            <text x="720" y="127" textAnchor="middle"
              fontFamily="var(--font-mono,monospace)" fontSize="12"
              fill="#CCFF00" fontWeight="700">MikroTik hAP ac²</text>
            <text x="720" y="147" textAnchor="middle"
              fontFamily="var(--font-mono,monospace)" fontSize="9" fill="#99CC00">
              192.168.99.1 · VLAN router · WireGuard · firewall · NAT
            </text>
          </motion.g>

          {/* WireGuard */}
          <motion.path {...dl(0.4)}
            d="M 930 132 L 988 132"
            fill="none" stroke="#CCFF00" strokeWidth="1" strokeDasharray="5 3"
            markerEnd="url(#arr-p)"/>
          <motion.g {...nf(0.35)} {...N(
            "WireGuard VPN",
            "192.168.177.0/24 · On hAP ac² · Full remote network access · Mobile + laptop clients · Low-latency modern encryption"
          )}>
            <rect x="988" y="110" width="186" height="44" rx="6"
              fill="rgba(204,255,0,0.04)" stroke="#99CC00" strokeWidth="1"/>
            <text x="1081" y="128" textAnchor="middle"
              fontFamily="var(--font-mono,monospace)" fontSize="10"
              fill="#CCFF00" fontWeight="500">WireGuard VPN</text>
            <text x="1081" y="144" textAnchor="middle"
              fontFamily="var(--font-mono,monospace)" fontSize="9" fill="#99CC00">
              192.168.177.0/24
            </text>
          </motion.g>

          {/* VLAN 40 curved uplink: lab → hAP ac² */}
          <motion.path {...dl(0.7)}
            d="M 378 650 Q 460 650 460 400 L 510 132"
            fill="none" stroke="#99CC00" strokeWidth="1" strokeDasharray="6 4"
            markerEnd="url(#arr-p)"/>

          {/* hAP ac² → GWN7711P */}
          <motion.path {...dl(0.25)} d="M 720 158 L 720 212"
            fill="none" stroke="#CCFF00" strokeWidth="1.5" markerEnd="url(#arr-p)"/>
          <text x="734" y="193" fontFamily="var(--font-mono,monospace)"
            fontSize="9" fill="#99CC00">1G copper (LAN trunk)</text>

          {/* Grandstream GWN7711P */}
          <motion.g {...nf(0.3)} {...N(
            "Grandstream GWN7711P",
            "Managed L2 switch · 192.168.99.2 · 2.5G copper ports · SFP+ uplink · 802.1Q VLAN trunks · VLAN 40 port for lab gear · Central distribution for all VLANs"
          )}>
            <rect x="490" y="212" width="460" height="52" rx="6"
              fill="rgba(45,212,191,0.05)" stroke="#2DD4BF" strokeWidth="1.5"/>
            <text x="720" y="233" textAnchor="middle"
              fontFamily="var(--font-mono,monospace)" fontSize="12"
              fill="#5EEAD4" fontWeight="700">Grandstream GWN7711P</text>
            <text x="720" y="251" textAnchor="middle"
              fontFamily="var(--font-mono,monospace)" fontSize="9" fill="#2DD4BF">
              192.168.99.2 · managed · 2.5G · SFP+ · 802.1Q · PoE+
            </text>
          </motion.g>

          {/* VLAN labels row — positioned below the switch, above the branches */}
          <text x="720" y="278" textAnchor="middle"
            fontFamily="var(--font-mono,monospace)" fontSize="8" fill="#3A3A3A">
            VLAN 20 HOME · VLAN 30 IOT · VLAN 40 LAB · VLAN 50 GUEST · VLAN 99 MGMT
          </text>

          {/* Branch lines from switch (start y=264 to avoid overlap with label at y=278) */}
          <motion.path {...dl(0.45)} d="M 560 264 L 530 316"
            fill="none" stroke="#007BFF" strokeWidth="1.5" markerEnd="url(#arr-t)"/>
          <text x="492" y="304" fontFamily="var(--font-mono,monospace)"
            fontSize="8" fill="#6B6B6B">2.5G</text>

          <motion.path {...dl(0.5)} d="M 650 264 L 640 316"
            fill="none" stroke="#3ECF8E" strokeWidth="1.5" markerEnd="url(#arr-g)"/>
          <text x="608" y="304" fontFamily="var(--font-mono,monospace)"
            fontSize="8" fill="#6B6B6B">2.5G</text>

          <motion.path {...dl(0.55)} d="M 790 264 L 846 316"
            fill="none" stroke="#F59E0B" strokeWidth="1.5" markerEnd="url(#arr-a)"/>
          <text x="808" y="304" fontFamily="var(--font-mono,monospace)"
            fontSize="8" fill="#6B6B6B">1G</text>

          <motion.path {...dl(0.6)} d="M 900 264 L 1030 316"
            fill="none" stroke="#F97066" strokeWidth="1.5" markerEnd="url(#arr-c)"/>
          <text x="970" y="290" fontFamily="var(--font-mono,monospace)"
            fontSize="8" fill="#6B6B6B">VLAN 30</text>

          {/* ── NAS column ── */}
          <motion.g {...nf(0.4)} {...N(
            "Synology DS425+",
            "192.168.99.3 · VLAN 99 management · 4-bay SHR RAID · 2.5G port · Remote access via Cloudflare tunnel · NUT UPS via EcoFlow River 3+ · SMB shares for Plex · DSM web UI"
          )}>
            <rect x="450" y="316" width="196" height="52" rx="6"
              fill="rgba(0,123,255,0.06)" stroke="#007BFF" strokeWidth="1"/>
            <text x="548" y="337" textAnchor="middle"
              fontFamily="var(--font-mono,monospace)" fontSize="11"
              fill="#60A5FA" fontWeight="500">Synology DS425+</text>
            <text x="548" y="353" textAnchor="middle"
              fontFamily="var(--font-mono,monospace)" fontSize="9" fill="#007BFF">
              192.168.99.3 · VLAN 99
            </text>
          </motion.g>

          <motion.g {...nf(0.5)}>
            <rect x="450" y="378" width="196" height="82" rx="6"
              fill="rgba(0,123,255,0.03)" stroke="rgba(0,123,255,0.15)" strokeWidth="1"/>
            <text x="548" y="396" textAnchor="middle"
              fontFamily="var(--font-mono,monospace)" fontSize="9" fill="#4B4B4B">
              SERVICES
            </text>
            <text x="548" y="414" textAnchor="middle"
              fontFamily="var(--font-mono,monospace)" fontSize="9" fill="#A0A0A0">
              Cloudflare tunnel
            </text>
            <text x="548" y="430" textAnchor="middle"
              fontFamily="var(--font-mono,monospace)" fontSize="9" fill="#A0A0A0">
              SMB shares · NUT UPS
            </text>
            <text x="548" y="446" textAnchor="middle"
              fontFamily="var(--font-mono,monospace)" fontSize="9" fill="#A0A0A0">
              DSM · Slack alerts
            </text>
          </motion.g>

          {/* EcoFlow River 3 Plus */}
          <motion.g {...nf(0.55)} {...N(
            "EcoFlow River 3 Plus",
            "UPS for NAS + rack · NUT client on NAS triggers graceful DSM shutdown · upssched Slack webhook alerts · Keeps NAS + router + switch alive during short outages"
          )}>
            <rect x="450" y="472" width="196" height="44" rx="6"
              fill="rgba(62,207,142,0.05)" stroke="#3ECF8E" strokeWidth="1"/>
            <text x="548" y="490" textAnchor="middle"
              fontFamily="var(--font-mono,monospace)" fontSize="10"
              fill="#7EEDB8" fontWeight="500">EcoFlow River 3 Plus</text>
            <text x="548" y="506" textAnchor="middle"
              fontFamily="var(--font-mono,monospace)" fontSize="9" fill="#3ECF8E">
              UPS · NUT · Slack alerts
            </text>
          </motion.g>

          {/* ── ProDesk column ── */}
          <motion.g {...nf(0.4)} {...N(
            "HP ProDesk i7 32GB",
            "Main home server · 2.5G wired · Entire Docker stack · Plex, media, home automation, monitoring · Planned Proxmox VE migration with LXC per service group + HAOS VM + The Dude CHR VM + EVE-NG VM"
          )}>
            <rect x="656" y="316" width="180" height="52" rx="6"
              fill="rgba(62,207,142,0.05)" stroke="#3ECF8E" strokeWidth="1.5"/>
            <text x="746" y="337" textAnchor="middle"
              fontFamily="var(--font-mono,monospace)" fontSize="11"
              fill="#7EEDB8" fontWeight="700">HP ProDesk i7 32GB</text>
            <text x="746" y="353" textAnchor="middle"
              fontFamily="var(--font-mono,monospace)" fontSize="9" fill="#3ECF8E">
              Production server · 2.5G
            </text>
          </motion.g>

          <motion.g {...nf(0.5)}>
            <rect x="656" y="378" width="180" height="182" rx="6"
              fill="rgba(62,207,142,0.025)" stroke="rgba(62,207,142,0.15)" strokeWidth="1"/>
            <text x="746" y="396" textAnchor="middle"
              fontFamily="var(--font-mono,monospace)" fontSize="9" fill="#4B4B4B">
              DOCKER SERVICES
            </text>
            <g clipPath="url(#clip-prodesk-svc)">
              {[
                "Plex · Sonarr · Radarr",
                "Tdarr · Prowlarr · Overseerr",
                "FlareSolverr · Uptime Kuma",
                "Home Assistant",
                "Homepage · Frigate",
                "AdGuard Home · NPM",
                "The Dude (CHR VM)",
                "Watchtower · EVE-NG (VM)",
              ].map((s, i) => (
                <text key={i} x="746" y={414 + i * 17}
                  textAnchor="middle"
                  fontFamily="var(--font-mono,monospace)" fontSize="9" fill="#3ECF8E">
                  {s}
                </text>
              ))}
            </g>
          </motion.g>

          {/* ── Wi-Fi mesh column ── */}
          <motion.g {...nf(0.4)} {...N(
            "TP-Link HX510 #1 (main)",
            "Wi-Fi 6E · AXE5400 · Tri-band wireless mesh · Wired main node · Connected to GWN7711P · 802.1Q VLAN trunk · Broadcasts Home / IoT / Guest SSIDs"
          )}>
            <rect x="848" y="316" width="186" height="44" rx="6"
              fill="rgba(245,158,11,0.06)" stroke="#F59E0B" strokeWidth="1.5"/>
            <text x="941" y="334" textAnchor="middle"
              fontFamily="var(--font-mono,monospace)" fontSize="10"
              fill="#FCD34D" fontWeight="500">TP-Link HX510 #1 (main)</text>
            <text x="941" y="350" textAnchor="middle"
              fontFamily="var(--font-mono,monospace)" fontSize="9" fill="#F59E0B">
              Wi-Fi 6E · wired · VLAN trunk
            </text>
          </motion.g>

          <motion.g {...nf(0.5)}>
            <rect x="848" y="370" width="186" height="64" rx="6"
              fill="rgba(245,158,11,0.03)" stroke="rgba(245,158,11,0.15)" strokeWidth="1"/>
            <text x="941" y="388" textAnchor="middle"
              fontFamily="var(--font-mono,monospace)" fontSize="9" fill="#4B4B4B">
              SSIDS
            </text>
            {["Home → VLAN 20", "IoT  → VLAN 30", "Guest→ VLAN 50"].map((s, i) => (
              <text key={i} x="941" y={404 + i * 16}
                textAnchor="middle"
                fontFamily="var(--font-mono,monospace)" fontSize="9" fill="#FCD34D">
                {s}
              </text>
            ))}
          </motion.g>

          <motion.path {...dl(0.6)} d="M 941 434 L 941 462"
            fill="none" stroke="#F59E0B" strokeWidth="1.5" strokeDasharray="6 4"
            markerEnd="url(#arr-a)"/>
          <text x="955" y="453" fontFamily="var(--font-mono,monospace)"
            fontSize="8" fill="#92400E">Wireless mesh</text>

          <motion.g {...nf(0.55)} {...N(
            "TP-Link HX510 #2 (node)",
            "Wi-Fi 6E · AXE5400 · Wireless mesh node · Wireless backhaul to HX510 #1 · No ethernet run · VLAN-aware over mesh"
          )}>
            <rect x="848" y="462" width="186" height="44" rx="6"
              fill="rgba(245,158,11,0.04)" stroke="#F59E0B" strokeWidth="1"/>
            <text x="941" y="480" textAnchor="middle"
              fontFamily="var(--font-mono,monospace)" fontSize="10"
              fill="#FCD34D" fontWeight="500">TP-Link HX510 #2 (node)</text>
            <text x="941" y="496" textAnchor="middle"
              fontFamily="var(--font-mono,monospace)" fontSize="9" fill="#F59E0B">
              Wireless mesh · backhaul
            </text>
          </motion.g>

          <motion.path {...dl(0.65)} d="M 941 506 L 941 534"
            fill="none" stroke="#F59E0B" strokeWidth="1.5" strokeDasharray="6 4"
            markerEnd="url(#arr-a)"/>
          <text x="955" y="525" fontFamily="var(--font-mono,monospace)"
            fontSize="8" fill="#92400E">Wireless mesh</text>

          <motion.g {...nf(0.6)} {...N(
            "TP-Link HX510 #3 (node)",
            "Wi-Fi 6E · AXE5400 · Wireless mesh node · Wireless backhaul to HX510 #2 · Extends coverage to all rooms · VLAN-aware over mesh"
          )}>
            <rect x="848" y="534" width="186" height="44" rx="6"
              fill="rgba(245,158,11,0.04)" stroke="#F59E0B" strokeWidth="1"/>
            <text x="941" y="552" textAnchor="middle"
              fontFamily="var(--font-mono,monospace)" fontSize="10"
              fill="#FCD34D" fontWeight="500">TP-Link HX510 #3 (node)</text>
            <text x="941" y="568" textAnchor="middle"
              fontFamily="var(--font-mono,monospace)" fontSize="9" fill="#F59E0B">
              Wireless mesh · backhaul
            </text>
          </motion.g>

          {/* ── IoT VLAN 30 column ── */}
          {/*  Box sized to fit all 11 devices + 3 rule lines with 16px top/bottom padding */}
          <motion.g {...nf(0.5)} {...N(
            "IoT devices · VLAN 30",
            "All isolated on VLAN 30 · Home Assistant controls via intra-VLAN rules · Frigate gets Tapo C211 + C201 RTSP streams · Blocked from Home, Lab, Mgmt VLANs · AdGuard filters DNS for all devices"
          )}>
            <rect x="1048" y="316" width="190" height="306" rx="6"
              fill="rgba(249,112,102,0.04)" stroke="#F97066" strokeWidth="1"/>
            <text x="1143" y="336" textAnchor="middle"
              fontFamily="var(--font-mono,monospace)" fontSize="9" fill="#4B4B4B">
              IOT · VLAN 30
            </text>
            <g clipPath="url(#clip-iot)">
              {[
                "Tapo C211 camera",
                "Tapo C201 camera",
                "Tapo P110M plugs ×2",
                "Tapo P110 plug ×1",
                "Tapo L530 bulbs ×2",
                "Tapo H110 hub + IR",
                "Tapo L900 LED strip",
                "Tapo temp/humidity",
                "Echo Pop ×2",
                "Samsung TV (Tizen)",
                "AC (via IR blaster)",
              ].map((d, i) => (
                <text key={i} x="1143" y={356 + i * 17}
                  textAnchor="middle"
                  fontFamily="var(--font-mono,monospace)" fontSize="9" fill="#FCA5A5">
                  {d}
                </text>
              ))}
              {/* Rule lines — separated from device list */}
              <text x="1143" y="560" textAnchor="middle"
                fontFamily="var(--font-mono,monospace)" fontSize="8" fill="#7F1D1D">
                blocked → Home/Lab/Mgmt
              </text>
              <text x="1143" y="576" textAnchor="middle"
                fontFamily="var(--font-mono,monospace)" fontSize="8" fill="#7F1D1D">
                HA controls intra-VLAN only
              </text>
              <text x="1143" y="592" textAnchor="middle"
                fontFamily="var(--font-mono,monospace)" fontSize="8" fill="#7F1D1D">
                Frigate RTSP stream only
              </text>
            </g>
          </motion.g>

          {/* ══════════════════════════════════════════
              REMOTE ACCESS — bottom row
          ══════════════════════════════════════════ */}

          {/* Section header */}
          <rect x="450" y="660" width="832" height="14" rx="3"
            fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" strokeDasharray="4 3"/>
          <text x="866" y="671" textAnchor="middle"
            fontFamily="var(--font-mono,monospace)" fontSize="9" fill="#3A3A3A">
            REMOTE ACCESS
          </text>

          {/* Four remote-access boxes */}
          {[
            { x: 450,  cx: 560,  title: "Plex port forward",  sub: "TCP 32400 → ProDesk", color: "#99CC00", border: "#99CC00" },
            { x: 676,  cx: 786,  title: "Cloudflare tunnel",  sub: "HTTPS · NAS / ProDesk", color: "#99CC00", border: "#99CC00" },
            { x: 902,  cx: 1012, title: "The Dude (CHR VM)",  sub: "SNMP · Slack · Better Stack", color: "#99CC00", border: "#99CC00" },
            { x: 1128, cx: 1238, title: "AdGuard Home",       sub: "DNS blocking · all VLANs", color: "#7EEDB8", border: "rgba(62,207,142,0.3)" },
          ].map(({ x, cx, title, sub, color, border }, i) => (
            <motion.g key={title} {...nf(0.6 + i * 0.05)}>
              <rect x={x} y="684" width="220" height="46" rx="6"
                fill="rgba(204,255,0,0.03)" stroke={border} strokeWidth="1"/>
              <text x={cx} y="703" textAnchor="middle"
                fontFamily="var(--font-mono,monospace)" fontSize="10"
                fill={color} fontWeight="500">
                {title}
              </text>
              <text x={cx} y="720" textAnchor="middle"
                fontFamily="var(--font-mono,monospace)" fontSize="9" fill="#99CC00">
                {sub}
              </text>
            </motion.g>
          ))}
        </svg>
      </div>

      {/* Tooltip */}
      {tip && (
        <div
          className="fixed z-[200] bg-[#111111] border border-white/10 rounded-lg px-4 py-3 max-w-xs pointer-events-none shadow-2xl"
          style={{ left: tip.x + 16, top: tip.y + 16 }}
        >
          <div className="font-mono text-xs font-bold text-[#CCFF00] mb-1.5">{tip.title}</div>
          <div className="font-mono text-[10px] text-[#6B6B6B] leading-relaxed">{tip.info}</div>
        </div>
      )}
    </div>
  );
}
