"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import HomelabNetworkMap from "./HomelabNetworkMap";

type Tab = "map" | "gear" | "services" | "vlans";

const TABS: { id: Tab; label: string }[] = [
  { id: "map", label: "Network Map" },
  { id: "gear", label: "Gear" },
  { id: "services", label: "Services" },
  { id: "vlans", label: "VLANs & Firewall" },
];

const BADGE: Record<string, string> = {
  ROUTER: "text-[#CCFF00] border-[#CCFF00]/30 bg-[#CCFF00]/10",
  SWITCH: "text-[#2DD4BF] border-[#2DD4BF]/30 bg-[#2DD4BF]/10",
  NAS: "text-[#60A5FA] border-[#60A5FA]/30 bg-[#60A5FA]/10",
  COMPUTE: "text-[#3ECF8E] border-[#3ECF8E]/30 bg-[#3ECF8E]/10",
  LAPTOP: "text-[#3ECF8E] border-[#3ECF8E]/30 bg-[#3ECF8E]/10",
  AP: "text-[#F59E0B] border-[#F59E0B]/30 bg-[#F59E0B]/10",
  UPS: "text-[#6B6B6B] border-[#6B6B6B]/30 bg-[#6B6B6B]/10",
  IOT: "text-[#F97066] border-[#F97066]/30 bg-[#F97066]/10",
  "LAB ROUTER": "text-[#99CC00] border-[#99CC00]/30 bg-[#99CC00]/10",
  LAB: "text-[#99CC00] border-[#99CC00]/30 bg-[#99CC00]/10",
  "LAB SWITCH": "text-[#6B6B6B] border-[#6B6B6B]/30 bg-[#6B6B6B]/10",
};

interface GearCard { name: string; badge: string; desc: string; tags: string[] }
interface ServiceCard { name: string; desc: string; host: string }

const PRODUCTION: GearCard[] = [
  { name: "MikroTik hAP ac²", badge: "ROUTER", desc: "Main gateway router. RouterOS L4. 5×1G ports. Dual-band Wi-Fi 5 (AC1900). All VLAN routing, firewall, NAT, and WireGuard on one box. 1G copper uplink to switch.", tags: ["192.168.99.1", "VLAN 99", "WireGuard", "RouterOS L4", "5×1G"] },
  { name: "Grandstream GWN7711P", badge: "SWITCH", desc: "Managed L2 switch. 2.5G ports to NAS and ProDesk. SFP+ uplink. PoE+ available. 802.1Q VLAN trunks carry all five VLANs.", tags: ["192.168.99.2", "2.5G", "SFP+", "PoE+", "802.1Q"] },
  { name: "Synology DS425+", badge: "NAS", desc: "4-bay NAS on SHR RAID. 2.5G port. VLAN 99. Remote access via Cloudflare tunnel. EcoFlow UPS via NUT with graceful DSM shutdown and Slack alerts.", tags: ["192.168.99.3", "SHR RAID", "Cloudflare tunnel", "NUT UPS"] },
  { name: "HP ProDesk i7 32GB", badge: "COMPUTE", desc: "Main home server. Runs the entire Docker stack — media, home automation, monitoring. 2.5G NIC. Planned Proxmox VE migration with LXC per service group and dedicated VMs.", tags: ["Production server", "Docker", "2.5G", "Proxmox planned"] },
  { name: "3× TP-Link HX510", badge: "AP", desc: "Wi-Fi 6E wireless mesh system. Main node wired to switch with VLAN trunk. Two satellite nodes extend coverage wirelessly. VLAN-aware — Home, IoT, and Guest SSIDs across all units.", tags: ["Wi-Fi 6E", "Wireless mesh", "VLAN trunk", "AXE5400"] },
  { name: "EcoFlow River 3 Plus", badge: "UPS", desc: "UPS for NAS and rack. NUT triggers graceful DSM shutdown on power loss. Slack webhook alerts. Keeps router and switch alive during short outages.", tags: ["NUT", "DSM shutdown", "Slack alerts"] },
];

