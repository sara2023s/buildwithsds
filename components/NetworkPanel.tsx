"use client";
import { useState, useEffect } from "react";

export default function NetworkPanel() {
  const [nasUp, setNasUp] = useState<boolean | null>(null);
  const [nasLatency, setNasLatency] = useState<number | null>(null);
  const [lastChecked, setLastChecked] = useState<string>("");

  useEffect(() => {
    const check = async () => {
      try {
        const res = await fetch("/api/uptime");
        if (res.ok) {
          const data = await res.json();
          setNasUp(data.up ?? null);
          setNasLatency(data.latency_ms ?? null);
        }
      } catch {
        setNasUp(false);
      }
      setLastChecked(
        new Date().toLocaleTimeString("en-NZ", {
          timeZone: "Pacific/Auckland",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        })
      );
    };
    check();
    const id = setInterval(check, 30000);
    return () => clearInterval(id);
  }, []);

  const nasStatus = nasUp === null ? "—" : nasUp ? `${nasLatency}ms` : "offline";
  const nasColor = nasUp === true ? "#CCFF00" : nasUp === false ? "#FF4444" : "#6B6B6B";

  return (
    <div className="bg-[#0F0F0F] border border-white/5 rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-mono text-xs text-[#CCFF00] tracking-widest uppercase">
          Network Topology
        </h3>
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#CCFF00] animate-pulse" />
          <span className="font-mono text-xs text-[#6B6B6B]">live</span>
        </div>
      </div>

      <div className="overflow-x-auto mb-6">
        <svg viewBox="0 0 500 200" className="w-full max-w-lg mx-auto" style={{ minWidth: 300 }}>
          <rect x="200" y="10" width="100" height="36" rx="4" fill="#1a1a1a" stroke="#CCFF00" strokeWidth="1" />
          <text x="250" y="33" textAnchor="middle" fill="#CCFF00" fontSize="11" fontFamily="monospace">MikroTik</text>

          <line x1="250" y1="46" x2="250" y2="80" stroke="#333" strokeWidth="1" strokeDasharray="4 2" />

          <line x1="250" y1="80" x2="60" y2="155" stroke="#333" strokeWidth="1" strokeDasharray="4 2" />
          <line x1="250" y1="80" x2="165" y2="155" stroke="#333" strokeWidth="1" strokeDasharray="4 2" />
          <line x1="250" y1="80" x2="250" y2="155" stroke="#333" strokeWidth="1" strokeDasharray="4 2" />
          <line x1="250" y1="80" x2="335" y2="155" stroke="#333" strokeWidth="1" strokeDasharray="4 2" />
          <line x1="250" y1="80" x2="430" y2="155" stroke="#333" strokeWidth="1" strokeDasharray="4 2" />

          {[
            { x: 20, label: "NAS*", id: "nas", live: true },
            { x: 125, label: "AdGuard", id: "adguard", live: false },
            { x: 210, label: "ProBook", id: "probook", live: false },
            { x: 295, label: "IoT", id: "iot", live: false },
          ].map((n) => {
            const isNas = n.id === "nas";
            const dotColor = isNas ? nasColor : "#555";
            const strokeColor = isNas && nasUp === false ? "#FF4444" : "#333";
            return (
              <g key={n.id}>
                <rect x={n.x} y={155} width={80} height={36} rx="4" fill="#1a1a1a" stroke={strokeColor} strokeWidth="1" />
                <circle
                  cx={n.x + 70}
                  cy={162}
                  r={4}
                  fill={dotColor}
                  className={isNas && nasUp === true ? "animate-pulse" : ""}
                />
                <text x={n.x + 40} y={178} textAnchor="middle" fill="#F8F8F8" fontSize="11" fontFamily="monospace">
                  {n.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <div className="space-y-2">
        {[
          { label: "MikroTik hAP ac²", ip: "192.168.20.1", role: "gateway", status: "—" },
          { label: "Synology NAS", ip: "192.168.20.213 / nas.buildwithsds.com", role: "nas", status: nasStatus },
          { label: "AdGuard/PC", ip: "192.168.20.222", role: "client", status: "—" },
          { label: "ProBook", ip: "192.168.20.50", role: "client", status: "—" },
          { label: "Echo/IoT", ip: "192.168.30.x", role: "iot", status: "—" },
        ].map((node) => (
          <div key={node.label} className="flex items-center justify-between py-1.5 border-b border-white/5 last:border-0">
            <div className="flex items-center gap-2">
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  node.role === "nas"
                    ? nasUp === true
                      ? "bg-[#CCFF00] animate-pulse"
                      : nasUp === false
                      ? "bg-red-500"
                      : "bg-[#6B6B6B]"
                    : node.role === "gateway"
                    ? "bg-[#CCFF00]"
                    : "bg-[#555]"
                }`}
              />
              <span className="font-mono text-xs text-[#F8F8F8]">{node.label}</span>
              <span className="font-mono text-xs text-[#6B6B6B]">{node.ip}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-mono text-[10px] text-[#6B6B6B] uppercase">{node.role}</span>
              <span className={`font-mono text-xs ${node.role === "nas" && nasUp === false ? "text-red-400" : "text-[#6B6B6B]"}`}>
                {node.status}
              </span>
            </div>
          </div>
        ))}
      </div>

      {lastChecked && (
        <p className="font-mono text-[10px] text-[#6B6B6B] mt-4 text-right">
          checked {lastChecked} NZT
        </p>
      )}
    </div>
  );
}
