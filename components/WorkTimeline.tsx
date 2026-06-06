interface TimelineEntry {
  start: string;
  end?: string | null;
  title: string;
  org: string;
  location?: string | null;
  summary?: string | null;
}

interface WorkTimelineProps {
  entries: TimelineEntry[];
}

function formatDate(s: string): string {
  if (s.includes("-")) {
    const [year, month] = s.split("-");
    const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    return `${months[parseInt(month) - 1]} ${year}`;
  }
  return s;
}

function dateRange(start: string, end?: string | null): string {
  const s = formatDate(start);
  if (!end) return `${s} — Now`;
  const e = formatDate(end);
  if (e === s) return s;
  return `${s} — ${e}`;
}

export default function WorkTimeline({ entries }: WorkTimelineProps) {
  return (
    <div className="space-y-8">
      {entries.map((entry, i) => (
        <div key={i} className="flex gap-6">
          <div className="flex flex-col items-center">
            <div className="w-1.5 h-1.5 rounded-full bg-[#CCFF00] mt-1.5 shrink-0" />
            <div className="w-px flex-1 bg-white/10 mt-2" />
          </div>
          <div className="pb-6 flex-1">
            <div className="font-mono text-xs text-[#6B6B6B] mb-1">{dateRange(entry.start, entry.end)}</div>
            <div className="font-syne font-bold text-[#F8F8F8] text-base">{entry.title}</div>
            <div className="font-inter text-sm text-[#CCFF00]">
              {entry.org}{entry.location ? ` · ${entry.location}` : ""}
            </div>
            {entry.summary && (
              <div className="font-mono text-xs text-[#6B6B6B] mt-1">{entry.summary}</div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
