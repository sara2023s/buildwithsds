"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Logo from "@/components/Logo";

const NAV_LINKS = [
  { label: "WORK", href: "/work" },
  { label: "HOMELAB", href: "/homelab" },
  { label: "ABOUT", href: "/about" },
  { label: "CERTS", href: "/certs" },
  { label: "CONTACT", href: "/contact" },
];

export default function TopNav() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0A0A0A]/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link
            href="/"
            className="focus:outline-none focus-visible:ring-2 focus-visible:ring-[#CCFF00] rounded"
            aria-label="Build With SDS — home"
          >
            <Logo />
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(({ label, href }) => {
              const active = pathname.startsWith(href);
              return (
                <Link
                  key={href}
                  href={href}
                  className={`font-mono text-xs tracking-widest focus:outline-none focus-visible:ring-2 focus-visible:ring-[#CCFF00] ${
                    active
                      ? "text-[#CCFF00] underline underline-offset-4"
                      : "text-[#6B6B6B] hover:text-[#F8F8F8] transition-colors"
                  }`}
                >
                  {label}
                </Link>
              );
            })}
          </nav>

          <a
            href="mailto:hello@buildwithsds.com"
            className="font-mono text-xs text-[#6B6B6B] hover:text-[#CCFF00] transition-colors hidden sm:block focus:outline-none focus-visible:ring-2 focus-visible:ring-[#CCFF00]"
          >
            hello@buildwithsds.com
          </a>

          <button
            className="md:hidden text-[#6B6B6B] hover:text-[#F8F8F8] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#CCFF00]"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <line x1="2" y1="5" x2="18" y2="5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="2" y1="10" x2="18" y2="10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="2" y1="15" x2="18" y2="15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </header>

      {menuOpen && (
        <div className="fixed inset-0 z-[100] bg-[#0A0A0A] flex flex-col items-center justify-center gap-8">
          <button
            className="absolute top-5 right-6 font-mono text-xl text-[#6B6B6B] hover:text-[#F8F8F8] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#CCFF00]"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          >
            ×
          </button>

          {NAV_LINKS.map(({ label, href }) => {
            const active = pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className={`font-mono text-xs tracking-widest focus:outline-none focus-visible:ring-2 focus-visible:ring-[#CCFF00] ${
                  active
                    ? "text-[#CCFF00] underline underline-offset-4"
                    : "text-[#6B6B6B] hover:text-[#F8F8F8] transition-colors"
                }`}
              >
                {label}
              </Link>
            );
          })}

          <a
            href="mailto:hello@buildwithsds.com"
            className="font-mono text-xs text-[#6B6B6B] hover:text-[#CCFF00] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#CCFF00]"
          >
            hello@buildwithsds.com
          </a>
        </div>
      )}
    </>
  );
}