const LAB_GEAR: GearCard[] = [
  { name: "MikroTik CCR1009-8G-1S-PC", badge: "LAB ROUTER", desc: "Secondhand 9-core TILERA 1GHz, 1GB RAM, RouterOS L6. Passive cooling. Lab gateway. Multi-router BGP, OSPF, MPLS practice for MTCNA/CCNA.", tags: ["VLAN 40", "9-core", "RouterOS L6", "MTCNA"] },
  { name: "3× MikroTik hAP ac²", badge: "LAB", desc: "Three hAP ac² units as lab nodes. 3-router OSPF areas, eBGP peering, CAPsMAN wireless labs. Real RouterOS, real exam prep.", tags: ["VLAN 40", "RouterOS", "MTCNA/CCNA"] },
  { name: "GWN7710 (unmanaged)", badge: "LAB SWITCH", desc: "Unmanaged L2 switch connecting lab routers. Flat L2 topology within VLAN 40. Good for STP practice and multi-router lab segments.", tags: ["VLAN 40", "Unmanaged", "STP practice"] },
];

const SMART_HOME: GearCard[] = [
  { name: "Tapo C211 camera", badge: "IOT", desc: "RTSP stream to Frigate NVR on ProDesk. AI object detection. Events fire Home Assistant automations. VLAN 30, isolated from home devices.", tags: ["VLAN 30", "Frigate", "RTSP"] },
  { name: "Tapo C201 camera", badge: "IOT", desc: "1080p indoor IP camera. RTSP stream to Frigate NVR for motion detection and recording. VLAN 30, isolated from home devices.", tags: ["VLAN 30", "Frigate", "RTSP"] },
  { name: "Tapo H110 hub + IR blaster", badge: "IOT", desc: "Smart hub with IR blaster controlling AC via Home Assistant. Pairs with temp/humidity sensor for automated AC triggers.", tags: ["VLAN 30", "IR blaster", "AC control"] },
  { name: "Tapo plugs, bulbs, LED strip", badge: "IOT", desc: "P110M plugs ×2, P110 plug ×1, L530 bulbs ×2, L900 LED strip. All HA-controlled. P110 plugs give energy monitoring — track rack power draw.", tags: ["VLAN 30", "HA control", "Energy monitor"] },
];

const MEDIA: ServiceCard[] = [
  { name: "Plex", desc: "Media server with Plex Pass. Remote access via TCP port forward. Hardware transcoding. Libraries on NAS via SMB.", host: "ProDesk" },
  { name: "Sonarr", desc: "TV show management. Monitors RSS, grabs via Prowlarr. Auto-renames and moves to Plex library.", host: "ProDesk" },
  { name: "Radarr", desc: "Movie management. Same pipeline as Sonarr. Integrates with Overseerr. Custom quality profiles.", host: "ProDesk" },
  { name: "Tdarr", desc: "Media transcoding automation. Converts library to H.265/HEVC to save storage. Slack notifications on job completion.", host: "ProDesk" },
  { name: "Prowlarr", desc: "Central indexer manager for all arr apps. Manages tracker credentials centrally.", host: "ProDesk" },
  { name: "Overseerr", desc: "Media request interface. Routes approved requests to Radarr/Sonarr. Plex availability check.", host: "ProDesk" },
  { name: "FlareSolverr", desc: "Cloudflare bypass proxy for Prowlarr. Handles JS challenges from bot-protected trackers.", host: "ProDesk" },
  { name: "qBittorrent", desc: "Torrent download client. Integrated with Sonarr, Radarr, and Prowlarr for automated media acquisition.", host: "ProDesk" },
  { name: "Audiobookshelf", desc: "Self-hosted audiobook and podcast server. Streams to mobile apps. Library stored on NAS.", host: "ProDesk" },
  { name: "LazyLibrarian", desc: "Book and magazine download manager. Monitors for new releases and automates acquisition.", host: "ProDesk" },
  { name: "Listenarr", desc: "Podcast management. Automatic episode downloads and library organisation.", host: "ProDesk" },
  { name: "Corruption Scan", desc: "Automated media integrity scanner. Detects corrupted video files across Plex libraries and logs results.", host: "ProDesk · cron" },
];

