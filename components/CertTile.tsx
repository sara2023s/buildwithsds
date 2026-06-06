"use client";
import { motion } from "framer-motion";

interface CertTileProps {
  name: string;
  issuer: string;
  issued?: string | null;
  in_progress: boolean;
  verify_url?: string | null;
  category: string;
  target_date?: string;
}

const CATEGORY_COLORS: Record<string, string> = {
  education: "#9B59B6",
  cloud: "#007BFF",
  ai: "#FF6B35",
  networking: "#CCFF00",
  support: "#3ECF8E",
  software: "#F59E0B",
};

export default function CertTile({ name, issuer, issued, in_progress, verify_url, category, target_date }: CertTileProps) {
  const dot = CATEGORY_COLORS[category] || "#CCFF00";

  const inner = (
    <>
      <span
        className={`w-2 h-2 rounded-full mb-3 shrink-0 block ${in_progress ? "animate-pulse" : ""}`}
        style={{ backgroundColor: dot }}
      />
      <div className="font-syne text-xs font-semibold text-[#F8F8F8] leading-snug mb-1 group-hover:text-white transition-colors">
        {name}
      </div>
      <div className="font-mono text-[10px] text-[#6B6B6B]">{issuer}</div>
      {in_progress ? (
        <div className="font-mono text-[10px] mt-1" style={{ color: dot }}>
          {target_date ? `target ${target_date}` : "IN PROGRESS"}
        </div>
      ) : issued ? (
        <div className="font-mono text-[10px] text-[#6B6B6B] mt-1">{issued}</div>
      ) : null}
      {verify_url && (
        <span className="font-mono text-[10px] mt-2 block group-hover:underline" style={{ color: dot }}>↗ verify</span>
      )}
    </>
  );

  const borderClass = in_progress
    ? "border border-dashed border-white/15 bg-[#0F0F0F]"
    : "bg-[#0F0F0F] border border-white/5";

  if (verify_url) {
    return (
      <motion.a
        href={verify_url}
        target="_blank"
        rel="noopener noreferrer"
        className={`group p-4 rounded-lg flex flex-col focus:outline-none focus-visible:ring-2 focus-visible:ring-[#CCFF00] ${borderClass}`}
        whileHover={{
          scale: 1.03,
          boxShadow: `0 0 0 1px ${dot}44, 0 4px 20px ${dot}18`,
          borderColor: `${dot}55`,
        }}
        transition={{ duration: 0.18, ease: "easeOut" }}
      >
        {inner}
      </motion.a>
    );
  }

  return (
    <motion.div
      className={`group p-4 rounded-lg flex flex-col ${borderClass}`}
      whileHover={{
        scale: 1.03,
        boxShadow: `0 0 0 1px ${dot}33, 0 4px 16px ${dot}12`,
      }}
      transition={{ duration: 0.18, ease: "easeOut" }}
    >
      {inner}
    </motion.div>
  );
}
