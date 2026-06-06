import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

type PushEvent = {
  type: string;
  repo: { name: string };
  payload: { commits: Array<{ sha: string; message: string }> };
  created_at: string;
};

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

export async function GET() {
  try {
    const headers: Record<string, string> = {
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      "User-Agent": "buildwithsds-portfolio",
    };
    if (process.env.GITHUB_TOKEN) {
      headers["Authorization"] = `Bearer ${process.env.GITHUB_TOKEN}`;
    }

    const res = await fetch(
      "https://api.github.com/users/sara2023s/events/public?per_page=100",
      { headers, next: { revalidate: 300 } }
    );
    if (!res.ok) throw new Error("events fetch failed");

    const events: PushEvent[] = await res.json();
    const cutoff = Date.now() - 14 * 24 * 60 * 60 * 1000;

    const commits = events
      .filter((e) => e.type === "PushEvent" && new Date(e.created_at).getTime() > cutoff)
      .flatMap((e) =>
        (e.payload.commits || []).map((c) => ({
          repo: e.repo.name.split("/")[1],
          sha: c.sha.slice(0, 7),
          message: c.message.split("\n")[0].slice(0, 72),
          relative_time: timeAgo(e.created_at),
          html_url: `https://github.com/${e.repo.name}/commit/${c.sha}`,
        }))
      )
      .slice(0, 5);

    return NextResponse.json(
      { commits },
      { headers: { "Cache-Control": "public, max-age=300" } }
    );
  } catch {
    return NextResponse.json({ commits: [] }, { status: 200 });
  }
}