const HOME_AUTO: ServiceCard[] = [
  { name: "Home Assistant", desc: "Home automation hub. Controls Tapo devices, Echo Pops, Samsung TV, Frigate events, AC via IR blaster. Target: HAOS VM on Proxmox.", host: "ProDesk → VLAN 30" },
  { name: "Matter Server", desc: "Home Assistant Matter protocol bridge. Handles Thread/Matter device commissioning and control.", host: "ProDesk" },
  { name: "Mosquitto", desc: "MQTT broker. Connects sensors, Tapo devices, and Home Assistant via pub/sub messaging.", host: "ProDesk · all VLANs" },
  { name: "Frigate", desc: "Local NVR with AI object detection. Tapo C211 + C201 RTSP streams. People/motion events fire Home Assistant automations.", host: "ProDesk · RTSP from VLAN 30" },
  { name: "Frigate Notify", desc: "Push notification service for Frigate detection events. Filters and routes camera alerts to mobile devices.", host: "ProDesk" },
  { name: "Media Notify", desc: "Custom notification service for media events — new downloads, failed grabs, and library updates.", host: "ProDesk" },
];

const INFRA: ServiceCard[] = [
  { name: "AdGuard Home", desc: "DNS-level ad and tracker blocking for all VLANs. Upstream DNS on hAP ac². Custom per-device rules. IoT DNS logs reveal call-home patterns.", host: "ProDesk · all VLANs" },
  { name: "Nginx Proxy Manager", desc: "Reverse proxy with Let's Encrypt SSL. Subdomain routing for internal services via Cloudflare DNS challenge.", host: "ProDesk" },
  { name: "Homepage", desc: "Cyberpunk glassmorphic dashboard. Service status, NAS stats, network info, quick links, Plex activity.", host: "ProDesk" },
  { name: "Glances", desc: "Web-based system monitoring. Real-time CPU, RAM, disk, network, and Docker container stats.", host: "ProDesk" },
  { name: "Uptime Kuma", desc: "Self-hosted uptime monitor. Slack alerts on downtime. Better Stack heartbeat per device.", host: "ProDesk" },
  { name: "Docmost", desc: "Self-hosted documentation wiki. Internal runbooks, network diagrams, homelab notes. Postgres + Redis backend.", host: "ProDesk" },
  { name: "The Dude (CHR VM)", desc: "MikroTik network monitor. SNMP polls hAP ac², switch, NAS, APs. VLAN sub-maps. Slack webhook alerts.", host: "ProDesk · CHR VM" },
  { name: "EVE-NG (VM)", desc: "Network emulation platform. Cisco IOS, Junos, and Arista topologies for CCNA/CCNP lab practice.", host: "ProDesk · KVM VM" },
  { name: "Cloudflare Tunnel", desc: "Zero-trust remote access. HTTPS tunnel via Cloudflare edge — no open ports. DSM and services accessible externally.", host: "NAS · VLAN 99" },
  { name: "F1 Automation", desc: "Custom F1 race data project. Automatically grabs race schedules, results, and standings. Logs to file and notifies.", host: "ProDesk · custom" },
  { name: "Watchtower", desc: "Automatic Docker container updates. Pulls new images and recreates containers on schedule.", host: "ProDesk" },
];

const VLANS = [
  { id: 20, name: "Home", subnet: "192.168.20.0/24", devices: "Phones, trusted devices, admin hosts", color: "#CCFF00", note: "Trusted. Can SSH to VLAN 40 port 22." },
  { id: 30, name: "IoT", subnet: "192.168.30.0/24", devices: "All Tapo, Echo Pop, TV", color: "#F97066", note: "Intra-VLAN allowed for HA. Blocked from Home/Lab/Mgmt." },
  { id: 40, name: "Lab", subnet: "192.168.40.0/24", devices: "CCR1009, 3× hAP ac², GWN7710", color: "#3ECF8E", note: "Lab routers only. Reaches NAS only. Blocked from VLAN 20." },
  { id: 50, name: "Guest", subnet: "192.168.50.0/24", devices: "Guest Wi-Fi SSID", color: "#F59E0B", note: "Internet only. Fully isolated." },
  { id: 99, name: "Mgmt", subnet: "192.168.99.0/24", devices: "hAP ac², switch, NAS, APs, ProDesk", color: "#2DD4BF", note: "Management and infrastructure. VLAN 40 scoped to NAS IP only." },
];

