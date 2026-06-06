"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const FAKE_CRM_ROWS = [
  { name: "Kiwi Roofing Ltd", status: "Active", mrr: "$1,200", last: "2d ago" },
  { name: "Bay Plumbing Co.", status: "Trial", mrr: "$0", last: "5h ago" },
  { name: "Nelson Tech Hub", status: "Active", mrr: "$450", last: "1d ago" },
  { name: "Chch Builds", status: "Churned", mrr: "$0", last: "14d ago" },
  { name: "Welly Digital", status: "Active", mrr: "$2,100", last: "just now" },
];

export default function UserscriptPanel() {
  const [highlighted, setHighlighted] = useState<number | null>(null);
  const [scriptRunning, setScriptRunning] = useState(false);
  const [scriptLog, setScriptLog] = useState<string[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setScriptRunning(true);
      const logs = [
        "// userscript v2.1 — CRM enhancer",
        "→ Scanning active rows...",
        "→ Found 3 active accounts",
        "→ Injecting MRR column...",
        "→ Flagging stale contacts...",
        "✓ Done in 42ms",
      ];
      logs.forEach((log, i) => {
        setTimeout(() => {
          setScriptLog((prev) => [...prev, log]);
          if (i === 1) setHighlighted(0);
          if (i === 2) setHighlighted(2);
          if (i === 3) setHighlighted(4);
          if (i === 4) setHighlighted(null);
        }, i * 400);
      });
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const statusColor = (s: string) =>
    s === "Active" ? "#CCFF00" : s === "Trial" ? "#007BFF" : "#6B6B6B";

  return (
    <div className="bg-[#0F0F0F] border border-white/5 rounded-lg overflow-hidden">
      {/* Fake browser chrome */}
      <div className="bg-[#1a1a1a] border-b border-white/5 px-4 py-2 flex items-center gap-3">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/60" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
          <div className="w-3 h-3 rounded-full bg-green-500/60" />
        </div>
        <div className="flex-1 bg-[#0A0A0A] rounded px-3 py-1">
          <span className="font-mono text-xs text-[#6B6B6B]">app.crm.internal/clients</span>
        </div>
        {scriptRunning && (
          <span className="font-mono text-[10px] text-[#CCFF00] bg-[#CCFF00]/10 px-2 py-0.5 rounded">
            userscript active
          </span>
        )}
      </div>

      <div className="flex">
        {/* CRM table */}
        <div className="flex-1 p-4 overflow-x-auto">
          <table className="w-full text-xs font-mono">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left py-2 text-[#6B6B6B] font-normal">Client</th>
                <th className="text-left py-2 text-[#6B6B6B] font-normal">Status</th>
                <th className="text-left py-2 text-[#CCFF00] font-normal">MRR ✦</th>
                <th className="text-left py-2 text-[#6B6B6B] font-normal">Last</th>
              </tr>
            </thead>
            <tbody>
              {FAKE_CRM_ROWS.map((row, i) => (
                <motion.tr
                  key={i}
                  animate={{
                    backgroundColor: highlighted === i ? "rgba(204,255,0,0.05)" : "transparent",
                  }}
                  className="border-b border-white/5 last:border-0"
                >
                  <td className="py-2 text-[#F8F8F8]">{row.name}</td>
                  <td className="py-2" style={{ color: statusColor(row.status) }}>{row.status}</td>
                  <td className="py-2 text-[#F8F8F8]">{row.mrr}</td>
                  <td className="py-2 text-[#6B6B6B]">{row.last}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Script log panel */}
        <div className="w-48 border-l border-white/5 bg-[#0A0A0A] p-3 flex flex-col">
          <span className="font-mono text-[10px] text-[#CCFF00] mb-2 tracking-widest">SCRIPT LOG</span>
          <div className="space-y-1 flex-1">
            {scriptLog.map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="font-mono text-[10px] text-[#6B6B6B] leading-relaxed"
              >
                {line}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
