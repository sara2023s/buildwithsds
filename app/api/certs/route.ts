import { NextResponse } from "next/server";
import { readFileSync } from "fs";
import { join } from "path";

type Cert = {
  name: string;
  issuer: string;
  category: string;
  issued: string | null;
  in_progress: boolean;
  verify_url: string | null;
  target?: string;
};

const HARDCODED_IN_PROGRESS: Cert[] = [
  { name: "MTCNA", issuer: "MikroTik", category: "networking", issued: null, in_progress: true, verify_url: null, target: "Jun 2026" },
  { name: "CCNA", issuer: "Cisco", category: "networking", issued: null, in_progress: true, verify_url: null, target: "Oct 2026" },
];

export async function GET() {
  try {
    const raw = readFileSync(join(process.cwd(), "data", "certs.json"), "utf-8");
    const all: Cert[] = JSON.parse(raw);

    const issued = all.filter((c) => !c.in_progress);
    const inProgress = [...all.filter((c) => c.in_progress), ...HARDCODED_IN_PROGRESS];

    const byCategory: Record<string, Cert[]> = {};
    for (const cert of [...all, ...HARDCODED_IN_PROGRESS]) {
      if (!byCategory[cert.category]) byCategory[cert.category] = [];
      byCategory[cert.category].push(cert);
    }

    return NextResponse.json(
      { count: issued.length, in_progress_count: inProgress.length, by_category: byCategory, in_progress: inProgress, all: [...all, ...HARDCODED_IN_PROGRESS] },
      { headers: { "Cache-Control": "public, max-age=3600" } }
    );
  } catch {
    return NextResponse.json({ count: 0, in_progress_count: 0, by_category: {}, in_progress: [], all: [] }, { status: 200 });
  }
}