const FW_RULES = [
  { allow: true, rule: "Established/related — accept (stateful fast path)" },
  { allow: true, rule: "VLAN 20 → internet — accept" },
  { allow: true, rule: "VLAN 20 → VLAN 40 port 22 — accept (SSH: laptop → lab gear)" },
  { allow: true, rule: "VLAN 40 → internet — accept (lab routers need WAN for updates)" },
  { allow: true, rule: "VLAN 40 → 192.168.99.3 only — accept (lab gear to NAS, scoped)" },
  { allow: true, rule: "VLAN 99 → any — accept (management and infrastructure devices)" },
  { allow: true, rule: "VLAN 30 intra-IoT — accept (Home Assistant controls Tapo devices)" },
  { allow: true, rule: "VLAN 30 → internet — accept (Tapo cloud, Echo, TV streaming)" },
  { allow: false, rule: "IoT → Home (VLAN 20) — drop" },
  { allow: false, rule: "IoT → Lab (VLAN 40) — drop" },
  { allow: false, rule: "IoT → Mgmt (VLAN 99) — drop" },
  { allow: false, rule: "Guest → Home — drop" },
  { allow: false, rule: "Lab → Home — drop" },
  { allow: false, rule: "WAN → router input — drop" },
  { allow: false, rule: "Default deny — drop all unmatched" },
];

