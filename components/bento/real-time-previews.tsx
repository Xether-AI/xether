import type React from "react";
import { GitBranch, GitCommitHorizontal, RotateCcw } from "lucide-react";

const RealtimeCodingPreviews: React.FC = () => {
  const commits = [
    {
      version: "v2.3.0",
      tag: "HEAD",
      message: "Dedup + schema lock",
      meta: "44,820 rows • 9f3a8c1",
      active: true,
    },
    {
      version: "v2.2.1",
      tag: null,
      message: "Outlier clipping (+1.8% acc)",
      meta: "45,000 rows • 4b12e09",
      active: false,
    },
    {
      version: "v2.1.0",
      tag: null,
      message: "Raw ingestion snapshot",
      meta: "46,120 rows • 1a7c4d2",
      active: false,
    },
  ];

  return (
    <div
      className="w-full h-full px-5 pb-5 flex flex-col justify-between gap-3"
      role="img"
      aria-label="Dataset version control showing branches, immutable snapshots, and instant rollback"
    >
      {/* Branch Bar */}
      <div className="rounded-xl border border-border bg-background/70 backdrop-blur-md px-3 py-2 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <GitBranch className="h-4 w-4 shrink-0 text-cyan-400" />
          <span className="text-xs font-mono text-foreground truncate">
            main <span className="text-muted-foreground">←</span>{" "}
            <span className="text-primary">feat/dedup-q4</span>
          </span>
        </div>
        <span className="inline-flex items-center gap-1 rounded-md border border-primary/25 bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary shrink-0">
          <RotateCcw className="h-3 w-3" />
          Rollback
        </span>
      </div>

      {/* Commit Timeline */}
      <div className="relative pl-4 space-y-2.5">
        <div className="absolute left-[22px] top-3 bottom-3 w-px bg-gradient-to-b from-primary via-cyan-400/60 to-transparent" />
        {commits.map((commit) => (
          <div
            key={commit.version}
            className={`relative flex items-center justify-between gap-2 rounded-xl border px-3 py-2 ${
              commit.active
                ? "border-primary/35 bg-primary/10"
                : "border-border bg-background/50"
            }`}
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <GitCommitHorizontal
                className={`h-4 w-4 shrink-0 ${
                  commit.active ? "text-primary" : "text-muted-foreground"
                }`}
              />
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-mono font-semibold text-foreground">
                    {commit.version}
                  </span>
                  {commit.tag && (
                    <span className="rounded bg-primary/20 px-1.5 py-0.2 text-[9px] font-mono font-semibold text-primary">
                      {commit.tag}
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-muted-foreground truncate">
                  {commit.message}
                </p>
              </div>
            </div>
            <span className="shrink-0 text-[10px] font-mono text-muted-foreground hidden sm:inline">
              {commit.meta}
            </span>
          </div>
        ))}
      </div>

      {/* Diff Pill */}
      <div className="flex items-center justify-between text-[11px] font-mono px-1">
        <span className="text-emerald-400">+0 schema breaks</span>
        <span className="text-amber-400">-1,300 duplicates</span>
      </div>
    </div>
  );
};

export default RealtimeCodingPreviews;
