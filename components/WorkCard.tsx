"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

interface WorkCardProps {
  slug: string;
  title: string;
  subtitle: string;
  tech: string[];
  /** Internal path (e.g. /work/jornada) or full external URL */
  href: string;
  previewUrl?: string;
  /** Static image path (e.g. /preview-appdoers.jpg) — takes precedence over iframe */
  previewImage?: string;
}

const cardClass =
  "group block bg-[#0F0F0F] border border-white/5 rounded-lg overflow-hidden hover:border-[#CCFF00]/40 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#CCFF00]";

function CardInner({ title, subtitle, tech, previewUrl, previewImage }: Pick<WorkCardProps, "title" | "subtitle" | "tech" | "previewUrl" | "previewImage">) {
  return (
    <>
      {/* Preview area */}
      <div className="h-48 border-b border-white/5 relative overflow-hidden bg-[#111]">
        {previewImage ? (
          <>
            <Image
              src={previewImage}
              alt={`${title} — site preview`}
              fill
              className="object-cover object-top pointer-events-none"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/50 pointer-events-none" />
          </>
        ) : previewUrl ? (
          <>
            <iframe
              src={previewUrl}
              title={`${title} — live preview`}
              className="absolute top-0 left-0 border-0 pointer-events-none"
              style={{ width: "400%", height: "400%", transform: "scale(0.25)", transformOrigin: "top left" }}
              loading="lazy"
              tabIndex={-1}
              aria-hidden="true"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/50 pointer-events-none" />
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none animate-shimmer" />
          </>
        ) : (
          <span className="absolute inset-0 flex items-center justify-center font-syne text-2xl font-bold text-[#F8F8F8]/10 group-hover:text-[#F8F8F8]/20 transition-colors tracking-tight select-none">
            {title}
          </span>
        )}
        <span className="absolute top-3 right-3 font-mono text-xs text-[#CCFF00] opacity-0 group-hover:opacity-100 transition-opacity">
          ↗
        </span>
      </div>

      {/* Card body */}
      <div className="p-5">
        <h3 className="font-syne text-lg font-bold text-[#F8F8F8] mb-1 group-hover:text-[#CCFF00] transition-colors">
          {title}
        </h3>
        <p className="font-inter text-sm text-[#6B6B6B] mb-4 leading-relaxed">{subtitle}</p>
        <div className="flex flex-wrap gap-1.5">
          {tech.map((t) => (
            <motion.span
              key={t}
              whileHover={{ backgroundColor: "rgba(204,255,0,0.08)", color: "#CCFF00" }}
              className="font-mono text-[10px] bg-white/5 text-[#6B6B6B] px-2 py-0.5 rounded border border-white/5 transition-colors"
            >
              {t}
            </motion.span>
          ))}
        </div>
      </div>
    </>
  );
}

export default function WorkCard({ title, subtitle, tech, href, previewUrl, previewImage }: WorkCardProps) {
  const isExternal = href.startsWith("http");

  return (
    <motion.div
      whileHover={{
        scale: 1.025,
        boxShadow:
          "0 0 0 1px rgba(204,255,0,0.5), 0 0 28px rgba(204,255,0,0.12), 0 16px 48px rgba(204,255,0,0.09)",
      }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className="rounded-lg overflow-hidden"
    >
      {isExternal ? (
        <a href={href} target="_blank" rel="noopener noreferrer" className={cardClass}>
          <CardInner title={title} subtitle={subtitle} tech={tech} previewUrl={previewUrl} previewImage={previewImage} />
        </a>
      ) : (
        <Link href={href} className={cardClass}>
          <CardInner title={title} subtitle={subtitle} tech={tech} previewUrl={previewUrl} previewImage={previewImage} />
        </Link>
      )}
    </motion.div>
  );
}
