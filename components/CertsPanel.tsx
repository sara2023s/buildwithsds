"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

type Cert = {
  id: string;
  name: string;
  issuer: string;
  date: string;
  url?: string;
  color?: string;
};

export default function CertsPanel() {
  const [certs, setCerts] = useState<Cert[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/certs")
      .then((r) => r.json())
      .then((data) => {
        setCerts(data.certs || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-24 bg-[#0F0F0F] border border-white/5 rounded-lg animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {certs.map((cert, i) => (
        <motion.a
          key={cert.id}
          href={cert.url || "#"}
          target={cert.url ? "_blank" : undefined}
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: i * 0.08 }}
          className="group bg-[#0F0F0F] border border-white/5 rounded-lg p-4 hover:border-[#CCFF00]/30 transition-colors duration-200 block"
        >
          <div
            className="w-2 h-2 rounded-full mb-3"
            style={{ backgroundColor: cert.color || "#CCFF00" }}
          />
          <div className="font-syne text-xs font-semibold text-[#F8F8F8] leading-snug mb-1 group-hover:text-[#CCFF00] transition-colors">
            {cert.name}
          </div>
          <div className="font-mono text-[10px] text-[#6B6B6B]">{cert.issuer}</div>
          <div className="font-mono text-[10px] text-[#6B6B6B] mt-1">{cert.date}</div>
        </motion.a>
      ))}
    </div>
  );
}
