import { NextResponse } from "next/server";

export const revalidate = 600;

type Event = {
  type: string;
  repo: { name: string };
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
      { headers, next: { revalidate: 600 } }
    );
    if (!res.ok) throw new Error("events fetch failed");

    const events: Event[] = await res.json();
    const cutoff30d = Date.now() - 30 * 24 * 60 * 60 * 1000;
    const cutoff14d = Date.now() - 14 * 24 * 60 * 60 * 1000;

    const pushEvents = events.filter(
      (e) => e.type === "PushEvent" && new Date(e.created_at).getTime() > cutoff30d
    );

    const activeRepos = new Set(pushEvents.map((e) => e.repo.name));
    const recentPushes = pushEvents.filter(
      (e) => new Date(e.created_at).getTime() > cutoff14d
    );

    const lastPush = pushEvents[0];

    return NextResponse.json({
      active_repos_30d: activeRepos.size,
      last_push_at: lastPush?.created_at ?? null,
      last_push_relative: recentPushes.length > 0 && lastPush ? timeAgo(lastPush.created_at) : null,
    });
  } catch {
    return NextResponse.json({ active_repos_30d: 0, last_push_at: null, last_push_relative: null });
  }
}
