"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

type Commit = {
  sha: string;
  message: string;
  relative_time: string;
  html_url: string;
  repo: string;
};

export default function CommitsPanel() {
  const [commits, setCommits] = useState<Commit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("/api/commits")
      .then((r) => r.json())
      .then((d) => {
        setCommits(d.commits || []);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-16 bg-[#0F0F0F] border border-white/5 rounded animate-pulse" />
        ))}
      </div>
    );
  }

  if (error || commits.length < 3) return null;

  return (
    <div className="px-6 py-24 border-t border-white/5">
      <div className="max-w-5xl mx-auto">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <span className="font-mono text-xs text-[#CCFF00] tracking-widest uppercase">04 / ACTIVITY</span>
            <h2 className="font-syne text-4xl sm:text-5xl font-bold text-[#F8F8F8] mt-3">Recent Commits</h2>
          </div>
          <a href="https://github.com/sara2023s" target="_blank" rel="noopener noreferrer" className="font-mono text-xs text-[#6B6B6B] hover:text-[#CCFF00] transition-colors">
            View all activity →
          </a>
        </div>
        <div className="space-y-2">
          {commits.map((commit, i) => (
            <motion.a
              key={commit.sha}
              href={commit.html_url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              className="block bg-[#0F0F0F] border border-white/5 rounded px-4 py-3 hover:border-[#CCFF00]/30 transition-colors duration-200 group"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-[10px] text-[#007BFF]">{commit.repo}</span>
                    <span className="font-mono text-[10px] text-[#6B6B6B]">#{commit.sha}</span>
                  </div>
                  <p className="font-mono text-xs text-[#F8F8F8] group-hover:text-[#CCFF00] transition-colors truncate">
                    {commit.message}
                  </p>
                </div>
                <span className="font-mono text-[10px] text-[#6B6B6B] whitespace-nowrap shrink-0">
                  {commit.relative_time}
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </div>
  );
}
