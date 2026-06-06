export default function Footer() {
  return (
    <footer className="px-6 py-8 border-t border-white/5" style={{ background: "#0A0A0A" }}>
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6 flex-wrap">
        <a href="https://buildwithsds.com" target="_blank" rel="noopener noreferrer" className="font-mono text-xs text-[#6B6B6B] hover:text-[#CCFF00] transition-colors">
          Build With SDS — Sara da Silva
        </a>
        <span className="font-mono text-xs text-[#6B6B6B] hidden sm:inline">·</span>
        <span className="font-mono text-xs text-[#6B6B6B]">New Plymouth, NZ · {new Date().getFullYear()}</span>
        <span className="font-mono text-xs text-[#6B6B6B] hidden sm:inline">·</span>
        <a href="https://github.com/sara2023s" target="_blank" rel="noopener noreferrer" className="font-mono text-xs text-[#6B6B6B] hover:text-[#CCFF00] transition-colors">
          github/sara2023s
        </a>
        <span className="font-mono text-xs text-[#6B6B6B] hidden sm:inline">·</span>
        <a href="https://www.linkedin.com/in/sara-n-a-dasilva" target="_blank" rel="noopener noreferrer" className="font-mono text-xs text-[#6B6B6B] hover:text-[#CCFF00] transition-colors">
          linkedin/sara-n-a-dasilva
        </a>
        <span className="font-mono text-xs text-[#6B6B6B] hidden sm:inline">·</span>
        <a href="/homelab" className="font-mono text-xs text-[#6B6B6B] hover:text-[#CCFF00] transition-colors">
          CORE_LAB
        </a>
      </div>
      <div className="max-w-5xl mx-auto mt-3 flex justify-center">
        <a href="https://github.com/sara2023s/buildwithsds" target="_blank" rel="noopener noreferrer" className="font-mono text-[10px] text-[#6B6B6B]/50 hover:text-[#6B6B6B] transition-colors">
          Source: github.com/sara2023s/buildwithsds
        </a>
      </div>
    </footer>
  );
}
