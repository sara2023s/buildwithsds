import type { Metadata } from "next";
import CertTile from "@/components/CertTile";
import certsData from "@/data/certs.json";
import GlitchText from "@/components/GlitchText";
import CountUp from "@/components/CountUp";
import { FadeUp, FadeIn, BlurIn, StaggerGrid, StaggerItem } from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "Certifications",
  description: "21 certifications across AWS, Azure, IBM AI, Google, Cisco, Grandstream, Harvard. MTCNA and CCNA in progress.",
};

type Cert = {
  name: string;
  issuer: string;
  category: string;
  issued: string | null;
  in_progress: boolean;
  verify_url: string | null;
};

const HARDCODED_IN_PROGRESS = [
  { name: "MTCNA", issuer: "MikroTik", category: "networking", issued: null, in_progress: true, verify_url: null, target_date: "Jun 2026" },
  { name: "CCNA", issuer: "Cisco", category: "networking", issued: null, in_progress: true, verify_url: null, target_date: "Oct 2026" },
];

const CATEGORY_ORDER = ["education", "cloud", "ai", "networking", "support", "software"];
const CATEGORY_LABELS: Record<string, string> = {
  education: "Education",
  cloud: "Cloud & Infrastructure",
  ai: "AI & Machine Learning",
  networking: "Networking",
  support: "IT Support",
  software: "Software Engineering",
};

export default function CertsPage() {
  const allCerts = certsData as Cert[];
  const issuedCount = allCerts.filter((c) => !c.in_progress).length;
  const inProgressCount = allCerts.filter((c) => c.in_progress).length + 2;

  const byCategory: Record<string, (Cert & { target_date?: string })[]> = {};
  for (const cat of CATEGORY_ORDER) byCategory[cat] = [];
  for (const cert of allCerts) {
    if (byCategory[cert.category]) byCategory[cert.category].push(cert);
  }
  byCategory["networking"].push(...HARDCODED_IN_PROGRESS);

  return (
    <main style={{ background: "#0A0A0A" }} className="min-h-screen">
      <div className="max-w-5xl mx-auto px-6 pt-28 pb-24">
        <BlurIn className="mb-4">
          <span className="font-mono text-xs text-[#CCFF00] tracking-widest uppercase">CERTIFICATIONS</span>
        </BlurIn>
        <FadeUp>
          <h1 className="font-syne text-5xl sm:text-6xl font-bold text-[#F8F8F8] mb-4">
            <GlitchText intensity="low">
              {`${issuedCount} issued · ${inProgressCount} in progress`}
            </GlitchText>
          </h1>
        </FadeUp>
        <FadeIn delay={0.05}>
          <div className="space-y-4 mb-16 max-w-2xl">
            <p className="font-inter text-base text-[#6B6B6B] leading-relaxed">
              Self-directed learning across cloud, AI, networking, and software — mostly built around things I was already doing. I don&apos;t collect badges; I study something until I can actually use it, then I find the cert that proves it.
            </p>
            <p className="font-inter text-base text-[#6B6B6B] leading-relaxed">
              Issuers: AWS, Microsoft, IBM, Google, Cisco, Grandstream, Harvard Online, Yoobee, Massey University, Whitecliffe. MTCNA (MikroTik) and CCNA (Cisco) both in active lab prep.
            </p>
          </div>
        </FadeIn>

        <div className="space-y-14">
          {CATEGORY_ORDER.map((cat) => {
            const certs = byCategory[cat];
            if (!certs.length) return null;
            return (
              <div key={cat}>
                <FadeUp className="mb-4">
                  <span className="font-mono text-xs text-[#6B6B6B] tracking-widest uppercase">{CATEGORY_LABELS[cat]}</span>
                </FadeUp>
                <StaggerGrid className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {certs.map((cert, i) => (
                    <StaggerItem key={`${cert.name}-${i}`}>
                      <CertTile
                        name={cert.name}
                        issuer={cert.issuer}
                        issued={cert.issued}
                        in_progress={cert.in_progress}
                        verify_url={cert.verify_url}
                        category={cert.category}
                        target_date={"target_date" in cert ? (cert as { target_date?: string }).target_date : undefined}
                      />
                    </StaggerItem>
                  ))}
                </StaggerGrid>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
