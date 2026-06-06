import { NextResponse } from "next/server";

export const revalidate = 25;

export async function GET() {
  const target = process.env.UPTIME_TARGET || "https://nas.buildwithsds.com";
  const checked_at = new Date().toISOString();

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);
    const start = Date.now();

    const res = await fetch(target, {
      method: "HEAD",
      signal: controller.signal,
    });
    clearTimeout(timeout);

    const latency_ms = Date.now() - start;
    return NextResponse.json({ up: res.ok, latency_ms, checked_at });
  } catch {
    return NextResponse.json({ up: false, latency_ms: null, checked_at });
  }
}
