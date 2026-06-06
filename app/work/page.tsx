import type { Metadata } from "next";
import WorkCard from "@/components/WorkCard";
import Link from "next/link";
import moreProjects from "@/data/more-projects.json";
import GlitchText from "@/components/GlitchText";
import { FadeUp, FadeIn, StaggerGrid, StaggerItem } from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "Work — Dev Portfolio",
  description: "Three client websites, five live personal apps, and five side tools. React, Next.js, Stripe, Apple Pay, PWA, auth — built and shipped.",
};

const PERSONAL_BUILDS = [
  {
    slug: "interview-helper",
    title: "Interview Helper",
    subtitle: "AI-powered interview prep — practice questions, answers, and feedback",
    tech: ["React", "Next.js", "AI", "auth", "TypeScript"],
    href: "https://interview-helper.buildwithsds.com/sign-in",
    previewUrl: "https://interview-helper.buildwithsds.com/sign-in",
    external: true,
  },
  {
    slug: "sneakers",
    title: "Sneakers Store",
    subtitle: "Full e-commerce sneaker store with product browsing and cart",
    tech: ["React", "Next.js", "e-commerce", "Tailwind CSS"],
    href: "https://sneakers.buildwithsds.com/",
    previewUrl: "https://sneakers.buildwithsds.com/",
    external: true,
  },
  {
    slug: "gym",
    title: "Gym App",
    subtitle: "Fitness and gym management application",
    tech: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    href: "https://gym.buildwithsds.com/",
    previewUrl: "https://gym.buildwithsds.com/",
    external: true,
  },
  {
    slug: "uni",
    title: "Uni",
    subtitle: "University study tool — schedule, tasks, and academic tracking",
    tech: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    href: "https://uni.buildwithsds.com/",
    previewUrl: "https://uni.buildwithsds.com/",
    external: true,
  },
  {
    slug: "mindlink",
    title: "MindLink",
    subtitle: "Mental wellness and mindfulness application",
    tech: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    href: "https://mindlink.buildwithsds.com/",
    previewUrl: "https://mindlink.buildwithsds.com/",
    external: true,
  },
];

export default function WorkPage() {
  return (
    <main style={{ background: "#0A0A0A" }} className="min-h-screen">
      <div className="max-w-5xl mx-auto px-6 pt-28 pb-24">

        <FadeUp>
          <span className="font-mono text-xs text-[#CCFF00] tracking-widest uppercase">DEV PORTFOLIO</span>
          <h1 className="font-syne text-5xl sm:text-6xl font-bold text-[#F8F8F8] mt-3 mb-6">
            <GlitchText intensity="low">Work</GlitchText>
          </h1>
          <p className="font-inter text-base text-[#6B6B6B] leading-relaxed max-w-2xl mb-16">
            Three client builds shipped to real users, five live personal apps, and five
            side tools I build and live with. React, Next.js, Stripe, Apple Pay, auth, payments.
            Also see the{" "}
            <Link href="/homelab" className="text-[#CCFF00] hover:underline underline-offset-4">
              homelab
            </Link>{" "}
            for networking and infrastructure work.
          </p>
        </FadeUp>

        {/* ── CLIENT WORK ── */}
        <FadeUp delay={0.05} className="mb-4">
          <span className="font-mono text-[10px] text-[#6B6B6B] tracking-widest uppercase">Client work</span>
          <p className="font-inter text-xs text-[#6B6B6B] mt-1">Shipped to real users, maintained ongoing.</p>
        </FadeUp>
        <StaggerGrid className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 mb-20">
          <StaggerItem>
            <WorkCard
              slug="jornada"
              title="Jornada de Insights"
              subtitle="Brazilian Portuguese content platform for podcasts, videos, and eBooks"
              tech={["React", "Next.js", "PWA", "pt-BR", "Tailwind"]}
              href="/work/jornada"
              previewUrl="https://jornadadeinsights.com"
            />
          </StaggerItem>
          <StaggerItem>
            <WorkCard
              slug="alana-ruakere"
              title="Alana Ruakere"
              subtitle="Artist portfolio & e-commerce shop with Apple Pay and Google Pay"
              tech={["React", "Stripe", "Apple Pay", "Google Pay", "e-commerce"]}
              href="/work/alana-ruakere"
              previewUrl="https://alanaruakere.art"
            />
          </StaggerItem>
          <StaggerItem>
            <WorkCard
              slug="appdoers"
              title="Appdoers"
              subtitle="Company website for a NZ digital development agency"
              tech={["React", "Next.js", "TypeScript", "SEO", "Tailwind"]}
              href="/work/appdoers"
              previewUrl="https://www.appdoers.co.nz/"
            />
          </StaggerItem>
        </StaggerGrid>

        {/* ── PERSONAL BUILDS ── */}
        <FadeUp className="mb-4">
          <span className="font-mono text-[10px] text-[#6B6B6B] tracking-widest uppercase">Personal builds</span>
          <p className="font-inter text-xs text-[#6B6B6B] mt-1">Live apps I built to explore ideas and sharpen skills. All deployed at Build With SDS subdomains.</p>
        </FadeUp>
        <StaggerGrid className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 mb-20">
          {PERSONAL_BUILDS.map((p) => (
            <StaggerItem key={p.slug}>
              <WorkCard
                slug={p.slug}
                title={p.title}
                subtitle={p.subtitle}
                tech={p.tech}
                href={p.href}
                previewUrl={p.previewUrl}
              />
            </StaggerItem>
          ))}
        </StaggerGrid>

        {/* ── TOOLS & INFRA ── */}
        <FadeUp className="mb-6">
          <span className="font-mono text-[10px] text-[#6B6B6B] tracking-widest uppercase">Tools & infra</span>
          <p className="font-inter text-xs text-[#6B6B6B] mt-1">Not apps — scripts, dashboards, and self-hosted infrastructure I build and live with daily.</p>
        </FadeUp>
        <StaggerGrid className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {moreProjects.map((project) => (
            <StaggerItem key={project.title}>
              <div className="bg-[#0F0F0F] border border-white/5 rounded-lg p-5 hover:border-white/10 transition-colors h-full">
                <h3 className="font-syne text-sm font-bold text-[#F8F8F8] mb-2">{project.title}</h3>
                <p className="font-inter text-xs text-[#6B6B6B] leading-relaxed mb-3">{project.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {project.tech.map((t) => (
                    <span key={t} className="font-mono text-[10px] bg-white/5 text-[#6B6B6B] px-2 py-0.5 rounded border border-white/5">{t}</span>
                  ))}
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerGrid>

        <FadeUp delay={0.1} className="mt-16 pt-10 border-t border-white/5 flex flex-wrap gap-6">
          <Link href="/homelab" className="font-mono text-xs text-[#6B6B6B] hover:text-[#CCFF00] transition-colors">
            Homelab / networking →
          </Link>
          <Link href="/certs" className="font-mono text-xs text-[#6B6B6B] hover:text-[#CCFF00] transition-colors">
            21 certifications →
          </Link>
          <Link href="/about" className="font-mono text-xs text-[#6B6B6B] hover:text-[#CCFF00] transition-colors">
            About me →
          </Link>
        </FadeUp>

      </div>
    </main>
  );
}
