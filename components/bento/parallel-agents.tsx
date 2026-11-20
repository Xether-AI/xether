import type React from "react";
import { CheckCircle2, Cpu, RefreshCw, Sparkles } from "lucide-react";

interface ParallelCodingAgentsProps {
  className?: string;
}

const stages = [
  {
    name: "01. Ingest & Dedup",
    meta: "12.4k rows/s • cached",
    duration: "0.8s",
    icon: CheckCircle2,
    badge: "text-emerald-400 bg-emerald-500/15 border-emerald-500/25",
  },
  {
    name: "02. Normalize & Impute",
    meta: "8.1k rows/s • sha:7c2a",
    duration: "1.4s",
    icon: RefreshCw,
    badge: "text-cyan-400 bg-cyan-500/15 border-cyan-500/25",
  },
  {
    name: "03. Schema & Drift Gate",
    meta: "15.0k rows/s • verified",
    duration: "0.4s",
    icon: Sparkles,
    badge: "text-primary bg-primary/15 border-primary/25",
  },
];

const ParallelCodingAgents: React.FC<ParallelCodingAgentsProps> = ({
  className = "",
}) => {
  return (
    <div
      className={`w-full h-full px-5 pb-5 flex flex-col justify-between gap-2.5 ${className}`}
      role="img"
      aria-label="Reproducible multi-stage data pipeline DAG execution"
    >
      <div className="flex items-center justify-between text-[11px] font-mono text-muted-foreground px-1">
        <span className="inline-flex items-center gap-1.5 text-foreground">
          <Cpu className="h-3.5 w-3.5 text-primary" />
          dag://train_prep_v4
        </span>
        <span className="text-emerald-400">Deterministic</span>
      </div>

      <div className="space-y-2">
        {stages.map((stage) => {
          const Icon = stage.icon;
          return (
            <div
              key={stage.name}
              className="rounded-xl border border-border bg-background/60 px-3 py-2.5 flex items-center justify-between gap-2"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <span
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border ${stage.badge}`}
                >
                  <Icon className="h-3.5 w-3.5" />
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-medium text-foreground truncate">
                    {stage.name}
                  </p>
                  <p className="text-[10px] font-mono text-muted-foreground truncate">
                    {stage.meta}
                  </p>
                </div>
              </div>
              <span className="shrink-0 rounded-md border border-border bg-muted/60 px-2 py-0.5 text-[10px] font-mono text-foreground">
                {stage.duration}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ParallelCodingAgents;
