import type { SVGProps } from "react";

/** The >_ terminal mark as an inline SVG */
export function LogoMark({ size = 20, ...props }: SVGProps<SVGSVGElement> & { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 512 512"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
    >
      <rect width="512" height="512" fill="#0A0A0A" rx="96" />
      <polyline
        points="112,158 282,256 112,354"
        stroke="#CCFF00"
        strokeWidth="60"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect x="304" y="294" width="118" height="56" fill="#CCFF00" rx="8" />
    </svg>
  );
}

/** Full nav wordmark: mark + "BUILD WITH SDS" */
export default function Logo() {
  return (
    <span className="inline-flex items-center gap-2.5 select-none">
      <LogoMark size={22} />
      <span className="font-mono text-sm text-[#CCFF00] tracking-widest uppercase leading-none">
        Build With SDS
      </span>
    </span>
  );
}