function GearSection({ items, title }: { items: GearCard[]; title: string }) {
  return (
    <div className="mb-12">
      <div className="font-mono text-[10px] text-[#6B6B6B] tracking-widest uppercase mb-4 flex items-center gap-3">
        {title}
        <span className="flex-1 h-px bg-white/5" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((g, i) => (
          <motion.div
            key={g.name}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.35, delay: i * 0.07 }}
            className="bg-[#0F0F0F] border border-white/5 rounded-lg p-5 hover:border-white/10 transition-colors"
          >
            <div className="flex items-start justify-between mb-3">
              <p className="font-mono text-xs font-bold text-[#F8F8F8] leading-snug pr-2">{g.name}</p>
              <span className={`font-mono text-[9px] font-bold tracking-wider px-2 py-0.5 rounded border whitespace-nowrap shrink-0 ${BADGE[g.badge] ?? ""}`}>{g.badge}</span>
            </div>
            <p className="font-inter text-xs text-[#6B6B6B] leading-relaxed mb-3">{g.desc}</p>
            <div className="flex flex-wrap gap-1.5">
              {g.tags.map((t) => (
                <span key={t} className="font-mono text-[9px] bg-white/5 text-[#6B6B6B] px-2 py-0.5 rounded border border-white/5">{t}</span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function ServiceGrid({ items, title }: { items: ServiceCard[]; title: string }) {
  return (
    <div className="mb-10">
      <div className="font-mono text-[10px] text-[#6B6B6B] tracking-widest uppercase mb-4 flex items-center gap-3">
        {title}
        <span className="flex-1 h-px bg-white/5" />
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {items.map((s, i) => (
          <motion.div
            key={s.name}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
            className="bg-[#0F0F0F] border border-white/5 rounded-lg p-4"
          >
            <p className="font-mono text-[10px] font-bold text-[#F8F8F8] uppercase tracking-wider mb-2">{s.name}</p>
            <p className="font-inter text-xs text-[#6B6B6B] leading-relaxed mb-2">{s.desc}</p>
            <p className="font-mono text-[9px] text-[#4B4B4B]">{s.host}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default function HomelabPanel() {
  const [active, setActive] = useState<Tab>("map");

  return (
    <div>
      {/* Tabs */}
      <div className="flex gap-1 mb-8 bg-[#0D0D0D] border border-white/5 rounded-lg p-1 overflow-x-auto">
        {TABS.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => setActive(id)}
            className={`font-mono text-[10px] tracking-widest uppercase px-3 sm:px-4 py-2 rounded-md transition-all whitespace-nowrap shrink-0 ${
              active === id
                ? "bg-[#111] text-[#CCFF00] border border-white/10"
                : "text-[#6B6B6B] hover:text-[#F8F8F8]"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Network Map */}
      {active === "map" && <HomelabNetworkMap />}

      {/* Gear */}
      {active === "gear" && (
        <div>
          <GearSection items={PRODUCTION} title="Production gear" />
          <GearSection items={LAB_GEAR} title="Lab gear · VLAN 40 (routers only)" />
          <GearSection items={SMART_HOME} title="Smart home · VLAN 30" />
        </div>
      )}

      {/* Services */}
      {active === "services" && (
        <div>
          <ServiceGrid items={MEDIA} title="Media stack · ProDesk" />
          <ServiceGrid items={HOME_AUTO} title="Home automation · VLAN 30" />
          <ServiceGrid items={INFRA} title="Infrastructure · ProDesk" />
        </div>
      )}

      {/* VLANs & Firewall */}
      {active === "vlans" && (
        <div className="space-y-8">
          {/* VLAN table */}
          <div>
            <div className="font-mono text-[10px] text-[#6B6B6B] tracking-widest uppercase mb-4 flex items-center gap-3">
              VLAN map <span className="flex-1 h-px bg-white/5" />
            </div>
            <div className="overflow-x-auto" style={{ WebkitOverflowScrolling: "touch" as const }}>
              <div className="bg-[#0F0F0F] border border-white/5 rounded-lg overflow-hidden min-w-[520px]">
                <table className="w-full font-mono text-xs">
                  <thead>
                    <tr className="border-b border-white/5">
                      {["VLAN", "Name", "Subnet", "Devices", "Notes"].map((h) => (
                        <th key={h} className="text-left px-4 py-3 text-[#4B4B4B] font-medium uppercase text-[10px] tracking-wider">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {VLANS.map((v, i) => (
                      <motion.tr
                        key={v.id}
                        initial={{ opacity: 0, x: -8 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: i * 0.07 }}
                        className="border-b border-white/5 last:border-0 hover:bg-white/[0.02]"
                      >
                        <td className="px-4 py-3"><span className="text-sm font-bold" style={{ color: v.color }}>{v.id}</span></td>
                        <td className="px-4 py-3" style={{ color: v.color }}>{v.name}</td>
                        <td className="px-4 py-3 text-[#A0A0A0]">{v.subnet}</td>
                        <td className="px-4 py-3 text-[#6B6B6B]">{v.devices}</td>
                        <td className="px-4 py-3 text-[#6B6B6B]">{v.note}</td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Firewall rules */}
          <div>
            <div className="font-mono text-[10px] text-[#6B6B6B] tracking-widest uppercase mb-4 flex items-center gap-3">
              Firewall rules · hAP ac² forward chain <span className="flex-1 h-px bg-white/5" />
            </div>
            <div className="font-mono text-[10px] text-[#F59E0B] bg-[#F59E0B]/5 border border-[#F59E0B]/20 rounded-lg px-4 py-2.5 mb-4">
              Rules evaluated top-down. First match wins. All unmatched traffic hits default deny.
            </div>
            <div className="bg-[#0F0F0F] border border-white/5 rounded-lg divide-y divide-white/5">
              {FW_RULES.map(({ allow, rule }, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.25, delay: i * 0.04 }}
                  className="flex items-start gap-3 px-4 py-2.5 font-mono text-xs text-[#6B6B6B]"
                >
                  <span className={allow ? "text-[#3ECF8E]" : "text-[#F97066]"} style={{ fontSize: 13 }}>{allow ? "✓" : "✗"}</span>
                  {rule}
                </motion.div>
              ))}
            </div>
          </div>

          {/* NAT */}
          <div>
            <div className="font-mono text-[10px] text-[#6B6B6B] tracking-widest uppercase mb-4 flex items-center gap-3">
              NAT rules <span className="flex-1 h-px bg-white/5" />
            </div>
            <div className="bg-[#0F0F0F] border border-white/5 rounded-lg divide-y divide-white/5">
              {["srcnat masquerade — all outbound NATed to WAN IP", "dstnat TCP 32400 → ProDesk Plex"].map((r, i) => (
                <div key={i} className="flex items-start gap-3 px-4 py-2.5 font-mono text-xs text-[#6B6B6B]">
                  <span className="text-[#CCFF00]">→</span>{r}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
